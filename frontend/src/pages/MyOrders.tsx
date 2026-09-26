import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/auth-context";

interface Order {
  _id: string;
  totalAmount: number;
  status: string;
  createdAt: string;
  items: {
    name: string;
    quantity: number;
    price: number;
  }[];
}

const MyOrders = () => {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMyOrders = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          "https://stylehub-backend-pqo6.onrender.com/api/orders/my-orders",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

     if (!response.ok) {
  console.log("My Orders response:", data);
  console.log("Status:", response.status);
  throw new Error(data.message || "Could not fetch your orders");
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

    fetchMyOrders();
  }, [token]);

  if (loading) {
    return <p>Loading your orders...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="my-orders-page">
      <h1>My Orders</h1>

      {orders.length === 0 ? (
        <p>You haven't placed any orders yet.</p>
      ) : (
        <div className="my-orders-list">
          {orders.map((order) => (
            <div className="my-order" key={order._id}>
              <p>
                <strong>Order ID:</strong> #{order._id}
              </p>

              <p>
                <strong>Date:</strong>{" "}
                {new Date(order.createdAt).toLocaleDateString()}
              </p>

              <p>
                <strong>Total:</strong> ₹{order.totalAmount}
              </p>

              <p>
                <strong>Status:</strong> {order.status}
              </p>

              <p>
                <strong>Items:</strong>{" "}
                {order.items.length}
              </p>

              <button
                type="button"
                onClick={() =>
                  navigate(`/order-details/${order._id}`)
                }
              >
                View Order
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;