

const User = require("../models/User");



// ===============================
// GET PROFILE
// ===============================
const getProfile = async (req, res) => {
    try {
        res.status(200).json({
            message: "Protected route accessed successfully",
            user: req.user,
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to get profile",
        });
    }
};

// ===============================
// ADMIN TEST
// ===============================
const adminTest = async (req, res) => {
    res.status(200).json({
        message: "Welcome Admin! You can access this route.",
        admin: req.user,
    });
};

module.exports = {
    getProfile,
    adminTest,
};