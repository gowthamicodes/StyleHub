import { useState, useEffect } from "react";
import {  useParams } from "react-router-dom";
import { FiHeart, FiShoppingBag } from "react-icons/fi";
import type { Product } from "../types/Product";
import { addToCart } from "../store/slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { toggleWishlist } from "../store/slices/wishlistSlice";
import type { RootState } from "../store/store";
import CartToast from "../components/CartToast";

// interface Product {
//   id: number;
//   name: string;
//   category: string;
//   price: number;
//   image?: string;
// }

const ProductDetails = () => {

const [product, setProduct] = useState<Product | null>(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");

  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [showToast, setShowToast] = useState(false);

  const { id } = useParams();
  // const navigate = useNavigate();
  
    const dispatch = useDispatch();
  
  const isWishlisted = useSelector((state: RootState) =>
    state.wishlist.items.some(
      (item) => item._id === product?._id
    )
  );

  useEffect(() => {
  const fetchProduct = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/products/${id}`
      );

      if (!response.ok) {
        throw new Error("Product not found");
      }

      const data = await response.json();

      setProduct(data.product);
    } catch (err) {
      console.error(err);
      setError("Could not load product");
    } finally {
      setLoading(false);
    }
  };

  fetchProduct();
}, [id]);

  // const product = products.find(
  //   (item) => item.id === Number(id)
  // );

if (loading) {
  return <p>Loading product...</p>
}

  if (error || !product) {
    return <p>{error || "Product not found"}</p>;
  }

  return (
    <div className="product-details">

        {/* <h2>Product details</h2> */}
      <div className="product-details-image">
        <img src={product.image} alt={product.name} />
      </div>

      <div className="product-details-info">

        <p className="product-category">
          {product.category} / {product.subCategory}
        </p>

        <h1>{product.name}</h1>

        <h2>₹{product.price}</h2>

        <p className="product-description">
          {product.description}
        </p>

        {/* Color */}

        <div className="product-option">
          <h3>Color</h3>

          <div className="option-list">
            {product.colors.map((color) => (
              <button
                key={color}
                type="button"
                className={
                  selectedColor === color
                    ? "option-button selected"
                    : "option-button"
                }
                onClick={() => setSelectedColor(color)}
              >
                {color}
              </button>
            ))}
          </div>
        </div>

        {/* Size */}

        <div className="product-option">
          <h3>Size</h3>

          <div className="option-list">
            {product.sizes.map((size) => (
              <button
                key={size}
                type="button"
                className={
                  selectedSize === size
                    ? "option-button selected"
                    : "option-button"
                }
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Quantity */}

        <div className="product-option">
          <h3>Quantity</h3>

          <div className="quantity">
            <button
              type="button"
              onClick={() =>
                setQuantity((previous) =>
                  Math.max(1, previous - 1)
                )
              }
            >
              -
            </button>

            <span>{quantity}</span>

            <button
              type="button"
              onClick={() =>
                setQuantity((previous) => previous + 1)
              }
            >
              +
            </button>
          </div>
        </div>

        {/* Actions */}

        <div className="product-actions">

          <button type="button" className="add-cart-button" onClick={() => {
            if (!selectedColor || !selectedSize) {
alert("Please select a color and size")
return;
            }
            dispatch(
              addToCart({
                product,
                quantity,
                selectedColor,
                selectedSize
                
              })
            )
              console.log("BUTTON CLICKED")
setShowToast(true);

setTimeout(() => {
  setShowToast(false);
}, 2500)

        }}
          >
          <FiShoppingBag />
          Add to Cart
        </button>

        <button
  type="button"
  className={`details-wishlist ${
    isWishlisted ? "active" : ""
  }`}
  aria-label="Toggle wishlist"
  onClick={() => dispatch(toggleWishlist(product))}
>
  <FiHeart />
</button>

      </div>

    </div>
    {showToast && (
  <CartToast message={`${product.name} added to cart!`} />
)}
    </div >
  );
};

export default ProductDetails;