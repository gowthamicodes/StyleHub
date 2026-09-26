const express = require("express")
const router = express.Router()

const usersController = require("../Controller/users-controller")
const authMiddleware = require("../Middleware/auth-middleware");
const adminMiddleware = require("../Middleware/admin-middleware");

router.post("/signup", usersController.getSignUp)

router.post("/login", usersController.getLogin)

router.post("/create-admin", usersController.createAdmin);

router.get(
  "/",
  authMiddleware,
  adminMiddleware,
  usersController.getAllUsers
);


router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  usersController.deleteUser
);


// { for testing purpose only}

// router.get("/protected", authMiddleware,
//      (req, res) => {
//   res.status(200).json({
//     message: "You accessed a protected route",
//     userData: req.userData,
//   });
// });

// router.get(
//   "/admin-test",
//   authMiddleware,
//   adminMiddleware,
//   (req, res) => {
//     res.status(200).json({
//       message: "Welcome Admin",
//       userData: req.userData,
//     });
//   }
// );


module.exports = router;

