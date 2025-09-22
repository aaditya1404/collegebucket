const express = require("express");
const productModel = require("../models/productModel");
const userModel = require("../models/userModel");
const addProductValidation = require("../middlewares/addProductValidation");
const router = express.Router();

router.get("/", (req, res) => {
    res.send("Product Router");
})

router.post("/add", addProductValidation, async (req, res) => {
    let { productname, productdesc, productprice, productImageurl, listedByUserId } = req.body;
    console.log(productImageurl);
    try {
        let createdProduct = await productModel.create({
            productname,
            productdesc,
            productprice,
            productImageurl,
            listedByUserId
        });
        await userModel.findByIdAndUpdate(
            listedByUserId,
            { $push: { listedProduct: createdProduct._id } },
            { new: true }
        );
        if (!createdProduct) {
            return res.status(500).json({ message: 'Error adding the product', success: false });
        }
        return res.status(200).json({ message: "Product added successfully", success: true, product: createdProduct });
    } catch (error) {
        console.log(error);
    }
});

router.get("/allproduct", async (req, res) => {
    try {
        let allProduct = await productModel.find();
        if (!allProduct) {
            return res.status(500).json({ message: "Error fetching the products", success: false });
        }
        return res.status(200).json({ message: "Products fetch successfully", success: true, allProduct: allProduct });
    } catch (error) {
        console.log(error);
    }
});

router.get("/:id", async (req, res) => {
    const userId = req.params.id;
    try {
        const userProduct = await productModel.find({ listedByUserId: userId });
        if (!userProduct) {
            return res.status(500).json({ message: "Add some products to sell", success: false, userProduct: "" });
        }
        return res.status(200).json({ message: "Fetched the product", success: true, userProduct: userProduct });
    } catch (error) {
        console.log(error);
    }
})

module.exports = router;