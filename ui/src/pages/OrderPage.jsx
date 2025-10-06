import { useState } from 'react'
import MenuCard from '../components/MenuCard'
import ShoppingCart from '../components/ShoppingCart'
import './OrderPage.css'

// 임시 메뉴 데이터
const MENU_DATA = [
  {
    id: 1,
    name: '아메리카노(ICE)',
    price: 4000,
    description: '간단한 설명...',
    imageUrl: '',
    options: [
      { id: 'shot', name: '샷 추가', price: 500 },
      { id: 'syrup', name: '시럽 추가', price: 0 }
    ]
  },
  {
    id: 2,
    name: '아메리카노(HOT)',
    price: 4000,
    description: '간단한 설명...',
    imageUrl: '',
    options: [
      { id: 'shot', name: '샷 추가', price: 500 },
      { id: 'syrup', name: '시럽 추가', price: 0 }
    ]
  },
  {
    id: 3,
    name: '카페라떼',
    price: 5000,
    description: '간단한 설명...',
    imageUrl: '',
    options: [
      { id: 'shot', name: '샷 추가', price: 500 },
      { id: 'syrup', name: '시럽 추가', price: 0 }
    ]
  },
  {
    id: 4,
    name: '카푸치노',
    price: 5000,
    description: '부드러운 우유 거품이 일품',
    imageUrl: '',
    options: [
      { id: 'shot', name: '샷 추가', price: 500 },
      { id: 'syrup', name: '시럽 추가', price: 0 }
    ]
  },
  {
    id: 5,
    name: '바닐라 라떼',
    price: 5500,
    description: '달콤한 바닐라 향',
    imageUrl: '',
    options: [
      { id: 'shot', name: '샷 추가', price: 500 },
      { id: 'whip', name: '휘핑 추가', price: 500 }
    ]
  },
  {
    id: 6,
    name: '카라멜 마끼아또',
    price: 6000,
    description: '카라멜의 달콤함과 에스프레소의 조화',
    imageUrl: '',
    options: [
      { id: 'shot', name: '샷 추가', price: 500 },
      { id: 'whip', name: '휘핑 추가', price: 500 }
    ]
  }
]

function OrderPage() {
  const [cartItems, setCartItems] = useState([])

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

  const handleOrder = () => {
    // 주문 처리 (추후 API 연동)
    console.log('주문 내역:', cartItems)
    setCartItems([])
  }

  const handleRemoveItem = (index) => {
    const newCartItems = cartItems.filter((_, i) => i !== index)
    setCartItems(newCartItems)
  }

  return (
    <div className="order-page">
      <div className="menu-grid">
        {MENU_DATA.map(menu => (
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

