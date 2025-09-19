const express = require("express");
const productModel = require("../models/productModel");
const router = express.Router();

router.get("/", (req, res) => {
    res.send("Product Router");
})

router.post("/add", async (req, res) => {
    let { productname, productdesc, productprice } = req.body;
    try {
        let createdProduct = await productModel.create({
            productname,
            productdesc,
            productprice
        });
        if (!createdProduct) {
            return res.status(500).json({ message: 'Error adding the product', success: false });
        }
        return res.status(200).json({ message: "Product added successfully", success: true, product: createdProduct });
    } catch (error) {
        console.log(error);
    }
})

module.exports = router;