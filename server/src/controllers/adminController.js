const db = require('../config/database');

// 대시보드 통계
const getDashboardStats = async (req, res) => {
  try {
    const query = `
      SELECT
        COUNT(*) as total_orders,
        COUNT(*) FILTER (WHERE status = 'pending') as pending_orders,
        COUNT(*) FILTER (WHERE status = 'in_progress') as in_progress_orders,
        COUNT(*) FILTER (WHERE status = 'completed') as completed_orders
      FROM orders
    `;

    const result = await db.query(query);
    const stats = result.rows[0];

    res.json({
      success: true,
      data: {
        totalOrders: parseInt(stats.total_orders),
        pendingOrders: parseInt(stats.pending_orders),
        inProgressOrders: parseInt(stats.in_progress_orders),
        completedOrders: parseInt(stats.completed_orders)
      }
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({
      success: false,
      error: '통계를 불러오는 중 오류가 발생했습니다.'
    });
  }
};

// 재고 현황 조회
const getInventory = async (req, res) => {
  try {
    const query = `
      SELECT id, name, stock_quantity as "currentStock"
      FROM menus
      ORDER BY id
    `;

    const result = await db.query(query);

    res.json({
      success: true,
      data: result.rows
    });
  } catch (error) {
    console.error('Error fetching inventory:', error);
    res.status(500).json({
      success: false,
      error: '재고 현황을 불러오는 중 오류가 발생했습니다.'
    });
  }
};

// 재고 수량 조정
const updateStock = async (req, res) => {
  try {
    const { menuId } = req.params;
    const { stockChange } = req.body;

    if (typeof stockChange !== 'number') {
      return res.status(400).json({
        success: false,
        error: '재고 변경량이 유효하지 않습니다.'
      });
    }

    // 현재 재고 확인
    const checkQuery = 'SELECT name, stock_quantity FROM menus WHERE id = $1';
    const checkResult = await db.query(checkQuery, [menuId]);

    if (checkResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: '메뉴를 찾을 수 없습니다.'
      });
    }

    const currentStock = checkResult.rows[0].stock_quantity;
    const newStock = currentStock + stockChange;

    if (newStock < 0) {
      return res.status(400).json({
        success: false,
        error: '재고는 0 미만이 될 수 없습니다.',
        details: {
          currentStock,
          requestedChange: stockChange
        }
      });
    }

    // 재고 업데이트
    const updateQuery = `
      UPDATE menus 
      SET stock_quantity = stock_quantity + $1, updated_at = CURRENT_TIMESTAMP
      WHERE id = $2
      RETURNING id, name, stock_quantity as "currentStock"
    `;

    const updateResult = await db.query(updateQuery, [stockChange, menuId]);
    const updated = updateResult.rows[0];

    res.json({
      success: true,
      data: {
        id: updated.id,
        name: updated.name,
        currentStock: updated.currentStock,
        previousStock: currentStock
      },
      message: '재고가 업데이트되었습니다.'
    });

  } catch (error) {
    console.error('Error updating stock:', error);
    res.status(500).json({
      success: false,
      error: '재고 업데이트 중 오류가 발생했습니다.'
    });
  }
};

// 전체 주문 목록 조회
const getAllOrders = async (req, res) => {
  try {
    const { status } = req.query;

    let query = `
      SELECT 
        o.id,
        o.order_time as "orderTime",
        o.total_price as "totalPrice",
        o.status,
        json_agg(
          json_build_object(
            'menuName', oi.menu_name,
            'quantity', oi.quantity,
            'options', (
              SELECT json_agg(oio.option_name)
              FROM order_item_options oio
              WHERE oio.order_item_id = oi.id
            )
          ) ORDER BY oi.id
        ) as items
      FROM orders o
      LEFT JOIN order_items oi ON o.id = oi.order_id
    `;

    const params = [];
    if (status) {
      query += ' WHERE o.status = $1';
      params.push(status);
    }

    query += ' GROUP BY o.id ORDER BY o.order_time DESC';

    const result = await db.query(query, params);

    res.json({
      success: true,
      data: result.rows
    });

  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({
      success: false,
      error: '주문 목록을 불러오는 중 오류가 발생했습니다.'
    });
  }
};

// 주문 상태 변경
const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    // 유효한 상태 값인지 확인
    const validStatuses = ['pending', 'in_progress', 'completed'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        error: '유효하지 않은 상태 값입니다.'
      });
    }

    // 현재 상태 확인
    const checkQuery = 'SELECT status FROM orders WHERE id = $1';
    const checkResult = await db.query(checkQuery, [orderId]);

    if (checkResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: '주문을 찾을 수 없습니다.'
      });
    }

    const currentStatus = checkResult.rows[0].status;

    // 상태 전환 검증 (완료 상태에서는 되돌릴 수 없음)
    if (currentStatus === 'completed' && status !== 'completed') {
      return res.status(400).json({
        success: false,
        error: '잘못된 상태 전환입니다.',
        details: {
          currentStatus,
          requestedStatus: status
        }
      });
    }

    // 상태 업데이트
    const updateQuery = `
      UPDATE orders 
      SET status = $1, updated_at = CURRENT_TIMESTAMP
      WHERE id = $2
      RETURNING id, status, updated_at as "updatedAt"
    `;

    const updateResult = await db.query(updateQuery, [status, orderId]);

    res.json({
      success: true,
      data: updateResult.rows[0],
      message: '주문 상태가 업데이트되었습니다.'
    });

  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({
      success: false,
      error: '주문 상태 업데이트 중 오류가 발생했습니다.'
    });
  }
};

module.exports = {
  getDashboardStats,
  getInventory,
  updateStock,
  getAllOrders,
  updateOrderStatus
};



