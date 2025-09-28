const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        min: 3,
        max: 15
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    department: {
        type: String,
    },
    semester: {
        type: String
    },
    contact: {
        type: String
    },
    about: {
        type: String
    },
    productsbrought: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "product"
        }
    ],
    listedProduct: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "product"
        }
    ]
});

module.exports = mongoose.model("user", userSchema);