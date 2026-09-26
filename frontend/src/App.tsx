import { Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import ProductDetails from "./pages/ProductDetails"
import Cart from "./pages/Cart"
import Shop from "./pages/Shop"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
// import Offers from "./pages/Offers"
import Home from "./pages/Home"
import Wishlist from "./pages/Wishlist"
import OrderDetails from "./pages/OrderDetails"
import AdminDashboard from "./pages/admin/AdminDashboard"
import AdminProducts from "./pages/admin/AdminProduct"
import AdminUsers from "./pages/admin/AdminUsers"
import AdminOrders from "./pages/admin/AdminOrders"
import ProtectedRoute from "./components/ProtectedRoute"
import AdminRoute from "./components/AdminRoute"
import MyOrders from "./pages/MyOrders"

function App() {

  return (
    <>
      <Navbar />

      <Routes>
        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Logged in User */}

        <Route path="/cart" element={
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>

        } />
        <Route path="/wishlist" element={
          <ProtectedRoute>
            <Wishlist />
          </ProtectedRoute>
        } />
        <Route path="/order-details/:id"
          element={
            <ProtectedRoute>
              <OrderDetails />
            </ProtectedRoute>
          } />
<Route path="/my-orders"
          element={
            <ProtectedRoute>
              <MyOrders />
            </ProtectedRoute>
          } />

        {/* Admin only */}
        <Route path="/admin" element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        } />
        <Route path="/admin/products"
          element={
            <AdminRoute>
              <AdminProducts />
            </AdminRoute>
          } />
        <Route path="/admin/users"
          element={
            <AdminRoute>
              <AdminUsers />
            </AdminRoute>

          } />
        <Route path="/admin/orders"
          element={
            <AdminRoute>
              <AdminOrders />
            </AdminRoute>
          } />

      </Routes>

      <main>

        {/* <h1>Welcome to Stylehub</h1>
        <p>Your one-stop shop for all your fashion needs!</p> */}

      </main>

    </>
  )
}

export default App
