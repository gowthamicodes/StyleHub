const express = require("express")
const router = express.Router()
 

const orderController = require("../Controller/order-controller");
const authMiddleware = require("../Middleware/auth-middleware")
const adminMiddleware = require("../Middleware/admin-middleware")

router.post(
  "/createorder",
  authMiddleware,
  orderController.createOrder
);

router.get(
  "/",
  authMiddleware,
  adminMiddleware,
  orderController.getAllOrders
);

router.patch(
  "/:id",
  authMiddleware,
  adminMiddleware,
  orderController.updateOrderStatus
);


router.get(
  "/my-orders",
  authMiddleware,
  orderController.getMyOrders
);

router.get(
  "/:id",
  authMiddleware,
  orderController.getUserOrder
);

module.exports = router;