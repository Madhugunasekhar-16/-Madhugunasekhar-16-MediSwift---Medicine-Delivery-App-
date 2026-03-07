const Cart = require("../models/cartModel.js");
const Order = require("../models/orderModel.js");
const Medicine = require("../models/medicineModel.js");
const { uploadToCloudinary } = require("../config/cloudinary.js");

const placeOrder = async (req, res) => {
    try {
        const userId = req.user.id;

        const cart = await Cart.findOne({ user: userId }).populate("items.medicine");

        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: "Cart is empty" });
        }

        let prescriptionRequired = false;
        let totalAmount = 0;

        for (let item of cart.items) {
            const medicine = item.medicine;

            // If populate failed, medicine will be null or won't have a name/price
            if (!medicine || !medicine.name || medicine.price === undefined) {
                return res.status(400).json({
                    message: "One or more medicines in your cart no longer exist. Please update your cart.",
                });
            }

            if (medicine.stock < item.quantity) {
                return res.status(400).json({
                    message: `${medicine.name} is out of stock`,
                });
            }

            if (medicine.prescriptionRequired) {
                prescriptionRequired = true;
            }

            totalAmount += medicine.price * item.quantity;
        }

        let prescriptionImageUrl = "";

        if (prescriptionRequired) {
            if (!req.file) {
                return res.status(400).json({
                    message: "Prescription image is required for one or more items in your cart",
                });
            }

            const result = await uploadToCloudinary(req.file.buffer);
            prescriptionImageUrl = result.secure_url;
        }

        // Deduct stock for each medicine
        for (let item of cart.items) {
            const medicine = item.medicine;
            medicine.stock -= item.quantity;
            await medicine.save();
        }

        // Create the order
        const newOrder = await Order.create({
            user: userId,
            items: cart.items.map((item) => ({
                medicine: item.medicine._id,
                quantity: item.quantity,
                price: item.medicine.price,
            })),
            totalAmount,
            prescriptionImage: prescriptionImageUrl,
        });

        // Clear the cart
        cart.items = [];
        await cart.save();

        res.status(201).json({
            message: "Order placed successfully",
            order: newOrder,
        });

    } catch (error) {
        console.error("Place order error:", error);
        res.status(500).json({ message: "Server error" });
    }
};

const getMyOrders = async (req, res) => {
    try {
        const userId = req.user.id;

        const orders = await Order.find({ user: userId })
            .populate("items.medicine")
            .sort({ createdAt: -1 });

        res.status(200).json({
            count: orders.length,
            orders,
        });

    } catch (error) {
        console.error("Get my orders error:", error);
        res.status(500).json({ message: "Server error" });
    }
};

const getAllOrders = async (req, res) => {
    try {

        const orders = await Order.find()
            .populate("user", "name email")
            .populate("items.medicine")
            .sort({ createdAt: -1 });

        res.status(200).json({
            count: orders.length,
            orders,
        });

    } catch (error) {
        console.error("Get all orders error:", error);
        res.status(500).json({ message: "Server error" });
    }
};

const updateOrderStatus = async (req, res) => {
    try {
        const { orderStatus } = req.body;

        const allowedStatuses = [
            "Pending",
            "Approved",
            "Rejected",
            "Shipped",
            "Delivered",
        ];

        if (!allowedStatuses.includes(orderStatus)) {
            return res.status(400).json({
                message: "Invalid order status value",
            });
        }

        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({
                message: "Order not found",
            });
        }

        const transitionRules = {
            Pending: ["Approved", "Rejected"],
            Approved: ["Shipped"],
            Shipped: ["Delivered"],
            Rejected: [],
            Delivered: [],
        };

        const currentStatus = order.orderStatus;

        if (!transitionRules[currentStatus].includes(orderStatus)) {
            return res.status(400).json({
                message: `Cannot change status from ${currentStatus} to ${orderStatus}`,
            });
        }

        await Order.updateOne(
            { _id: req.params.id },
            { $set: { orderStatus } }
        );

        res.status(200).json({
            message: "Order status updated",
            order: { ...order.toObject(), orderStatus },
        });

    } catch (error) {
        console.error("Update order status error:", error);
        res.status(500).json({ message: "Server error" });
    }
};



module.exports = { placeOrder, getMyOrders, getAllOrders, updateOrderStatus };