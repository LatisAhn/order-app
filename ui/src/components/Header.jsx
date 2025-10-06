import './Header.css'

function Header({ currentTab, onTabChange }) {
  return (
    <header className="header">
      <div>
        <h1 className="brand">COZY</h1>
        <nav className="nav-tabs">
          <button 
            className={`tab ${currentTab === 'order' ? 'active' : ''}`}
            onClick={() => onTabChange('order')}
          >
            주문하기
          </button>
          <button 
            className={`tab ${currentTab === 'admin' ? 'active' : ''}`}
            onClick={() => onTabChange('admin')}
          >
            관리자
          </button>
        </nav>
      </div>
    </header>
  )
}

export default Header

