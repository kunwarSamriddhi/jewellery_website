const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    // User who placed the order
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Products purchased
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },

        quantity: {
          type: Number,
          required: true,
          min: 1,
        },

        // Price at the time of purchase
        price: {
          type: Number,
          required: true,
          min: 0,
        },
      },
    ],

    // Total order amount
    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },

    // Order status
    status: {
      type: String,
      enum: [
        "Pending",
        "Confirmed",
        "Shipped",
        "Delivered",
        "Cancelled",
      ],
      default: "Confirmed",
    },
  },

  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;