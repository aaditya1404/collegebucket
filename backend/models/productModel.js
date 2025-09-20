const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    productname: {
        type: String,
        required: true
    },
    productdesc: {
        type: String,
        required: true
    },
    productprice: {
        type: String,
        required: true
    },
    listedByUserId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"user"
    }
})

module.exports = mongoose.model("product", productSchema);