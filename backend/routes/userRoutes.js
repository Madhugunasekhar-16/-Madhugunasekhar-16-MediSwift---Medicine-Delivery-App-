const express = require("express");
const router = express.Router();

const { getAllUsers, changePassword } = require("../controllers/userController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

router.get("/", protect, adminOnly, getAllUsers);


router.put("/change-password", protect, changePassword);

module.exports = router;