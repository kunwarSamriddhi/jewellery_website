# Additions to your backend

Your backend works with this panel for login, products and reading orders.
Three things are needed for everything to work.



## 1. Order status route (needed for the status dropdown on Orders)
1. Copy `backend-additions/orderStatusController.js` to `backend/controllers/orderStatusController.js`
2. In `backend/routes/orderRoutes.js` add:

```js
const { updateOrderStatus } = require("../controllers/orderStatusController");

router.patch("/:id/status", protect, adminOnly, updateOrderStatus);
```
(put it before `module.exports = router;`)

Cancelling an order puts its items back into product stock. A cancelled order cannot be changed again.

## 2. Customers route (returns every user with their role and order stats; the panel shows customers only by default, with an "All users" button)
1. Copy `backend-additions/adminController.js` to `backend/controllers/adminController.js`
2. Copy `backend-additions/adminRoutes.js` to `backend/routes/adminRoutes.js`
3. In `backend/server.js`, next to the other routes, add:

```js
const adminRoutes = require("./routes/adminRoutes");
app.use("/api/admin", adminRoutes);
```



## Optional: shipping address
If you later add `shippingAddress` to the Order model, the panel shows it automatically
inside each order's details. Nothing is shown if the field does not exist.
