const express = require("express");

const {
    createOrder,
    getMyOrders,
    getAllOrders,
    getOrderById,
} = require("../controllers/orderController");


const adminOnly = require("../middleware/adminMiddleware");
const sessionAuth = require("../middleware/sessionMiddleware");

const router = express.Router();


// =====================================
// USER ROUTES
// =====================================

// Create order
router.post(
    "/",
    sessionAuth,
    createOrder
);


// Get logged-in user's orders
router.get(
    "/my-orders",
    sessionAuth,
    getMyOrders
);




// =====================================
// ADMIN ROUTES
// =====================================

// Get all orders
router.get(
    "/admin/all",
    sessionAuth,
    adminOnly,
    getAllOrders
);

router.get(
    "/:id",
    sessionAuth,
    getOrderById
);


module.exports = router;