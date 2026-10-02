const express = require("express");

const {
    createOrder,
    getMyOrders,
    getAllOrders,
    getOrderById,
} = require("../controllers/orderController");

const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

const router = express.Router();


// =====================================
// USER ROUTES
// =====================================

// Create order
router.post(
    "/",
    protect,
    createOrder
);


// Get logged-in user's orders
router.get(
    "/my-orders",
    protect,
    getMyOrders
);




// =====================================
// ADMIN ROUTES
// =====================================

// Get all orders
router.get(
    "/admin/all",
    protect,
    adminOnly,
    getAllOrders
);

router.get(
    "/:id",
    protect,
    getOrderById
);


module.exports = router;