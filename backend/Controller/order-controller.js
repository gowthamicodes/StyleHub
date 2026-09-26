const Orders = require("../Model/order-model")
// const authMiddleware = require("../Middleware/auth-middleware")

const createOrder = async (req, res) => {
  const { items, totalAmount } = req.body;

  const userId = req.userData.userId;

  try {
    const order = new Orders({
      userId,
      items,
      totalAmount,
    });

    await order.save();

    return res.status(201).json({
      message: "Order created successfully",
      order,
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      message: "Could not create order",
    });
  }
};

const getAllOrders = async(_req, res) => {
try {

const orders = await Orders.find()
.populate("userId", "name email")
.populate("items.productId", "name image");

return res.status(200).json({
    orders
})
} catch (err) {
console.error(err);

return res.status(500).json({
    message: "Could not fetch the order"
})

}
}

const updateOrderStatus = async(req, res) => {
const { id } = req.params;
const { status } = req.body;


  try {
    const orders = await Orders.findByIdAndUpdate(
        id,
        {
            status
        },
        { returnDocument: "after", runValidators: true}
    )
if (!orders) {
return res.status(404).json({
    message: "Order not found",
})
}  
 return res.status(200).json({
    message: "Order updated successfully",
    orders 
 })
  } catch (err) {
console.error(err)

return res.status(500).json({
    message: "Could not update product"
})

  }
} 

// Get one order for the logged-in user
const getUserOrder = async (req, res) => {
  const { id } = req.params;

  try {
    const order = await Orders.findOne({
      _id: id,
      userId: req.userData.userId,
    }).populate("items.productId", "name image");

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    return res.status(200).json({
      order,
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      message: "Could not fetch order",
    });
  }
};

const getMyOrders = async (req, res) => {
  try {
    const orders = await Orders.find({
      userId: req.userData.userId,
    })
      .populate("items.productId", "name image")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      orders,
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      message: "Could not fetch your orders",
    });
  }
};



module.exports = { createOrder, getAllOrders, updateOrderStatus,
   getUserOrder,getMyOrders }