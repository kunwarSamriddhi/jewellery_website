const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendOrderConfirmationEmail = async ({
  user,
  order,
}) => {
  const productRows = order.products
    .map((item) => {
      return `
        <tr>
          <td>${item.product.name}</td>
          <td>${item.quantity}</td>
          <td>₹${item.price}</td>
          <td>₹${item.price * item.quantity}</td>
        </tr>
      `;
    })
    .join("");

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: user.email,
    subject: `Order Confirmation - ${order._id}`,

    html: `
      <h2>Order Confirmed</h2>

      <p>Hello ${user.name},</p>

      <p>
        Thank you for your purchase. Your order has been successfully placed.
      </p>

      <p>
        <strong>Order ID:</strong> ${order._id}
      </p>

      <p>
        <strong>Status:</strong> ${order.status}
      </p>

      <table border="1" cellpadding="8" cellspacing="0">
        <thead>
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Total</th>
          </tr>
        </thead>

        <tbody>
          ${productRows}
        </tbody>
      </table>

      <h3>Total Amount: ₹${order.totalAmount}</h3>

      <p>Thank you for shopping with us.</p>
    `,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = {
  sendOrderConfirmationEmail,
};