const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const connectDB = require("./config/db");

dotenv.config();

connectDB();

const app = express();


// =====================================
// MIDDLEWARE
// =====================================

app.use(cors());

app.use(express.json());


// =====================================
// TEST ROUTE
// =====================================

app.get("/", (req, res) => {
  res.json({
    message: "E-commerce backend is running",
  });
});


// =====================================
// AUTH ROUTES
// =====================================

const authRoutes = require("./routes/authRoutes");

app.use(
  "/api/auth",
  authRoutes
);


// =====================================
// PRODUCT ROUTES
// =====================================

const productRoutes = require("./routes/productRoutes");

app.use(
  "/api/products",
  productRoutes
);


// =====================================
// ORDER ROUTES
// =====================================

const orderRoutes = require("./routes/orderRoutes");

app.use(
  "/api/orders",
  orderRoutes
);


// =====================================
// START SERVER
// =====================================

const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});