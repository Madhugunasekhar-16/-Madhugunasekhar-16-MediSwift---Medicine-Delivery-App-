const express = require("express");
const router = express.Router();

const { getAllUsers, changePassword } = require("../controllers/userController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

// Admin get all users
router.get("/", protect, adminOnly, getAllUsers);

// User change password
router.put("/change-password", protect, changePassword);

module.exports = router;