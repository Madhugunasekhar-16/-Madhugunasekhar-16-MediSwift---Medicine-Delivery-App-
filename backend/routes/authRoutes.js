const express = require("express");
const { registerUser,loginUser, getUserProfile } = require("../controllers/authController.js");
const { protect, adminOnly } = require("../middleware/authMiddleware.js");
const User = require("../models/user.js");

const router = express.Router();

router.post("/register", registerUser);    

router.post("/login", loginUser);   


router.get("/profile", protect, getUserProfile);


router.get("/admin", protect, adminOnly, (req,res) =>{
    res.status(403).json({
        message : "Welcome Admin"
    });
});


module.exports = router;
