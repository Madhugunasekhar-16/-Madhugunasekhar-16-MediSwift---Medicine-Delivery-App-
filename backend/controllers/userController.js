const User = require("../models/user");
const bcrypt = require("bcryptjs");

// Get All Users (Admin)
const getAllUsers = async (req, res) => {
  try {

    const users = await User.find().sort({ createdAt: -1 });

    res.status(200).json({
      count: users.length,
      users
    });

  } catch (error) {
    console.error("Get users error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


// Change Password
const changePassword = async (req, res) => {
  try {

    const userId = req.user.id;
    const { currentPassword, newPassword } = req.body;

    // find user
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // check current password
    const isMatch = await bcrypt.compare(currentPassword, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Current password incorrect" });
    }

    // hash new password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    await user.save();

    res.json({ message: "Password updated successfully" });

  } catch (error) {
    console.error("Password change error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


module.exports = {
  getAllUsers,
  changePassword
};