// Copy to: backend/routes/adminRoutes.js
const express = require("express");
const { getCustomers } = require("../controllers/adminController");
const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

const router = express.Router();

router.get("/customers", protect, adminOnly, getCustomers);

module.exports = router;
