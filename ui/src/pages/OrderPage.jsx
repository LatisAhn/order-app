import { useState, useEffect } from 'react'
import MenuCard from '../components/MenuCard'
import ShoppingCart from '../components/ShoppingCart'
import { menuAPI, orderAPI } from '../config/api'
import './OrderPage.css'

function OrderPage() {
  const [menuData, setMenuData] = useState([])
  const [cartItems, setCartItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // 메뉴 데이터 로드
  useEffect(() => {
    const fetchMenus = async () => {
      try {
        setLoading(true)
        const response = await menuAPI.getAll()
        if (response.success) {
          setMenuData(response.data)
        }
      } catch (err) {
        console.error('메뉴 로드 실패:', err)
        setError('메뉴를 불러오는데 실패했습니다.')
      } finally {
        setLoading(false)
      }
    }

    fetchMenus()
  }, [])

  const handleAddToCart = (menuWithOptions) => {
    const optionNames = menuWithOptions.selectedOptions.map(opt => opt.name)
    const optionsPrice = menuWithOptions.selectedOptions.reduce((sum, opt) => sum + opt.price, 0)
    const unitPrice = menuWithOptions.price + optionsPrice

    // 동일한 메뉴와 옵션이 있는지 확인 (정렬된 배열 비교)
    const sortedOptionNames = [...optionNames].sort()
    const existingItemIndex = cartItems.findIndex(
      item => {
        const sortedItemOptions = [...item.optionNames].sort()
        return item.menuId === menuWithOptions.id &&
               JSON.stringify(sortedItemOptions) === JSON.stringify(sortedOptionNames)
      }
    )

    if (existingItemIndex !== -1) {
      // 이미 있는 경우 수량 증가
      const newCartItems = [...cartItems]
      newCartItems[existingItemIndex].quantity += 1
      newCartItems[existingItemIndex].totalPrice += unitPrice
      setCartItems(newCartItems)
    } else {
      // 새로운 아이템 추가
      const newItem = {
        menuId: menuWithOptions.id,
        menuName: menuWithOptions.name,
        optionNames: optionNames,
        quantity: 1,
        totalPrice: unitPrice
      }
      setCartItems([...cartItems, newItem])
    }
  }

  const handleOrder = async () => {
    try {
      // API 형식에 맞게 주문 데이터 변환
      const orderItems = cartItems.map(item => {
        // 단가 계산 (총 금액을 수량으로 나눔)
        const unitPrice = item.totalPrice / item.quantity
        
        return {
          menuId: item.menuId,
          menuName: item.menuName,
          quantity: item.quantity,
          unitPrice: unitPrice,
          options: item.optionNames.map((optName, idx) => ({
            optionId: idx + 1, // 실제로는 option ID를 저장해야 함
            optionName: optName,
            optionPrice: 0 // 실제 옵션 가격을 저장해야 함
          }))
        }
      })

      const response = await orderAPI.create({ items: orderItems })
      
      if (response.success) {
        alert(`주문이 완료되었습니다!\n주문번호: ${response.data.orderId}`)
        setCartItems([])
      }
    } catch (err) {
      console.error('주문 실패:', err)
      alert(err.message || '주문 처리 중 오류가 발생했습니다.')
    }
  }

  const handleRemoveItem = (index) => {
    const newCartItems = cartItems.filter((_, i) => i !== index)
    setCartItems(newCartItems)
  }

  if (loading) {
    return (
      <div className="order-page">
        <p className="loading-message">메뉴를 불러오는 중...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="order-page">
        <p className="error-message">{error}</p>
      </div>
    )
  }

  return (
    <div className="order-page">
      <div className="menu-grid">
        {menuData.map(menu => (
          <MenuCard 
            key={menu.id} 
            menu={menu} 
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>

      <ShoppingCart 
        cartItems={cartItems} 
        onOrder={handleOrder}
        onRemoveItem={handleRemoveItem}
      />
    </div>
  )
}

export default OrderPage

