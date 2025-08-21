const express = require("express");
const { sendOtp } = require("../controllers/sendOtp");
const { verifyOtp } = require("../controllers/verifyOtp");
const { resendOtp } = require("../controllers/resendOtp");
const { getProfile } = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Public
router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);
router.post("/resend-otp", resendOtp);

// Private
router.get("/profile", protect, getProfile);

module.exports = router;


