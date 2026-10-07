const express = require("express");

const {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

const router = express.Router();


// =====================================
// PUBLIC ROUTES
// =====================================

// Get all products
router.get("/", getProducts);

// Get one product
router.get("/:id", getProduct);


// =====================================
// ADMIN ROUTES
// =====================================

// Create product
router.post(
  "/",
  protect,
  adminOnly,
  createProduct
);

// Update product
router.put(
  "/:id",
  protect,
  adminOnly,
  updateProduct
);

// Delete product
router.delete(
  "/:id",
  protect,
  adminOnly,
  deleteProduct
);


module.exports = router;