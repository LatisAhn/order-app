const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menuController');

// GET /api/menus - 전체 메뉴 목록 조회
router.get('/', menuController.getAllMenus);

// GET /api/menus/:menuId - 특정 메뉴 조회
router.get('/:menuId', menuController.getMenuById);

module.exports = router;



