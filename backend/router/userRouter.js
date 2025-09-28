const express = require("express");
const router = express.Router();

const signupValidation = require("../middlewares/signupValidation");
const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const loginValidation = require("../middlewares/loginValidation");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/authMiddleware");
const userIdValidation = require("../middlewares/userIdValidation");

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
                    _id: exsitingUser._id,
                    username: exsitingUser.username,
                    email: exsitingUser.email
                }, process.env.JWT_SECRET_KEY, { expiresIn: "1h" });
                res.cookie("token", token, {
                    httpOnly: true,
                    secure: false,
                    sameSite: "lax",
                    maxAge: 24 * 60 * 60 * 1000
                });
                const user = {
                    _id: exsitingUser._id,
                    username: exsitingUser.username,
                    email: exsitingUser.email
                }
                return res.status(200).json({ message: "User Login Successfull", success: true, token: token, logedInUser: user });
            } else {
                return res.status(500).json({ message: "Wrong Password", success: false });
            }
        })
    } catch (error) {
        console.log(error);
    }
})

router.get("/logout", (req, res) => {
    const token = req.cookies?.token;
    if (!token) {
        return res.status(400).json({ message: "No token found", success: false });
    }

    res.clearCookie("token", { httpOnly: true, secure: true, sameSite: "strict" });
    return res.status(200).json({ message: "User logged out successfully", success: true });
})

router.get("/check-auth", authMiddleware, async (req, res) => {
    return res.json({
        success: true,
        message: "User is authenticated",
        user: req.user
    });
})

router.get("/:id", userIdValidation, async (req, res) => {
    const userId = req.params.id;
    if (typeof userId === undefined) {
        return res.json({ message: "User Id is required", success: false });
    }
    try {
        const response = await userModel.findOne({ _id: userId });
        if (!response) {
            return res.status(500).json({ message: "Unable to fetch user info", success: false });
        }
        return res.status(200).json({ message: "Fetched user details successfully", success: true, userInfo: response });
    } catch (error) {
        console.log(error);
    }
})

router.post("/adduserprofile", async (req, res) => {
    let { userId, department, semester, contact, about } = req.body;
    if (!userId) {
        return res.status(500).json({ message: "User Id not found", success: false });
    }
    try {
        const updatedUser = await userModel.findByIdAndUpdate(
            { _id: userId },
            {
                department,
                semester,
                contact,
                about
            },
            { new: true }
        );
        if (!updatedUser) {
            return res.status(500).json({ message: "Error updating user profile", success: false });
        }
        return res.status(200).json({ message: "User profile updated", success: true, updatedUser: updatedUser });
    } catch (error) {
        console.log(error);
    }
})

module.exports = router;