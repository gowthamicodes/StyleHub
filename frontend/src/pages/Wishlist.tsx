import { useDispatch, useSelector } from "react-redux";
import { FiTrash2 } from "react-icons/fi";
import type { RootState } from "../store/store";
import { removeFromWishlist } from "../store/slices/wishlistSlice";
import { Link } from "react-router-dom"

const Wishlist = () => {
  const dispatch = useDispatch();

  const wishlistItems = useSelector(
    (state: RootState) => state.wishlist.items
  );

  return (
    <div className="wishlist-page">
      <h1>My Wishlist</h1>

      {wishlistItems.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <div className="wishlist-list">
          {wishlistItems.map((product) => (
            <div className="wishlist-item" key={product._id}>
            <Link to={`/product/${product._id}`}>
  <img
    src={product.image}
    alt={product.name}
  />
</Link>

              <div className="wishlist-info">
                <p>{product.category}</p>
<Link to={`/product/${product._id}`}>
  <h2>{product.name}</h2>
</Link>          
      <p>₹{product.price}</p>

<div className="wishlist-actions">
  <Link
    to={`/product/${product._id}`}
    className="wishlist-cart-button"
  >
    Add to Cart
  </Link>
                <button
                  type="button"
                  className="remove-wishlist"
                  onClick={() =>
                    dispatch(removeFromWishlist(product._id))
                  }
                  aria-label="Remove from wishlist"
                >
                  <FiTrash2 />
                  Remove
                </button>
              </div>
            </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;