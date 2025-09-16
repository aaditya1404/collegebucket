const express = require("express");
const router = express.Router();

const signupValidation = require("../middlewares/signupValidation");
const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const loginValidation = require("../middlewares/loginValidation");
const jwt = require("jsonwebtoken");

router.get("/", (req, res) => {
    res.send("User router");
});

router.post("/signup", signupValidation, async (req, res) => {
    let { username, email, password } = req.body;

    let exsitingUser = await userModel.findOne({ email });
    if (exsitingUser) {
        return res.status(500).json({ message: "Email already in use", success: false });
    }
    try {
        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(password, salt, async function (err, hash) {
                const newUser = await userModel.create({
                    username,
                    email,
                    password: hash
                });
                if (newUser) {
                    return res.status(200).json({ message: "New User Created", success: true, newUser: newUser });
                }
                res.status(500).json({ message: "Error creating the user", success: false });
            });
        });
    } catch (error) {
        console.log(error);
    }
});

router.post("/login", loginValidation, async (req, res) => {
    let { email, password } = req.body;
    try {
        const exsitingUser = await userModel.findOne({ email });
        if (!exsitingUser) {
            return res.status(500).json({ message: "User does not exsits", success: false });
        }

        bcrypt.compare(password, exsitingUser.password, (err, result) => {
            if (result) {
                let token = jwt.sign({
                    username: exsitingUser.username,
                    email: exsitingUser.email
                }, process.env.JWT_SECRET_KEY, { expiresIn: "1h" });
                res.cookie("token", token);
                return res.status(200).json({ message: "User Login Successfull", success: true, token: token, logedInUser: exsitingUser });
            } else {
                return res.status(500).json({ message: "Wrong Password", success: false });
            }
        })
    } catch (error) {
        console.log(error);
    }
})

router.get("/logout", (req, res) => {
    res.clearCookie("token", { httpOnly: true, secure: true, sameSite: "strict" });
    return res.status(200).json({ message: "User logged out successfull", success: true });
})

module.exports = router;