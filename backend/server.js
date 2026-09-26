require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose")
const cors = require("cors");

const usersRoutes = require("./Routes/users-route")

const productRoutes = require("./Routes/product-route")

const orderRoutes = require("./Routes/order-route")

const app = express();

app.use(cors());

// app.use(cors({
//   origin: "https://stylehub-frontend-5ypb.onrender.com",
//   methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//   allowedHeaders: ["Content-Type", "Authorization"]
// }));

// app.options(/.*/, cors());

app.use(express.json());

// const dns = require('node:dns').promises;
// dns.setServers(["1.1.1.1", "8.8.8.8"]);

// const dns = require("node:dns").promises;

// dns.setServers(["10.237.157.39"]);


app.get("/", (_req, res) => {
    res.send("StyleHub backend is running")
});

app.use("/api/users", usersRoutes)
app.use("/api/products", productRoutes)
app.use("/api/orders", orderRoutes)


mongoose
.connect(process.env.MONGO_URI)
.then(() => {
    console.log("Connected to MONGODB");

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
    })
})
.catch((error) => {
console.log("MONGODB connection failed:", error)
})
