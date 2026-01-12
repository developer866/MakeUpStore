import './App.css'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Booking from './pages/Booking'
import Home from './pages/Home'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Contact from './pages/Contact'
import Products from './pages/Products'
import Footer from './components/Footer'
import Services from './pages/Services'
import Social from './components/Social'
import AddProduct from './pages/Admin/AddProduct'

import Admin from './pages/Admin/Admin'

function App() {

  return (
    <main className="container" >
      <Navbar />
      <Social />
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/Products" element={<Products />} />
        <Route path="/Booking" element={<Booking />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Services" element={<Services />} />
        <Route path="/Cart" element={<Cart />} />
        {/* <Route path="/Productdetails" element={<Productdetails />} /> */}
        <Route path="/Checkout" element={<Checkout />} />
        <Route path="/Admin" element={<Admin />} />
        <Route path='/Admin/AddPRoduct' element={<AddProduct />}/>
      </Routes>
      <Footer />
    </main>
  )
}

export default App

