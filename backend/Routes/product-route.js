const express = require("express");
const router = express.Router()

const productController = require("../Controller/product-controller");

const authMiddleware = require("../Middleware/auth-middleware")
const adminMiddleware = require("../Middleware/admin-middleware")

router.get("/", 
    productController.getAllProducts
 );

router.get("/:id", 
    productController.getProductById
 );

router.post("/", authMiddleware, adminMiddleware,
    productController.createProduct);

    router.patch(
  "/:id",
  authMiddleware,
  adminMiddleware,
  productController.updateProduct
);

router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  productController.deleteProduct
);
 

module.exports = router;