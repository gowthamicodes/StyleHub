import { FiHeart, FiShoppingBag } from "react-icons/fi";
import {Link} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleWishlist } from "../store/slices/wishlistSlice";
import type { Product } from "../types/Product"
import type { RootState } from "../store/store"

interface ProductCardProps {
product: Product;

}

const ProductCard = ({ product }: ProductCardProps) => {

const dispatch = useDispatch();

const isWishlisted = useSelector((state: RootState) => 
    state.wishlist.items.some((item) => item._id === product._id)
    
)


return (

<div  className= "product-card">
<div className="product-image-container">

<img src={product.image} alt={product.name} />

<button className={`wishlist-button ${isWishlisted ? "active" : ""}`}
 aria-label="Add to wishlist" 
 type="button"
onClick={() => dispatch(toggleWishlist(product)) }
>
    <FiHeart />
</button>

</div>

<div className="product-info">
<p className="product-category">{product.category}</p>    

<h3>{product.name}</h3>

<p className="product-price">₹{product.price}</p>

<Link  to={`/product/${product._id}`} className="view-product">
<FiShoppingBag />
View product
</Link>
</div>
</div>

)


}

export default ProductCard;