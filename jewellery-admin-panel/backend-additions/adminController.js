// Copy to: backend/controllers/adminController.js
const User = require("../models/User");
const Order = require("../models/Order");

// Every registered user (customers and admins) with order stats. The panel filters by role.
exports.getCustomers = async (req, res) => {
  try {
    // Password is never selected, so it is never sent
    const users = await User.find()
      .select("name email role createdAt")
      .sort({ createdAt: -1 })
      .lean();

    // Orders, money spent (cancelled orders do not count) and last order date per user
    const stats = await Order.aggregate([
      {
        $group: {
          _id: "$user",
          orders: { $sum: 1 },
          spent: { $sum: { $cond: [{ $eq: ["$status", "Cancelled"] }, 0, "$totalAmount"] } },
          lastOrderAt: { $max: "$createdAt" },
        },
      },
    ]);
    const byUser = Object.fromEntries(stats.map((s) => [String(s._id), s]));

    const customers = users.map((u) => {
      const s = byUser[String(u._id)];
      return {
        _id: u._id,
        name: u.name,
        email: u.email,
        role: u.role,
        joinedAt: u.createdAt,
        orders: s?.orders || 0,
        spent: s?.spent || 0,
        lastOrderAt: s?.lastOrderAt || null,
      };
    });

    res.status(200).json({ count: customers.length, customers });
  } catch (error) {
    res.status(500).json({ message: "Failed to get customers", error: error.message });
  }
};
