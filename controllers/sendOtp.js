const Otp = require("../models/otpModel");
const generateOtp = require("../utils/generateOtp");

const sendOtp = async (req, res, next) => {
  try {
    const { phone } = req.body;

    if (!phone) {
      return res.status(400).json({ message: "Phone number is required" });
    }

    const otp = generateOtp();

    // Save OTP in DB
    await Otp.create({ phone, otp });

    console.log(`📲 OTP for ${phone}: ${otp}`); // simulate SMS

    res.status(200).json({
      success: true,
      message: "OTP sent successfully",
      phone
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { sendOtp };
