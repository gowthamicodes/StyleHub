
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../Context/auth-context";
import { useParams } from "react-router-dom";

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
  items: OrderItem[];
  totalAmount: number;
  status: string;
  createdAt: string;
}

const OrderDetails = () => {
  const location = useLocation();

const { id } = useParams();

  const { token } = useContext(AuthContext);

  // Get the order that was created by Cart
  const orderFromCart = location.state?.order as Order | undefined;

  const [order, setOrder] = useState<Order | null>(
    orderFromCart || null
  );

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
useEffect(() => {
  const fetchOrder = async () => {
    if (!id || !token) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `https://stylehub-backend-pq06.onrender.com/api/orders/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Could not fetch order"
        );
      }

      setOrder(data.order);
    } catch (error) {
      console.error(error);

      setError(
        error instanceof Error
          ? error.message
          : "Could not load order"
      );
    } finally {
      setLoading(false);
    }
  };

  fetchOrder();
}, [id, token]);

  if (loading) {
    return (
      <div className="order-details-page">
        <h1>Order Details</h1>
        <p>Loading order...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="order-details-page">
        <h1>Order Details</h1>
        <p>{error}</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="order-details-page">
        <h1>Order Details</h1>
        <p>Order information is not available.</p>
      </div>
    );
  }

  return (
    <div className="order-details-page">
      <h1>Order Details</h1>

      <p className="order-success">
        🎉 Your order has been placed successfully!
      </p>

      <p>
        <strong>Order ID:</strong> #{order._id}
      </p>

      <p className="order-status">
        <strong>Status:</strong> {order.status}
      </p>

      <div className="order-list">
        {order.items.map((item, index) => (
          <div className="order-item" key={index}>
            <div>
              <h2>{item.name}</h2>

              <p>Color: {item.selectedColor}</p>

              <p>Size: {item.selectedSize}</p>

              <p>Quantity: {item.quantity}</p>

              <p>Price: ₹{item.price}</p>
            </div>
          </div>
        ))}
      </div>

      <h2 className="order-total">
        Total: ₹{order.totalAmount}
      </h2>

      <p>
        <strong>Order Date:</strong>{" "}
        {new Date(order.createdAt).toLocaleDateString()}
      </p>
    </div>
  );
};

export default OrderDetails;


// import { useSelector } from "react-redux";
// import type { RootState } from "../store/store";

// const OrderDetails = () => {
//     const cartItems = useSelector(
//         (state: RootState) => state.cart.items
//     )

//     const subtotal = cartItems.reduce(
//         (total, item) => total + item.product.price * item.quantity,
//         0
//     )

//     return (
//         <div className="order-details-page" >
//             <h1>Order Details</h1>

//             <p className="order-success">🎉 Your order has been placed successfully!</p>

//             <div className="order-list">
//                 {cartItems.map((item) => (
//                     <div className="order-item" key={item.product._id}>
//                         <img src={item.product.image} alt={item.product.name}
//                         />
//                         <div>
//                             <h2>{item.product.name}</h2>
//                             <p>Color: {item.selectedColor}</p>
//                             <p>Size: {item.selectedSize}</p>
//                             <p>Quantity: {item.quantity}</p>
//                             <p>Price: {item.product.price}</p>
//                         </div>

//                     </div>
//                 ))}

//             </div>

//             <h2 className="order-total">Total: ₹{subtotal}</h2>

//         </div>


//     )
// };
// export default OrderDetails;