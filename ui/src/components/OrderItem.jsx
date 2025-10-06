import './OrderItem.css'

function OrderItem({ order, onStatusChange }) {
  const formatDateTime = (dateString) => {
    const date = new Date(dateString)
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    return `${month}월 ${day}일 ${hours}:${minutes}`
  }

  const getStatusButton = () => {
    switch (order.status) {
      case 'pending':
        return (
          <button 
            className="status-btn pending"
            onClick={() => onStatusChange(order.id, 'in_progress')}
          >
            제조 시작
          </button>
        )
      case 'in_progress':
        return (
          <button 
            className="status-btn in-progress"
            onClick={() => onStatusChange(order.id, 'completed')}
          >
            제조 완료
          </button>
        )
      case 'completed':
        return (
          <span className="status-badge completed">완료</span>
        )
      default:
        return null
    }
  }

  const getOrderItems = () => {
    return order.items.map((item, index) => {
      const options = item.options && item.options.length > 0 
        ? ` (${item.options.join(', ')})` 
        : ''
      return `${item.menuName}${options} x ${item.quantity}`
    }).join(', ')
  }

  return (
    <div className="order-item">
      <div className="order-info">
        <span className="order-time">{formatDateTime(order.orderTime)}</span>
        <span className="order-details">{getOrderItems()}</span>
        <span className="order-price">{order.totalPrice.toLocaleString()}원</span>
      </div>
      <div className="order-actions">
        {getStatusButton()}
      </div>
    </div>
  )
}

export default OrderItem

