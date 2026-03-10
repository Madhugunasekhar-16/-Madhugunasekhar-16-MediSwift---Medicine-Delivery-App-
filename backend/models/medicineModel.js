const mongoose = require("mongoose");

const medicineSchema = new mongoose.Schema(
    {
        name : {
            type : String,
            required : true,
        },
        category: { 
            type: String, 
            required: true, 
            enum: ["Pain Relief", "Antibiotics", "Diabetes Care", "Heart Health", "Digestive Health", "Vitamins", "Personal Care"] 
        },
        description : {
            type : String,
            required : true,
        },
        price : {
            type : Number,
            required : true,
        },
        stock : {
            type : Number,
            required : true,
            default : 0,
        },
        expiryDate : {
            type : Date,
        },
        prescriptionRequired : {
            type : Boolean,
            default : false,
        },
        image : {
            type : String,
        },
    },
    {
        timestamps : true,
    }
);

module.exports = mongoose.model("Medicine", medicineSchema);