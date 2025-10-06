import { useState } from 'react'
import AdminDashboard from '../components/AdminDashboard'
import InventoryCard from '../components/InventoryCard'
import OrderItem from '../components/OrderItem'
import './AdminPage.css'

// 임시 재고 데이터
const INITIAL_INVENTORY = [
  { id: 1, name: '아메리카노 (ICE)', currentStock: 10 },
  { id: 2, name: '아메리카노 (HOT)', currentStock: 10 },
  { id: 3, name: '카페라떼', currentStock: 10 }
]

// 임시 주문 데이터
const INITIAL_ORDERS = [
  {
    id: 1,
    orderTime: '2025-07-31T13:00:00',
    items: [
      { menuName: '아메리카노(ICE)', options: [], quantity: 1 }
    ],
    totalPrice: 4000,
    status: 'pending' // pending, in_progress, completed
  }
]

function AdminPage() {
  const [inventory, setInventory] = useState(INITIAL_INVENTORY)
  const [orders, setOrders] = useState(INITIAL_ORDERS)

  // 재고 변경 처리
  const handleStockChange = (menuId, change) => {
    setInventory(prev => 
      prev.map(item => 
        item.id === menuId 
          ? { ...item, currentStock: Math.max(0, item.currentStock + change) }
          : item
      )
    )
  }

  // 주문 상태 변경 처리
  const handleStatusChange = (orderId, newStatus) => {
    setOrders(prev =>
      prev.map(order =>
        order.id === orderId
          ? { ...order, status: newStatus }
          : order
      )
    )
  }

  // 대시보드 통계 계산
  const getDashboardStats = () => {
    return {
      totalOrders: orders.length,
      pendingOrders: orders.filter(o => o.status === 'pending').length,
      inProgressOrders: orders.filter(o => o.status === 'in_progress').length,
      completedOrders: orders.filter(o => o.status === 'completed').length
    }
  }

  return (
    <div className="admin-page">
      <AdminDashboard stats={getDashboardStats()} />

      <section className="inventory-section">
        <h2 className="section-title">재고 현황</h2>
        <div className="inventory-grid">
          {inventory.map(menu => (
            <InventoryCard
              key={menu.id}
              menu={menu}
              onStockChange={handleStockChange}
            />
          ))}
        </div>
      </section>

      <section className="orders-section">
        <h2 className="section-title">주문 현황</h2>
        <div className="orders-container">
          {orders.length === 0 ? (
            <p className="no-orders">주문이 없습니다.</p>
          ) : (
            orders.map(order => (
              <OrderItem
                key={order.id}
                order={order}
                onStatusChange={handleStatusChange}
              />
            ))
          )}
        </div>
      </section>
    </div>
  )
}

export default AdminPage

