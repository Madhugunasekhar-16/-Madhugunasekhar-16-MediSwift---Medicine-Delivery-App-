const mongoose = require("mongoose");

const medicineSchema = new mongoose.Schema(
    {
        name : {
            type : String,
            required : true,
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