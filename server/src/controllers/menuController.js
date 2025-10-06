const db = require('../config/database');

// 전체 메뉴 목록 조회 (옵션 포함)
const getAllMenus = async (req, res) => {
  try {
    // 메뉴와 옵션을 JOIN하여 조회
    const query = `
      SELECT 
        m.id, m.name, m.description, m.price, m.image_url as "imageUrl",
        json_agg(
          json_build_object(
            'id', o.id,
            'name', o.name,
            'price', o.price
          ) ORDER BY o.id
        ) FILTER (WHERE o.id IS NOT NULL) as options
      FROM menus m
      LEFT JOIN options o ON m.id = o.menu_id
      GROUP BY m.id
      ORDER BY m.id
    `;

    const result = await db.query(query);
    
    res.json({
      success: true,
      data: result.rows
    });
  } catch (error) {
    console.error('Error fetching menus:', error);
    res.status(500).json({
      success: false,
      error: '메뉴 목록을 불러오는 중 오류가 발생했습니다.'
    });
  }
};

// 특정 메뉴 조회
const getMenuById = async (req, res) => {
  try {
    const { menuId } = req.params;

    const query = `
      SELECT 
        m.id, m.name, m.description, m.price, m.image_url as "imageUrl",
        json_agg(
          json_build_object(
            'id', o.id,
            'name', o.name,
            'price', o.price
          ) ORDER BY o.id
        ) FILTER (WHERE o.id IS NOT NULL) as options
      FROM menus m
      LEFT JOIN options o ON m.id = o.menu_id
      WHERE m.id = $1
      GROUP BY m.id
    `;

    const result = await db.query(query, [menuId]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: '메뉴를 찾을 수 없습니다.'
      });
    }

    res.json({
      success: true,
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Error fetching menu:', error);
    res.status(500).json({
      success: false,
      error: '메뉴를 불러오는 중 오류가 발생했습니다.'
    });
  }
};

module.exports = {
  getAllMenus,
  getMenuById
};



