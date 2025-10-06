const db = require('../config/database');

// 주문 생성 (재고 차감 포함)
const createOrder = async (req, res) => {
  const client = await db.pool.connect();

  try {
    const { items } = req.body;

    // 유효성 검사
    if (!items || items.length === 0) {
      return res.status(400).json({
        success: false,
        error: '주문 항목이 비어있습니다.'
      });
    }

    await client.query('BEGIN');

    // 재고 확인 및 차감
    for (const item of items) {
      const stockCheck = await client.query(
        'SELECT stock_quantity, name FROM menus WHERE id = $1',
        [item.menuId]
      );

      if (stockCheck.rows.length === 0) {
        await client.query('ROLLBACK');
        return res.status(404).json({
          success: false,
          error: '메뉴를 찾을 수 없습니다.'
        });
      }

      const currentStock = stockCheck.rows[0].stock_quantity;
      if (currentStock < item.quantity) {
        await client.query('ROLLBACK');
        return res.status(400).json({
          success: false,
          error: '재고가 부족합니다.',
          details: {
            menuName: stockCheck.rows[0].name,
            requestedQuantity: item.quantity,
            availableStock: currentStock
          }
        });
      }

      // 재고 차감
      await client.query(
        'UPDATE menus SET stock_quantity = stock_quantity - $1 WHERE id = $2',
        [item.quantity, item.menuId]
      );
    }

    // 주문 생성
    let totalPrice = 0;
    items.forEach(item => {
      const menuPrice = item.quantity * (item.unitPrice || 0);
      totalPrice += menuPrice;
    });

    const orderResult = await client.query(
      'INSERT INTO orders (order_time, total_price, status) VALUES (CURRENT_TIMESTAMP, $1, $2) RETURNING id, order_time',
      [totalPrice, 'pending']
    );

    const orderId = orderResult.rows[0].id;
    const orderTime = orderResult.rows[0].order_time;

    // 주문 항목 추가
    const orderItems = [];
    for (const item of items) {
      const optionsPrice = item.options ? item.options.reduce((sum, opt) => sum + opt.optionPrice, 0) : 0;
      const unitPrice = item.unitPrice || 0;
      const subtotal = item.quantity * unitPrice;

      const itemResult = await client.query(
        'INSERT INTO order_items (order_id, menu_id, menu_name, quantity, unit_price, subtotal) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id',
        [orderId, item.menuId, item.menuName, item.quantity, unitPrice, subtotal]
      );

      const orderItemId = itemResult.rows[0].id;

      // 주문 항목 옵션 추가
      const optionNames = [];
      if (item.options && item.options.length > 0) {
        for (const option of item.options) {
          await client.query(
            'INSERT INTO order_item_options (order_item_id, option_id, option_name, option_price) VALUES ($1, $2, $3, $4)',
            [orderItemId, option.optionId, option.optionName, option.optionPrice]
          );
          optionNames.push(option.optionName);
        }
      }

      orderItems.push({
        menuName: item.menuName,
        quantity: item.quantity,
        options: optionNames,
        subtotal
      });
    }

    await client.query('COMMIT');

    res.status(201).json({
      success: true,
      data: {
        orderId,
        orderTime,
        totalPrice,
        status: 'pending',
        items: orderItems
      },
      message: '주문이 접수되었습니다.'
    });

  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error creating order:', error);
    res.status(500).json({
      success: false,
      error: '주문 처리 중 오류가 발생했습니다.'
    });
  } finally {
    client.release();
  }
};

// 특정 주문 조회
const getOrderById = async (req, res) => {
  try {
    const { orderId } = req.params;

    // 주문 기본 정보 조회
    const orderQuery = `
      SELECT id, order_time as "orderTime", total_price as "totalPrice", status
      FROM orders
      WHERE id = $1
    `;
    const orderResult = await db.query(orderQuery, [orderId]);

    if (orderResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: '주문을 찾을 수 없습니다.'
      });
    }

    // 주문 항목 및 옵션 조회
    const itemsQuery = `
      SELECT 
        oi.menu_name as "menuName",
        oi.quantity,
        oi.unit_price as "unitPrice",
        oi.subtotal,
        json_agg(
          json_build_object(
            'name', oio.option_name,
            'price', oio.option_price
          ) ORDER BY oio.id
        ) FILTER (WHERE oio.id IS NOT NULL) as options
      FROM order_items oi
      LEFT JOIN order_item_options oio ON oi.id = oio.order_item_id
      WHERE oi.order_id = $1
      GROUP BY oi.id, oi.menu_name, oi.quantity, oi.unit_price, oi.subtotal
    `;
    const itemsResult = await db.query(itemsQuery, [orderId]);

    const order = orderResult.rows[0];
    order.items = itemsResult.rows;

    res.json({
      success: true,
      data: order
    });

  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({
      success: false,
      error: '주문을 불러오는 중 오류가 발생했습니다.'
    });
  }
};

module.exports = {
  createOrder,
  getOrderById
};



