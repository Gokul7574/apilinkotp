const User = require("../models/userModel");

const getProfile = async (req, res) => {
  try {
    const user = await User.findOne({ phone: req.user.phone });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      success: true,
      user: {
        phone: user.phone,
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { getProfile };
