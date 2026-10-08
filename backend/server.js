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

const session = require("express-session");

app.use(cors());

app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    },
  })
);


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

const otpRoutes = require("./routes/otpRoutes");

app.use("/api/otp", otpRoutes);

const sessionAuth = require("./middleware/sessionMiddleware");

app.get("/api/auth/session-test", sessionAuth, (req, res) => {
  res.status(200).json({
    message: "Session authentication working",
    user: req.user,
  });
});


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