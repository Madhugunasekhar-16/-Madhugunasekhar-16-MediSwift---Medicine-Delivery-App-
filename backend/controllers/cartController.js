const Cart = require("../models/cartModel");
const Medicine = require("../models/medicineModel");

const addtoCart = async (req,res) => {
    try {
        const { medicineId, quantity } = req.body;
        const qty = Number(quantity) || 1;
        
       
        const medicine = await Medicine.findById(medicineId);
        if(!medicine) {
            return res.status(404).json({
                message : "Medicine not found",
            });
        };

        
        let cart = await Cart.findOne({ user : req.user._id});

         
        if(!cart) {
            cart = await Cart.create({
                user : req.user._id,
                items : [],
            });
        }

       
        const existingItem = cart.items.find(
            (item) => item.medicine.toString() === medicineId
        );

        if(existingItem) {
            existingItem.quantity += qty || 1;    
        } else {
            cart.items.push({                           
                medicine : medicineId,
                quantity : qty,
            });
        }

        await cart.save();

        res.status(200).json(cart);

        if (qty > medicine.stock) {
            return res.status(400).json({ message: "Not enough stock available" });
        }

    } catch (error) {
        console.error("Add to cart Error :", error);
        res.status(500).json({
            message : "server error",
        });
    }
};

const getCart = async (req,res) => {
    try{
        const cart = await Cart.findOne({ user: req.user._id })
        .populate("items.medicine");

        if(!cart) {
            return res.status(200).json({
                items : [],
            });
        }
        res.status(200).json(cart);
    }catch (error) {
        console.error("Get Cart error", error);
        res.status(500).json({
            message : "server error",
        });
    }
};

const removeFromCart = async (req,res) => {
    try{
        const { medicineId } = req.params;

        const cart = await Cart.findOne({ user : req.user._id });

        if(!cart) {
            return res.status(404).json({
                message : "Cart not found",
            });
        }

        cart.items = cart.items.filter(
            (item) => item.medicine.toString() !== medicineId
        );

        await cart.save();

        const updatedCart = await Cart.findById(cart._id).populate("items.medicine");
        res.status(200).json(updatedCart);

    } catch (error) {
        console.error("Remove cart error", error);
        res.status(500).json({
            message : "Server error",
        });
    }
};

const updateCartQuantity = async (req, res) => {
    try {
        const { medicineId, quantity } = req.body;

        const cart = await Cart.findOne({ user: req.user._id});

        if(!cart) {
            return res.status(400).json({
                message : "Cart not found"
            });
        }

        const item = cart.items.find(
            (item) => item.medicine.toString() === medicineId
        );

        if (!item) {
            return res.status(404).json({
                message: "Item not found in cart"
            });
        }

        item.quantity = Number(quantity);

        await cart.save();

        const updatedCart = await Cart.findById(cart._id).populate("items.medicine");

        res.json(updatedCart);


    } catch(error) {
        console.error("Update quantity error", error);
        res.status(500).json({
            message : "Server error"
        });
    }
};

module.exports = { addtoCart, getCart, removeFromCart, updateCartQuantity };