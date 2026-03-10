const Cart = require("../models/cartModel.js");
const Order = require("../models/orderModel.js");



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
            if (!medicine || !medicine.name) {
                return res.status(400).json({ message: "One or more medicines no longer exist." });
            }
            if (medicine.stock < item.quantity) {
                return res.status(400).json({ message: `${medicine.name} is out of stock` });
            }
            if (medicine.prescriptionRequired) prescriptionRequired = true;
            totalAmount += medicine.price * item.quantity;
        }

        let prescriptionImageUrl = "";
        if (prescriptionRequired) {
            if (!req.file) {
                return res.status(400).json({ message: "Prescription image is required" });
            }
            
            prescriptionImageUrl = req.file.path; 
        }

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

        for (let item of cart.items) {
            item.medicine.stock -= item.quantity;
            await item.medicine.save();
        }

        cart.items = [];
        await cart.save();

        res.status(201).json({ message: "Order placed successfully", order: newOrder });
    } catch (error) {
        console.error("Place order error:", error);
        res.status(500).json({ message: "Server error" });
    }
};


const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user.id })
            .populate("items.medicine")
            .sort({ createdAt: -1 });
        res.status(200).json({ count: orders.length, orders });
    } catch (error) {
        res.status(500).json({ message: "Server error fetching orders" });
    }
};


const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find()
            .populate("user", "name email")
            .populate("items.medicine")
            .sort({ createdAt: -1 });
        res.status(200).json({ count: orders.length, orders });
    } catch (error) {
        res.status(500).json({ message: "Server error fetching all orders" });
    }
};


const updateOrderStatus = async (req, res) => {
    try {
        const { orderStatus } = req.body;
        const order = await Order.findById(req.params.id);
        if (!order) return res.status(404).json({ message: "Order not found" });

        order.orderStatus = orderStatus;
        await order.save();
        res.status(200).json({ message: "Order status updated", order });
    } catch (error) {
        res.status(500).json({ message: "Server error updating status" });
    }
};

module.exports = { placeOrder, getMyOrders, getAllOrders, updateOrderStatus };