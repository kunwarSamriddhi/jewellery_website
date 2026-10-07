// Copy to: backend/scripts/createAdmin.js   Run from the backend folder: node scripts/createAdmin.js
// Change the three values below first.
const NAME = "Admin";
const EMAIL = "admin@example.com";
const PASSWORD = "ChangeThisPassword123";

require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

(async () => {
  await mongoose.connect(process.env.MONGO_URI);
  const hashed = await bcrypt.hash(PASSWORD, 10);
  // Creates the admin, or promotes the user if this email is already registered
  const user = await User.findOneAndUpdate(
    { email: EMAIL.toLowerCase() },
    { name: NAME, password: hashed, role: "admin" },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );
  console.log("Admin ready:", user.email);
  await mongoose.disconnect();
})();
