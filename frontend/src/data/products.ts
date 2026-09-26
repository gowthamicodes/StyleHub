import type { Product } from "../types/Product";
// import tshirt from "/images/products/tshirt.jpg"
// import jacket from "../assets/images/products/jacket.jpg"
// import dress from "../assets/images/products/dress.jpg"
// import tops from "../assets/images/products/tops.jpg"
// import sets from "../assets/images/products/sets.jpg"
// import denim from "../assets/images/products/denim.jpg"


export const products: Product[] = [
  {
    _id: 1,
    name: "Classic Cotton T-Shirt",
    category: "Men",
    subCategory: "T-Shirts",
    price: 799,
    image:
      "/images/products/tshirt.jpg",
    colors: ["Black", "White", "Blue"],
    sizes: ["S", "M", "L", "XL"],
    description:
      "Comfortable cotton T-shirt perfect for everyday casual wear.",
  },

  {
    _id: 2,
    name: "Casual Denim Jacket",
    category: "Men",
    subCategory: "Jackets",
    price: 1899,
    image:
      "/images/products/jacket.jpg",
    colors: ["Blue", "Black"],
    sizes: ["S", "M", "L", "XL"],
    description:
      "Classic denim jacket designed for a stylish casual look.",
  },

  {
    _id: 3,
    name: "Floral Summer Dress",
    category: "Women",
    subCategory: "Dresses",
    price: 1499,
    image:
      "/images/products/dress.jpg",
    colors: ["Pink", "White", "Blue"],
    sizes: ["S", "M", "L"],
    description:
      "Lightweight floral dress perfect for summer outings.",
  },

  {
    _id: 4,
    name: "Women's Casual Top",
    category: "Women",
    subCategory: "Tops",
    price: 899,
    image:
      "/images/products/tops.jpg",
    colors: ["Black", "White", "Green"],
    sizes: ["S", "M", "L"],
    description:
      "Simple and comfortable top for everyday styling.",
  },

  {
    _id: 5,
    name: "Kids Casual Outfit",
    category: "Kids",
    subCategory: "Sets",
    price: 999,
    image:
      "/images/products/sets.jpg",
    colors: ["Blue", "Yellow"],
    sizes: ["4Y", "6Y", "8Y", "10Y"],
    description:
      "Comfortable casual outfit designed for active kids.",
  },

  {
    _id: 6,
    name: "Kids Denim Outfit",
    category: "Kids",
    subCategory: "Denim",
    price: 1199,
    image:
      "/images/products/denim.jpg",
    colors: ["Blue", "Black"],
    sizes: ["4Y", "6Y", "8Y", "10Y"],
    description:
      "Stylish denim outfit for everyday kids' wear.",
  },
];