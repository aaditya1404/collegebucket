const express = require("express");
const app = express();

let dotenv = require("dotenv").config();
const connectToDB = require("./database/dbConnect");
connectToDB();

const userRouter = require("./router/userRouter");
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use("/user", userRouter);
app.use(cookieParser());

app.get("/", (req, res) => {
    res.send("Main backend route");
})

app.listen(process.env.SERVER_PORT, () => {
    console.log("Server is running");
});