const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
    {
        user : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "User",
            required : true,
        },
        items : [
            {
                medicine : {
                    type : mongoose.Schema.Types.ObjectId,
                    ref : "Medicine",
                    required : true,
                },
                quantity : {
                    type : Number,
                    required : true,
                },
                price : {
                    type : Number,
                    required : true,
                },
                expiryDate: {
                    type: Date,
                }
            },
        ],
        totalAmount : {
            type : Number,
            required : true,
        },
        prescriptionImage : {
            type : String,
        },
        orderStatus : {
            type : String,
            enum : ["Pending", "Approved", "Rejected", "Shipped", "Delivered"],
            default : "Pending",
        },
    },
    {
        timestamps : true,
    },
);

module.exports = mongoose.model("Order", orderSchema);