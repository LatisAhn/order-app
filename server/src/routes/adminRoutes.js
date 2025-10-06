const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// GET /api/admin/dashboard - 대시보드 통계
router.get('/dashboard', adminController.getDashboardStats);

// GET /api/admin/inventory - 재고 현황 조회
router.get('/inventory', adminController.getInventory);

// PATCH /api/admin/inventory/:menuId - 재고 수량 조정
router.patch('/inventory/:menuId', adminController.updateStock);

// GET /api/admin/orders - 전체 주문 목록 조회
router.get('/orders', adminController.getAllOrders);

// PATCH /api/admin/orders/:orderId/status - 주문 상태 변경
router.patch('/orders/:orderId/status', adminController.updateOrderStatus);

module.exports = router;



