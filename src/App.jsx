import './App.css'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Booking from './pages/Booking'
import Home from './pages/Home'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Contact from './pages/Contact'
import Productdetails from './pages/Productdetails'
import Products from './pages/Products'

function App() {

  return (
    <main className="container">
      <Navbar />
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/Products" element={<Products />} />
        <Route path="/Booking" element={<Booking />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/Productdetails" element={<Productdetails />} />
        <Route path="/Checkout" element={<Checkout />} />
      </Routes>
    </main>
  )
}

export default App
