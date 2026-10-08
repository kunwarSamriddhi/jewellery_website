const OTP = require("../models/OTP");
const User = require("../models/User");
const { sendOTPEmail } = require("../services/emailService");

const sendOTP = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                message: "Email is required",
            });
        }

        const normalizedEmail = email.toLowerCase().trim();

        // Generate 6-digit OTP
        const otp = Math.floor(
            100000 + Math.random() * 900000
        ).toString();

        // OTP expires after 5 minutes
        const expiresAt = new Date(
            Date.now() + 5 * 60 * 1000
        );

        // Remove previous OTP for this email
        await OTP.deleteMany({
            email: normalizedEmail,
        });

        // Save new OTP
        await OTP.create({
            email: normalizedEmail,
            otp,
            expiresAt,
        });

        // Send OTP through SMTP
        await sendOTPEmail(
            normalizedEmail,
            otp
        );

        res.status(200).json({
            message: "OTP sent successfully",
        });
    } catch (error) {
        console.error("Send OTP error:", error);

        res.status(500).json({
            message: "Failed to send OTP",
            error: error.message,
        });
    }
};

const verifyOTP = async (req, res) => {
    try {
        const { name, email, otp } = req.body;

        if (!email || !otp) {
            return res.status(400).json({
                message: "Email and OTP are required",
            });
        }

        const normalizedEmail = email.toLowerCase().trim();

        const otpRecord = await OTP.findOne({
            email: normalizedEmail,
            otp,
        });

        if (!otpRecord) {
            return res.status(400).json({
                message: "Invalid OTP",
            });
        }

        if (otpRecord.expiresAt < new Date()) {
            await OTP.deleteOne({
                _id: otpRecord._id,
            });

            return res.status(400).json({
                message: "OTP has expired",
            });
        }

        // Check whether user already exists
        let user = await User.findOne({
            email: normalizedEmail,
        });

        if (!user) {
            if (!name) {
                return res.status(400).json({
                    message: "Name is required for new users",
                });
            }

            user = await User.create({
                name: name.trim(),
                email: normalizedEmail,
                role: "user",
            });
        }

        // Delete OTP after successful verification
        await OTP.deleteOne({
            _id: otpRecord._id,
        });

        req.session.user = {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            role: user.role,
        };

        res.status(200).json({
            message: "OTP verified successfully",
            user: req.session.user,
        });
    } catch (error) {
        console.error("Verify OTP error:", error);

        res.status(500).json({
            message: "Failed to verify OTP",
            error: error.message,
        });
    }
};

module.exports = {
    sendOTP,
    verifyOTP,
};