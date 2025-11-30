import './App.css'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Booking from './pages/Booking'
import Home from './pages/Home'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Contact from './pages/Contact'
// import Productdetails from './pages/Productdetails'
import Products from './pages/Products'
import Footer from './components/Footer'
import Services from './pages/Services'

function App() {

  return (
    <main className="container" >
      <Navbar />
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/Products" element={<Products />} />
        <Route path="/Booking" element={<Booking />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Services" element={<Services />} />
        <Route path="/Cart" element={<Cart />} />
        {/* <Route path="/Productdetails" element={<Productdetails />} /> */}
        <Route path="/Checkout" element={<Checkout />} />
      </Routes>
      <Footer />
    </main>
  )
}

export default App
