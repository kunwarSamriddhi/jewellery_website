const express = require("express");

const {
  register,
  login,
  getProfile,
  adminTest,
} = require("../controllers/authController");

const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

const router = express.Router();

// ===============================
// PUBLIC ROUTES
// ===============================

router.post("/register", register);

router.post("/login", login);


// ===============================
// PROTECTED ROUTES
// ===============================

router.get(
  "/profile",
  protect,
  getProfile
);


// ===============================
// ADMIN ONLY ROUTE
// ===============================

router.get(
  "/admin-test",
  protect,
  adminOnly,
  adminTest
);

module.exports = router;