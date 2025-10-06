import './ShoppingCart.css'

function ShoppingCart({ cartItems, onOrder, onRemoveItem }) {
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.totalPrice, 0)
  }

  const handleOrder = () => {
    if (cartItems.length === 0) {
      alert('장바구니가 비어있습니다.')
      return
    }
    if (window.confirm('주문하시겠습니까?')) {
      onOrder()
      alert('주문이 완료되었습니다!')
    }
  }

  const handleRemove = (index) => {
    if (window.confirm('이 항목을 삭제하시겠습니까?')) {
      onRemoveItem(index)
    }
  }

  return (
    <div className="shopping-cart">
      <h2 className="cart-title">장바구니</h2>
      
      <div className="cart-content">
        <div className="cart-items-section">
          {cartItems.length === 0 ? (
            <p className="empty-cart">장바구니가 비어있습니다.</p>
          ) : (
            <div className="cart-items">
              {cartItems.map((item, index) => (
                <div key={index} className="cart-item">
                  <div className="cart-item-info">
                    <span className="cart-item-name">
                      {item.menuName}
                      {item.optionNames.length > 0 && (
                        <span className="cart-item-options"> ({item.optionNames.join(', ')})</span>
                      )}
                      {item.quantity > 1 && (
                        <span className="cart-item-quantity"> x {item.quantity}</span>
                      )}
                    </span>
                  </div>
                  <span className="cart-item-price">{item.totalPrice.toLocaleString()}원</span>
                  <button 
                    className="remove-item-btn" 
                    onClick={() => handleRemove(index)}
                    aria-label="삭제"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="cart-summary">
          <div className="cart-total">
            <span className="total-label">총 금액</span>
            <span className="total-amount">{calculateTotal().toLocaleString()}원</span>
          </div>
          <button className="order-btn" onClick={handleOrder}>
            주문하기
          </button>
        </div>
      </div>
    </div>
  )
}

export default ShoppingCart

