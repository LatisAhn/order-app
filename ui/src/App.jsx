import { useState } from 'react'
import Header from './components/Header'
import OrderPage from './pages/OrderPage'
import AdminPage from './pages/AdminPage'
import './App.css'

function App() {
  const [currentTab, setCurrentTab] = useState('order')

  return (
    <div className="app">
      <Header currentTab={currentTab} onTabChange={setCurrentTab} />
      
      <main className="main-content">
        {currentTab === 'order' ? <OrderPage /> : <AdminPage />}
      </main>
    </div>
  )
}

export default App

