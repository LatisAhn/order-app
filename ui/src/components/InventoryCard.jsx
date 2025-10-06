import './InventoryCard.css'

function InventoryCard({ menu, onStockChange }) {
  const getStockStatus = (stock) => {
    if (stock === 0) return { text: '품절', className: 'out-of-stock' }
    if (stock < 5) return { text: '주의', className: 'warning' }
    return { text: '정상', className: 'normal' }
  }

  const status = getStockStatus(menu.currentStock)

  const handleIncrease = () => {
    onStockChange(menu.id, 1)
  }

  const handleDecrease = () => {
    if (menu.currentStock > 0) {
      onStockChange(menu.id, -1)
    }
  }

  return (
    <div className="inventory-card">
      <div className="inventory-stock-info">
        <h3 className="inventory-menu-name">{menu.name}</h3>
        <span className="inventory-stock">{menu.currentStock}개</span>
        <span className={`inventory-status ${status.className}`}>{status.text}</span>
      </div>
      <div className="inventory-controls">
        <button className="stock-btn decrease" onClick={handleDecrease}>-</button>
        <button className="stock-btn increase" onClick={handleIncrease}>+</button>
      </div>
    </div>
  )
}

export default InventoryCard

