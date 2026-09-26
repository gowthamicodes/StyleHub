import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../store/store"
// import ProductDetails from "./ProductDetails";
import { increaseQuantity, decreaseQuantity, removeFromCart } from "../store/slices/cartSlice";
import { FiTrash2 } from "react-icons/fi";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/auth-context";
import { clearCart } from "../store/slices/cartSlice";
import { removeFromWishlist } from "../store/slices/wishlistSlice";


const Cart = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { token } = useContext(AuthContext)

    const cartItems = useSelector(
        (state: RootState) => state.cart.items
    )

    const [showModal, setShowModal] = useState(false);

    const subtotal = cartItems.reduce(
        (total, item) => total + item.product.price * item.quantity,
        0
    );
    console.log("Cart items:", cartItems)

    const handlePlaceOrder = async () => {
    try {
        if (!token) {
            alert("Please login before placing an order");
            navigate("/login");
            return;
        }

        const orderItems = cartItems.map((item) => ({
            productId: item.product._id,
            name: item.product.name,
            price: item.product.price,
            quantity: item.quantity,
            selectedColor: item.selectedColor,
            selectedSize: item.selectedSize,
        }));

        const response = await fetch(
            "https://stylehub-backend-pqo6.onrender.com/api/orders/createorder",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    items: orderItems,
                    totalAmount: subtotal,
                }),
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Could not place order");
        }

        cartItems.forEach((item) => {
  dispatch(removeFromWishlist(item.product._id));
});

dispatch(clearCart());

        console.log("Created order:", data.order);

        setShowModal(false);

        navigate(`/order-details/${data.order._id}`);
           

    } catch (error) {
        console.error(error);

        alert(
            error instanceof Error
                ? error.message
                : "Could not place order"
        );
    }
};

    return (
        <>
            <div className="cart-page">
                <h1>My Cart</h1>

                {cartItems.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    <>
                        <div className="cart-list">
                            {cartItems.map((item) => (
                                <div className="cart-item" key={item.product._id}>
                                    <img
                                        src={item.product.image}
                                        alt={item.product.name}
                                    />

                                    <div className="cart-item-info">
                                        <h2>{item.product.name}</h2>

                                        <p>₹{item.product.price}</p>

                                        <p>Color: {item.selectedColor}</p>
                                        <p>Size: {item.selectedSize}</p>

                                        <div className="cart-quantity">
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    dispatch(decreaseQuantity(item.product._id))
                                                }
                                            >
                                                -
                                            </button>

                                            <span>{item.quantity}</span>

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    dispatch(increaseQuantity(item.product._id))
                                                }
                                            >
                                                +
                                            </button>

                                            <button
                                                type="button"
                                                className="remove-button"
                                                onClick={() =>
                                                    dispatch(removeFromCart(item.product._id))
                                                }
                                                aria-label="Remove item"
                                            >
                                                <FiTrash2 />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <h2 className="cart-subtotal">
                            Subtotal: ₹{subtotal}
                        </h2>
                        <button type="button" className="checkout-button"
                            onClick={() => setShowModal(true)}>Proceed to Checkout</button>

                        {showModal && (
                            <div className="modal-overlay" >
                                <div className="confirmation-modal" >

                                    <h2>Confirm Your Order</h2>

                                    <p>Are you sure yoy want to place this order? </p>

                                    <div className="modal-actions" >
                                        <button type="button" className="no-button" onClick={() => setShowModal(false)}>
                                            No
                                        </button>
                                        <button type="button" 
                                        className="yes-button"
                                         onClick={handlePlaceOrder}
                                        >Yes</button>
                                    </div>

                                </div>


                            </div>
                        )}
                    </>
                )}
            </div>
        </>
    );
};

export default Cart;