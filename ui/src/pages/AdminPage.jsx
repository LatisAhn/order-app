import { useState, useEffect } from 'react'
import AdminDashboard from '../components/AdminDashboard'
import InventoryCard from '../components/InventoryCard'
import OrderItem from '../components/OrderItem'
import { adminAPI } from '../config/api'
import './AdminPage.css'

function AdminPage() {
  const [dashboardStats, setDashboardStats] = useState({
    totalOrders: 0,
    pendingOrders: 0,
    inProgressOrders: 0,
    completedOrders: 0
  })
  const [inventory, setInventory] = useState([])
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  // 데이터 로드
  useEffect(() => {
    fetchAllData()
  }, [])

  const fetchAllData = async () => {
    try {
      setLoading(true)
      await Promise.all([
        fetchDashboard(),
        fetchInventory(),
        fetchOrders()
      ])
    } catch (err) {
      console.error('데이터 로드 실패:', err)
    } finally {
      setLoading(false)
    }
  }

  const fetchDashboard = async () => {
    try {
      const response = await adminAPI.getDashboard()
      if (response.success) {
        setDashboardStats(response.data)
      }
    } catch (err) {
      console.error('대시보드 로드 실패:', err)
    }
  }

  const fetchInventory = async () => {
    try {
      const response = await adminAPI.getInventory()
      if (response.success) {
        setInventory(response.data)
      }
    } catch (err) {
      console.error('재고 로드 실패:', err)
    }
  }

  const fetchOrders = async () => {
    try {
      const response = await adminAPI.getOrders()
      if (response.success) {
        setOrders(response.data)
      }
    } catch (err) {
      console.error('주문 로드 실패:', err)
    }
  }

  // 재고 변경 처리
  const handleStockChange = async (menuId, change) => {
    try {
      const response = await adminAPI.updateStock(menuId, change)
      if (response.success) {
        // 재고 목록 다시 로드
        await fetchInventory()
      }
    } catch (err) {
      console.error('재고 업데이트 실패:', err)
      alert(err.message || '재고 업데이트에 실패했습니다.')
    }
  }

  // 주문 상태 변경 처리
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const response = await adminAPI.updateOrderStatus(orderId, newStatus)
      if (response.success) {
        // 주문 목록과 대시보드 다시 로드
        await Promise.all([fetchOrders(), fetchDashboard()])
      }
    } catch (err) {
      console.error('주문 상태 업데이트 실패:', err)
      alert(err.message || '주문 상태 업데이트에 실패했습니다.')
    }
  }

  if (loading) {
    return (
      <div className="admin-page">
        <p className="loading-message">데이터를 불러오는 중...</p>
      </div>
    )
  }

  return (
    <div className="admin-page">
      <AdminDashboard stats={dashboardStats} />

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

