const express = require("express");

const {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const adminOnly = require("../middleware/adminMiddleware");
const sessionAuth = require("../middleware/sessionMiddleware");

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
  sessionAuth,
  adminOnly,
  createProduct
);

// Update product
router.put(
  "/:id",
  sessionAuth,
  adminOnly,
  updateProduct
);

// Delete product
router.delete(
  "/:id",
  sessionAuth,
  adminOnly,
  deleteProduct
);


module.exports = router;