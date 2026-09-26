import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/auth-context";

const AdminDashboard = () => {

  const navigate = useNavigate()

const { token } = useContext(AuthContext);

const [totalProducts, setTotalProducts] = useState(0);
const [totalUsers, setTotalUsers] = useState(0);
const [totalOrders, setTotalOrders] = useState(0);

useEffect(() => {
  const fetchDashboardData = async () => {
    try {
      const [productsResponse, usersResponse, ordersResponse] =
        await Promise.all([
          fetch("https://stylehub-backend-pq06.onrender.com/api/products"),

          fetch("https://stylehub-backend-pq06.onrender.com/api/users", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),

          fetch("https://stylehub-backend-pq06.onrender.com/api/orders", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
        ]);

      const productsData = await productsResponse.json();
      const usersData = await usersResponse.json();
      const ordersData = await ordersResponse.json();

      if (!productsResponse.ok) {
        throw new Error("Could not fetch products");
      }

      if (!usersResponse.ok) {
        throw new Error(usersData.message || "Could not fetch users");
      }

      if (!ordersResponse.ok) {
        throw new Error(ordersData.message || "Could not fetch orders");
      }

      setTotalProducts(productsData.products.length);
      setTotalUsers(usersData.users.length);
      setTotalOrders(ordersData.orders.length);

    } catch (error) {
      console.error("Dashboard error:", error);
    }
  };

  if (token) {
    fetchDashboardData();
  }
}, [token]);



  return (
    <div className="admin-dashboard">

      <aside className="admin-sidebar">
        <h2>StyleHub Admin</h2>

        <nav>
          <button type="button" >Dashboard</button>    
          <button
          type="button"
          onClick={() => navigate("/admin/products")}
        >
          Products
        </button>
          <button type="button"
          onClick={() => navigate("/admin/users")}
          >Users</button>
          <button type="button"
          onClick={() => navigate("/admin/orders")}
          >Orders</button>
        </nav>
      </aside>

      <main className="admin-content">

        <h1>Dashboard</h1>

        <div className="admin-cards">

          <div
  className="admin-card"
  onClick={() => navigate("/admin/products")}
>
  <h3>Total Products</h3>
  <p>{totalProducts}</p>
</div>

<div
  className="admin-card"
  onClick={() => navigate("/admin/users")}
>
  <h3>Total Users</h3>
  <p>{totalUsers}</p>
</div>

<div
  className="admin-card"
  onClick={() => navigate("/admin/orders")}
>
  <h3>Total Orders</h3>
  <p>{totalOrders}</p>
</div>

        </div>

      </main>

    </div>
  );
};

export default AdminDashboard;