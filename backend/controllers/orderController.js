const Order = require("../models/Order");
const Product = require("../models/Product");
const User = require("../models/User");

const {
    sendOrderConfirmationEmail,
} = require("../services/emailService");


// =====================================
// CREATE ORDER
// =====================================

// CREATE ORDER
const createOrder = async (req, res) => {
    const session = await Order.startSession();

    try {
        session.startTransaction();

        const { products } = req.body;

        if (!products || !Array.isArray(products)) {
            await session.abortTransaction();

            return res.status(400).json({
                message: "Products must be an array",
            });
        }

        if (products.length === 0) {
            await session.abortTransaction();

            return res.status(400).json({
                message: "Order must contain at least one product",
            });
        }

        const user = await User.findById(req.user.id).session(session);

        if (!user) {
            await session.abortTransaction();

            return res.status(404).json({
                message: "User not found",
            });
        }

        let totalAmount = 0;
        const orderProducts = [];

        for (const item of products) {
            if (!item.product) {
                await session.abortTransaction();

                return res.status(400).json({
                    message: "Product ID is required",
                });
            }

            if (
                !item.quantity ||
                item.quantity <= 0 ||
                !Number.isInteger(item.quantity)
            ) {
                await session.abortTransaction();

                return res.status(400).json({
                    message: "Quantity must be a positive integer",
                });
            }

            const product = await Product.findById(
                item.product
            ).session(session);

            if (!product) {
                await session.abortTransaction();

                return res.status(404).json({
                    message: `Product ${item.product} not found`,
                });
            }

            if (product.stock < item.quantity) {
                await session.abortTransaction();

                return res.status(400).json({
                    message: `Insufficient stock for ${product.name}. Available stock: ${product.stock}`,
                });
            }

            const itemTotal =
                product.price * item.quantity;

            totalAmount += itemTotal;

            orderProducts.push({
                product: product._id,
                quantity: item.quantity,
                price: product.price,
            });

            product.stock -= item.quantity;

            await product.save({ session });
        }

        const order = new Order({
            user: user._id,
            products: orderProducts,
            totalAmount,
            status: "Confirmed",
        });

        await order.save({ session });

        await session.commitTransaction();

        await order.populate(
            "products.product",
            "name price category"
        );

        try {
            await sendOrderConfirmationEmail({
                user,
                order,
            });

            console.log(
                "Order confirmation email sent successfully"
            );
        } catch (emailError) {
            console.error(
                "Order created but email failed:",
                emailError.message
            );
        }

        res.status(201).json({
            message: "Order created successfully",
            order,
        });
    } catch (error) {
        await session.abortTransaction();

        console.error(
            "Create order error:",
            error
        );

        res.status(500).json({
            message: "Failed to create order",
            error: error.message,
        });
    } finally {
        session.endSession();
    }
};


// =====================================
// GET MY ORDERS
// =====================================

const getMyOrders = async (req, res) => {
    try {

        const orders = await Order.find({
            user: req.user.id,
        })
            .populate(
                "products.product",
                "name price category"
            )
            .sort({
                createdAt: -1,
            });

        res.status(200).json({
            count: orders.length,
            orders,
        });

    } catch (error) {

        console.error(
            "Get my orders error:",
            error
        );

        res.status(500).json({
            message: "Failed to get orders",
            error: error.message,
        });
    }
};

// GET SINGLE ORDER
const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
            .populate("user", "name email")
            .populate(
                "products.product",
                "name price category"
            );

        if (!order) {
            return res.status(404).json({
                message: "Order not found",
            });
        }

        // Admin can view any order
        if (req.user.role === "admin") {
            return res.status(200).json({
                order,
            });
        }

        // Normal user can only view their own order
        if (order.user._id.toString() !== req.user.id) {
            return res.status(403).json({
                message: "You are not allowed to view this order",
            });
        }

        res.status(200).json({
            order,
        });
    } catch (error) {
        console.error(
            "Get order by ID error:",
            error
        );

        res.status(500).json({
            message: "Failed to get order",
            error: error.message,
        });
    }
};


// =====================================
// ADMIN - GET ALL ORDERS
// =====================================

const getAllOrders = async (req, res) => {
    try {

        const orders = await Order.find()

            // User information
            .populate(
                "user",
                "name email"
            )

            // Product information
            .populate(
                "products.product",
                "name price category"
            )

            // Latest orders first
            .sort({
                createdAt: -1,
            });

        res.status(200).json({
            count: orders.length,
            orders,
        });

    } catch (error) {

        console.error(
            "Get all orders error:",
            error
        );

        res.status(500).json({
            message: "Failed to get all orders",
            error: error.message,
        });
    }
};


module.exports = {
    createOrder,
    getMyOrders,
    getOrderById,
    getAllOrders,
};