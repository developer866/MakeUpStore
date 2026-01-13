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
import ProtectedRoute from "./components/ProtectedRoute";
import StaffLogin from "./components/StaffLogin";
import StaffDashboard from "./components/StaffDashboard";
import Admin from "./pages/Admin/Admin";
import AdminStaffManagement from "./components/adminStaffManagement";


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
        {/* <Route path="/Admin" element={<Admin />} /> */}
        <Route path='/Admin/AddPRoduct' element={<AddProduct />} />



        <Route path="/login" element={<StaffLogin />} />


        <Route
          path="/staff/dashboard"
          element={
            <ProtectedRoute requiredRole="staff">
              <StaffDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute requiredRole="admin">
              <Admin />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/staff"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminStaffManagement />
            </ProtectedRoute>
          }
        />


        <Route
          path="/unauthorized"
          element={
            <div style={{ textAlign: "center", padding: "40px" }}>
              <h1>403 - Unauthorized</h1>
              <p>You don't have permission to access this page.</p>
            </div>
          }
        />
      </Routes>
      <Footer />
    </main>
  )
}

export default App

