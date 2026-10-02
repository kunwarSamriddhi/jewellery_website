// Mock data. Delete this file once pages fetch from your Express API.
export const PRODUCTS = [
  { id: 1, name: "Cotton Kurta", emoji: "👕", category: "Clothing", price: 1299, stock: 42 },
  { id: 2, name: "Leather Wallet", emoji: "👛", category: "Accessories", price: 799, stock: 8 },
  { id: 3, name: "Running Shoes", emoji: "👟", category: "Footwear", price: 3499, stock: 0 },
  { id: 4, name: "Steel Bottle", emoji: "🍶", category: "Home", price: 549, stock: 120 },
  { id: 5, name: "Wireless Earbuds", emoji: "🎧", category: "Electronics", price: 2199, stock: 25 },
];

export const ORDERS = [
  { id: "#1042", customer: "Riya Sharma", date: "02 Oct", total: 3498, status: "Delivered" },
  { id: "#1041", customer: "Aman Verma", date: "02 Oct", total: 799, status: "Shipped" },
  { id: "#1040", customer: "Neha Patel", date: "01 Oct", total: 2199, status: "Pending" },
  { id: "#1039", customer: "Karan Singh", date: "01 Oct", total: 5148, status: "Pending" },
  { id: "#1038", customer: "Pooja Joshi", date: "30 Sep", total: 1299, status: "Cancelled" },
];

export const CUSTOMERS = [
  { id: 1, name: "Riya Sharma", email: "riya@mail.com", orders: 12, spent: 28400 },
  { id: 2, name: "Aman Verma", email: "aman@mail.com", orders: 5, spent: 9150 },
  { id: 3, name: "Neha Patel", email: "neha@mail.com", orders: 8, spent: 17620 },
  { id: 4, name: "Karan Singh", email: "karan@mail.com", orders: 3, spent: 6300 },
];

export const SALES = [["Apr", 48], ["May", 62], ["Jun", 55], ["Jul", 78], ["Aug", 70], ["Sep", 94]];
