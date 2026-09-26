import { useState, useEffect, useContext  } from "react";
// import type { Product } from "../../types/Product";
import { AuthContext } from "../../Context/auth-context";

interface OrderItem {
productId: string;
name: string;
price: number;
quantity: number;
selectedColor: string;
selectedSize: string;

}

interface Order {
  _id: string; 
userId: {
_id: string;
name: string;
email: string;
}
items: OrderItem[];
totalAmount: number;
status: string;
createdAt: string;
  }


const AdminOrders = () => {

const { token } = useContext(AuthContext)

const [ orders, setOrders] = useState<Order[]>([]);
const [ loading, setLoading] = useState(true)
const [ error, setError] = useState("")
const [updatingOrderId, setUpdatingOrderId] = useState<string | null>(null);

  // const orders: Order[] = [
  //   {
  //     id: 1,
  //     customerName: "Gowthami",
  //     email: "gowthami@gmail.com",
  //     product: "Classic Cotton T-Shirt",
  //     quantity: 2,
  //     total: 1598,
  //     status: "Placed",
  //   },
  //   {
  //     id: 2,
  //     customerName: "Sajan",
  //     email: "sajan@gmail.com",
  //     product: "Floral Summer Dress",
  //     quantity: 1,
  //     total: 1499,
  //     status: "Delivered",
  //   },
  // ];
 
useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(
          "https://stylehub-backend-pqo6.onrender.com/api/orders",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Could not fetch orders");
        }

        setOrders(data.orders);
      } catch (error) {
        console.error(error);

        setError(
          error instanceof Error
            ? error.message
            : "Could not load orders"
        );
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchOrders();
    }
  }, [token]);
  
  
if (loading) {
      return <p>Loading orders...</p>;
    }
  
    if (error) {
      return <p>{error}</p>;
    }
      
const handleStatusChange = async (
  orderId: string,
  newStatus: string
) => {
  try {
    setUpdatingOrderId(orderId);

    const response = await fetch(
      `https://stylehub-backend-pqo6.onrender.com/api/orders/${orderId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          status: newStatus,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || "Could not update order status"
      );
    }

    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order._id === orderId
          ? { ...order, status: newStatus }
          : order
      )
    );
  } catch (error) {
    console.error(error);

    alert(
      error instanceof Error
        ? error.message
        : "Could not update order status"
    );
  } finally {
    setUpdatingOrderId(null);
  }
};


  return (
    <div className="admin-orders">
      <div className="admin-orders-header">
        <h1>Orders</h1>
      </div>

      <div className="admin-orders-list">
        {orders.length > 0 ? (
          orders.map((order) => (
            <div key={order._id} className="admin-order">

              <p>
                Order ID: #{order._id}
              </p>

              <p>
                Customer: {order.userId?.name}
              </p>

              <p>
                Email: {order.userId?.email}
              </p>

              {order.items.map((item, index) => (
                <div key={index}>
                  <p>Product: {item.name}</p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Color: {item.selectedColor}</p>
                  <p>Size: {item.selectedSize}</p>
                </div>
              ))}

              <p>
                Total: ₹{order.totalAmount}
              </p>

              <div>
  <label>
    Status:{" "}
   <select
  value={order.status}
  disabled={updatingOrderId === order._id}
  onChange={(e) =>
    handleStatusChange(order._id, e.target.value)
  }
>
  <option value="Pending">Pending</option>
  <option value="Processing">Processing</option>
  <option value="Shipped">Shipped</option>
  <option value="Delivered">Delivered</option>
  <option value="Cancelled">Cancelled</option>
</select>
  </label>
</div>

              <p>
                Order Date:{" "}
                {new Date(order.createdAt).toLocaleDateString()}
              </p>

            </div>
          ))
        ) : (
          <p>No orders available yet.</p>
        )}
      </div>
    </div>
  );
};

export default AdminOrders;