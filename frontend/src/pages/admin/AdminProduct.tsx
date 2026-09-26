import { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Product } from "../../types/Product"
import { FiEdit, FiTrash2 } from "react-icons/fi"
import { AuthContext } from "../../Context/auth-context";
// import ProductCard from "../../components/ProductCard";

const productSchema = z.object({
  name: z.string().min(2, "Product name is required"),
  category: z.enum(["Men", "Women", "Kids"]),
  subCategory: z.string().min(2, "Sub category is required"),
  price: z.coerce.number().positive("Price must be greater than 0"),
  image: z.string().min(1, "Image is required"),
  colors: z.string().min(1, "Enter at least one color"),
  sizes: z.string().min(1, "Enter at least one size"),
  description: z.string().min(10, "Description must be at least 10 characters"),
});

type ProductFormData = z.infer<typeof productSchema>;

const AdminProducts = () => {

  const { token } = useContext(AuthContext);

  const [showForm, setShowForm] = useState(false);

  const [products, setProducts] = useState<Product[]>([])

  const [editingProduct, setEditingProduct] = useState<Product | null>(null)

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

 const {
  register,
  handleSubmit,
  reset,
  formState: { errors },
} = useForm<
  z.input<typeof productSchema>,
  any,
  ProductFormData
>({
  resolver: zodResolver(productSchema),
});

  useEffect(() => {

    const fetchProducts = async () => {

      try {
        const response = await fetch("https://stylehub-backend-pqo6.onrender.com/api/products");

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


  if (loading) {
    return <p>Loading products...</p>
  }

  if (error) {
    return <p>{error}</p>
  }


  const onSubmit = async (data: ProductFormData) => {
    console.log("New Product:", data);

    if (editingProduct) {
      try {
        const response = await fetch(
          `https://stylehub-backend-pqo6.onrender.com/api/products/${editingProduct._id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              name: data.name,
              category: data.category,
              subCategory: data.subCategory,
              price: data.price,
              image: data.image,
              colors: data.colors
                .split(",")
                .map((color) => color.trim()),
              sizes: data.sizes
                .split(",")
                .map((size) => size.trim()),
              description: data.description,
            }),
          }
        );

        const responseData = await response.json();

        if (!response.ok) {
          throw new Error(
            responseData.message || "Could not update product"
          );
        }

        setProducts((previousProducts) =>
          previousProducts.map((product) =>
            product._id === editingProduct._id
              ? responseData.product
              : product
          )
        );

        alert("Product updated successfully!");
      } catch (error) {
        console.error(error);

        alert(
          error instanceof Error
            ? error.message
            : "Could not update product"
        );
      }
    }
    else {

      // console.log("New product will be created through backend next.");
      try {

        const response = await fetch(
          "https://stylehub-backend-pqo6.onrender.com/api/products",
          {

            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              name: data.name,
              category: data.category,
              subCategory: data.subCategory,
              price: data.price,
              image: data.image,
              colors: data.colors
                .split(",")
                .map((color) => color.trim()),
              sizes: data.sizes
                .split(",")
                .map((size) => size.trim()),
              description: data.description,

            }),
          }
        );

        const responseData = await response.json();

        if (!response.ok) {
          throw new Error(
            responseData.message || "Could not create product"
          )
        }

        setProducts((previousProducts) => [
          ...previousProducts,
          responseData.product,
        ]);
        alert("Product added successfully!");
      } catch (error) {
        console.log(error);

        alert(
          error instanceof Error
            ? error.message
            : "Could not create product"
        )

      }
      reset();
      setEditingProduct(null);
      setShowForm(false);
    };

    
  }
  

  return (
    <div className="admin-products">

      <div className="admin-products-header">
        <h1>Products</h1>

        <button
          type="button"
          className="add-product-button"
          onClick={() => {
            setEditingProduct(null)
            reset();
            setShowForm(true);
          }}

        >
          + Add Product
        </button>
      </div>

      {showForm && (
        <div className="add-product-form">
          <h2>{editingProduct ? "Edit Product" : "Add Product"}</h2>

          <form onSubmit={handleSubmit(onSubmit)}>

            <div className="form-group">
              <label>Product Name</label>

              <input
                type="text"
                placeholder="Enter product name"
                {...register("name")}
              />

              {errors.name && (
                <p className="form-error">
                  {errors.name.message}
                </p>
              )}
            </div>


            <div className="form-group">
              <label>Category</label>

              <select {...register("category")}>
                <option value="">Select Category</option>
                <option value="Men">Men</option>
                <option value="Women">Women</option>
                <option value="Kids">Kids</option>
              </select>

              {errors.category && (
                <p className="form-error">
                  {errors.category.message}
                </p>
              )}
            </div>


            <div className="form-group">
              <label>Sub Category</label>

              <input
                type="text"
                placeholder="Example: T-Shirts"
                {...register("subCategory")}
              />

              {errors.subCategory && (
                <p className="form-error">
                  {errors.subCategory.message}
                </p>
              )}
            </div>


            <div className="form-group">
              <label>Price</label>

              <input
                type="number"
                placeholder="Enter price"
                {...register("price")}
              />

              {errors.price && (
                <p className="form-error">
                  {errors.price.message}
                </p>
              )}
            </div>


            <div className="form-group">
              <label>Image URL</label>

              <input
                type="text"
                placeholder="Enter image URL"
                {...register("image")}
              />

              {errors.image && (
                <p className="form-error">
                  {errors.image.message}
                </p>
              )}
            </div>


            <div className="form-group">
              <label>Colors</label>

              <input
                type="text"
                placeholder="Example: Black, White, Blue"
                {...register("colors")}
              />

              {errors.colors && (
                <p className="form-error">
                  {errors.colors.message}
                </p>
              )}
            </div>


            <div className="form-group">
              <label>Sizes</label>

              <input
                type="text"
                placeholder="Example: S, M, L, XL"
                {...register("sizes")}
              />

              {errors.sizes && (
                <p className="form-error">
                  {errors.sizes.message}
                </p>
              )}
            </div>


            <div className="form-group">
              <label>Description</label>

              <textarea
                placeholder="Enter product description"
                {...register("description")}
              />

              {errors.description && (
                <p className="form-error">
                  {errors.description.message}
                </p>
              )}
            </div>


            <div className="form-actions">

              <button
                type="submit"
                className="save-product-button"
              >-
                {editingProduct ? "Update Product" : "Save Product"}
              </button>

              <button
                type="button"
                className="cancel-product-button"
                onClick={() => {
                  reset();
                  setShowForm(false);
                }}
              >
                Cancel
              </button>

            </div>

          </form>
        </div>
      )}
      {!showForm && (
        <div className="admin-product-list">
          {products.length === 0 ? (
            <p>No products available yet.</p>
          ) : (
            products.map((product) => (
              <div className="admin-product-item" key={product._id}>
                <img
                  src={product.image}
                  alt={product.name}
                />

                <div>
                  <h3>{product.name}</h3>
                  <p>{product.category}</p>
                  <p>₹{product.price}</p>
                </div>

                <div className="admin-product-actions">

                  <button
                    type="button"
                    className="edit-product-button"
                    onClick={() => {

                      setEditingProduct(product);

                      reset({
                        name: product.name,
                        category: product.category,
                        subCategory: product.subCategory,
                        price: product.price,
                        image: product.image,
                        colors: product.colors.join(", "),
                        sizes: product.sizes.join(", "),
                        description: product.description,

                      })
                      setShowForm(true);
                    }
                    }
                  >
                    <FiEdit />
                    Edit
                  </button>

                  <button
                    type="button"
                    className="delete-product-button"
                    onClick={async () => {
  const confirmed = window.confirm(
    `Are you sure you want to delete ${product.name}?`
  );

  if (!confirmed) return;

  try {
    const response = await fetch(
      `https://stylehub-backend-pqo6.onrender.com/api/products/${product._id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(
        responseData.message || "Could not delete product"
      );
    }

    setProducts((previousProducts) =>
      previousProducts.filter(
        (item) => item._id !== product._id
      )
    );

    alert("Product deleted successfully!");
  } catch (error) {
    console.error(error);

    alert(
      error instanceof Error
        ? error.message
        : "Could not delete product"
    );
  }
}}
                  >
                    <FiTrash2 />
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};


export default AdminProducts;