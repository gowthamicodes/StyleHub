import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Product } from "../types/Product";
import ProductCard from "../components/ProductCard";
import CategoryCard from "../components/CategoryCard";
import Footer from "../components/Footer";
import men from "../assets/images/category/men.jpg"
import women from "../assets/images/category/women.jpg"
import kids from "../assets/images/category/kids.jpg"
// import Homeimage from "../assets/images/Home/homeimage.jpg"

const Home = () => {
    // const newArrivals = products.slice(0, 4)

    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(
                    "https://stylehub-backend-pqo6.onrender.com/api/products"
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch products");
                }

                const data = await response.json();

                setProducts(data.products);
            } catch (err) {
                console.error(err);
                setError("Could not load products");
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    { loading && <p>Loading products...</p> }

    { error && <p>{error}</p> }

    return (
        <div>

            {/* {Hero Section} */}

            <section className="hero">
                <div className="hero-content">

                    <p>NEW SEASON COLLECTION</p>
                    <h1>Style for Everyone</h1>
                    <p>
                        Discover the latest fashion for men, women and kids.
                    </p>

                    <Link to="/shop" className="hero-button">
                        Shop Now
                    </Link>
                    {/* <img src={Homeimage} alt="Stylehub" /> */}

                </div>
            </section>
            {/* Categories */}

            <section className="categories-section">
                <h2>Shop by Category</h2>

                <div className="category-grid">
                    <CategoryCard
                        title="Men"
                        image={men}
                    />

                    <CategoryCard
                        title="Women"
                        image={women}

                    />

                    <CategoryCard
                        title="Kids"
                        image={kids}

                    />
                </div>
            </section>

            {/* {New Arrivals} */}

            <section className="products-section">
                <div className="section-heading">
                    <h2>New Arrivals</h2>
                    <Link to="/shop" >
                        View All →
                    </Link>
                </div>
                <div className='product-grid'>
                    {products.slice(0, 4).map((product) => (
                        <ProductCard
                            key={product._id}
                            product={product}
                        />
                    ))}

                </div>

            </section>
            {/* Special Offer */}

            <section className="offer-section">
                <div>
                    <p>LIMITED TIME OFFER</p>

                    <h2>Get 40% Off Your First Order</h2>

                    <p>Refresh your wardrobe with our special collection!</p>

                    <Link to="/shop" >
                        Shop Offers →
                    </Link>
                </div>
            </section>

            <Footer />
        </div>

    )
}

export default Home;
