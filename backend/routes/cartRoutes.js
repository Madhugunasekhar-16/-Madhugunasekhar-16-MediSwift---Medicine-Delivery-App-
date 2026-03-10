const express = require("express");
const router = express.Router();

const { addtoCart, getCart, removeFromCart,updateCartQuantity } = require("../controllers/cartController.js");
const { protect } = require("../middleware/authMiddleware.js");


router.post("/", protect, addtoCart);
router.get("/", protect, getCart);
router.put("/", protect, updateCartQuantity);
router.delete("/:medicineId", protect, removeFromCart)

module.exports = router;