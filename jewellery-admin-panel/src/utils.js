export const STORE = "Aurelia"; // change to your store name

export const inr = (n) => "₹" + Number(n || 0).toLocaleString("en-IN");

export const statusTone = {
  Pending: "b-amber",
  Confirmed: "b-blue",
  Shipped: "b-blue",
  Delivered: "b-green",
  Cancelled: "b-red",
};

// Backend has no order number, so use the last 6 characters of the id
export const orderNo = (id = "") => "#" + id.slice(-6).toUpperCase();

export const fmtDate = (d) =>
  new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });

// shippingAddress may be a string or an object, depending on how you add it to the backend
export const fmtAddress = (a) =>
  !a ? "" : typeof a === "string" ? a : Object.values(a).filter(Boolean).join(", ");
