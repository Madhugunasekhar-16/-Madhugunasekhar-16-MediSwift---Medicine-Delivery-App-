const express = require("express");
const router = express.Router();

const { placeOrder, getMyOrders, getAllOrders, updateOrderStatus } = require("../controllers/orderController.js");
const { protect, adminOnly } = require("../middleware/authMiddleware.js");
const upload = require("../middleware/uploadMiddleware.js");


router.get("/admin", protect, adminOnly, getAllOrders );

router.get("/", protect, getMyOrders);

router.post(
    "/", 
    protect,
    upload.single("prescription"),
    placeOrder
);

router.put("/admin/:id", protect, adminOnly, updateOrderStatus)

module.exports = router;


