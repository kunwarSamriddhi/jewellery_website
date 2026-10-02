export const inr = (n) => "₹" + n.toLocaleString("en-IN");

export const statusTone = {
  Delivered: "b-green",
  Shipped: "b-blue",
  Pending: "b-amber",
  Cancelled: "b-red",
};
