import { Link, NavLink, useNavigate } from "react-router-dom";
import { FiShoppingBag, FiUser, FiMenu } from "react-icons/fi";
import { useContext, useState } from "react"
import { AuthContext } from "../Context/auth-context";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";

const Navbar = () => {

    const { currentUser, logout } = useContext(AuthContext);

    const navigate = useNavigate();

    const [menuOpen, setMenuOpen] = useState(false);

    const cartItems = useSelector(
        (state: RootState) => state.cart.items
    )

    const cartCount = cartItems.reduce(
        (total, item) => total + item.quantity,
        0
    )

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <Link to="/">Stylehub</Link>
            </div>
            <button
                type="button"
                className="hamburger-button"
                onClick={() => {
                    console.log("HAMBURGER CLICKED");
                    setMenuOpen((previous) => !previous);
                }}
                aria-label="Toggle menu"
                aria-expanded={menuOpen}
            >
                <FiMenu />
            </button>

          <div className={`navbar-links ${menuOpen ? "open" : ""}`}>
  <NavLink to="/" end onClick={() => setMenuOpen(false)}>
    Home
  </NavLink>

  <NavLink to="/shop" onClick={() => setMenuOpen(false)}>
    Shop
  </NavLink>

  <NavLink to="/wishlist" onClick={() => setMenuOpen(false)}>
    Wishlist
  </NavLink>

  <NavLink to="/my-orders" onClick={() => setMenuOpen(false)}>
    MyOrders
  </NavLink>
</div>
            <div className="navbar-actions">
                <Link to="/cart" className="cart-icon">
                    <FiShoppingBag />

                    {cartCount > 0 && (
                        <span className="cart-badge">
                            {cartCount}
                        </span>
                    )}

                </Link>

                {currentUser && (
                    <span>Hi, {currentUser.name} </span>
                )}

                {!currentUser && (
                    <Link to="/login" >
                        <FiUser />
                    </Link>
                )}
                {currentUser && (
                    <button type="button" onClick={() => {
                        logout();
                        navigate("/");
                    }}> Logout</button>
                )}

                <Link to="/admin">Admin</Link>
            </div>
        </nav>

    )

}

export default Navbar;