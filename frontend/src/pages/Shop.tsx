import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import type { Product } from "../types/Product";


const Shop = () => {

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("");

  useEffect(() => {

    const fetchProducts = async () => {

      try {
        const response = await fetch("http://localhost:5000/api/products");

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
    }
    fetchProducts();
  }, [])

if (loading){
  return <p>Loading products...</p>
}

if (error) {
  return<p>{error}</p>
}


  let filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || product.category === category;

    return matchesSearch && matchesCategory;
  });

  if (sort === "low-high") {
    filteredProducts = [...filteredProducts].sort(
      (a, b) => a.price - b.price
    );
  }

  if (sort === "high-low") {
    filteredProducts = [...filteredProducts].sort(
      (a, b) => b.price - a.price
    );
  }

  return (
    <div className="shop-page">

      <section className="shop-header">
        <h1>Shop</h1>
        <p>Discover our latest fashion collection</p>
      </section>

      <section className="shop-products">

        <div className="shop-controls">

          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="All">All Categories</option>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="">Sort By</option>
            <option value="low-high">Price: Low to High</option>
            <option value="high-low">Price: High to Low</option>
          </select>

        </div>

        <div className="shop-count">
          <p>{filteredProducts.length} Products</p>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="product-grid">
            {filteredProducts.map((product) => (
              <ProductCard
              key={product._id}
                product={product}

              />
            ))}
          </div>
        ) : (
          <p className="no-products">
            No products found.
          </p>
        )}

      </section>

    </div>
  );
};

export default Shop;