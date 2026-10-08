const express = require("express");

const {
  getProfile,
  adminTest,
} = require("../controllers/authController");

// const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");
const sessionAuth = require("../middleware/sessionMiddleware");

const router = express.Router();

// ===============================
// PUBLIC ROUTES
// ===============================

// router.post("/register", register);

// router.post("/login", login);


// ===============================
// PROTECTED ROUTES
// ===============================

router.get(
  "/profile",
  sessionAuth,
  getProfile
);


// ===============================
// ADMIN ONLY ROUTE
// ===============================

router.get(
  "/admin-test",
  sessionAuth,
  adminOnly,
  adminTest
);

module.exports = router;