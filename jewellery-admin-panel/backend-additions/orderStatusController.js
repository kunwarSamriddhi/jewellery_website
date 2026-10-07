// Copy to: backend/controllers/orderStatusController.js
const Order = require("../models/Order");
const Product = require("../models/Product");

const STATUSES = ["Pending", "Confirmed", "Shipped", "Delivered", "Cancelled"];

exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!STATUSES.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // A cancelled order is final (stock was already returned)
    if (order.status === "Cancelled") {
      return res.status(400).json({ message: "Cancelled orders cannot be changed" });
    }

    // Cancelling puts the items back into stock, once
    if (status === "Cancelled") {
      for (const item of order.products) {
        await Product.findByIdAndUpdate(item.product, { $inc: { stock: item.quantity } });
      }
    }

    order.status = status;
    await order.save();

    res.status(200).json({ message: "Order status updated", order });
  } catch (error) {
    res.status(500).json({ message: "Failed to update order status", error: error.message });
  }
};
