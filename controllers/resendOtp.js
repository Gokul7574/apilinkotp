const Otp = require("../models/otpModel");
const generateOtp = require("../utils/generateOtp");

const resendOtp = async (req, res, next) => {
  try {
    const { phone } = req.body;

    if (!phone) {
      return res.status(400).json({ message: "Phone number is required" });
    }

    const otp = generateOtp();

    await Otp.create({ phone, otp });

    console.log(`📲 Resent OTP for ${phone}: ${otp}`);

    res.status(200).json({
      success: true,
      message: "OTP resent successfully",
      phone
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { resendOtp };
