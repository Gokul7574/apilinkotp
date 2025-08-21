const jwt = require("jsonwebtoken");
const Otp = require("../models/otpModel");
const User = require("../models/userModel");

const verifyOtp = async (req, res, next) => {
  try {
    const { phone, otp } = req.body;

    if (!phone || !otp) {
      return res.status(400).json({ message: "Phone and OTP required" });
    }

    const otpDoc = await Otp.findOne({ phone, otp });

    if (!otpDoc) {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }

    // ✅ Save user if not exists
    let user = await User.findOne({ phone });
    if (!user) {
      user = await User.create({ phone });
    }

    // ✅ Generate JWT Token
    const token = jwt.sign({ phone }, process.env.JWT_SECRET, {
      expiresIn: "1h"
    });

    res.status(200).json({
      success: true,
      message: "OTP Verified Successfully",
      token,
      user: {
        phone: user.phone,
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { verifyOtp };
