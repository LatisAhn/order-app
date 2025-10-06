import { useState } from 'react'
import './MenuCard.css'

function MenuCard({ menu, onAddToCart }) {
  const [selectedOptions, setSelectedOptions] = useState([])

  const handleOptionToggle = (option) => {
    if (selectedOptions.find(o => o.id === option.id)) {
      setSelectedOptions(selectedOptions.filter(o => o.id !== option.id))
    } else {
      setSelectedOptions([...selectedOptions, option])
    }
  }

  const handleAddToCart = () => {
    onAddToCart({
      ...menu,
      selectedOptions: selectedOptions
    })
    setSelectedOptions([])
  }

  return (
    <div className="menu-card">
      <div className="menu-image">
        <div className="image-placeholder">
          <span>☕</span>
        </div>
      </div>
      <div className="menu-info">
        <h3 className="menu-name">{menu.name}</h3>
        <p className="menu-price">{menu.price.toLocaleString()}원</p>
        <p className="menu-description">{menu.description}</p>
        
        <div className="menu-options">
          {menu.options.map((option) => (
            <label key={option.id} className="option-checkbox">
              <input
                type="checkbox"
                checked={selectedOptions.find(o => o.id === option.id) !== undefined}
                onChange={() => handleOptionToggle(option)}
              />
              <span>{option.name} (+{option.price.toLocaleString()}원)</span>
            </label>
          ))}
        </div>

        <button className="add-to-cart-btn" onClick={handleAddToCart}>
          담기
        </button>
      </div>
    </div>
  )
}

export default MenuCard

