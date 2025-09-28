const express = require("express");
const app = express();

const cookieParser = require("cookie-parser");
app.use(cookieParser());
const cors = require("cors");
let dotenv = require("dotenv").config();
const connectToDB = require("./database/dbConnect");
connectToDB();

app.use(express.json());
app.use(cors({
    origin: ["http://localhost:3000", "https://collegebucket-backend.onrender.com"],
    credentials: true,
}));

const userRouter = require("./router/userRouter");
const productRouter = require("./router/productRouter");

app.use("/user", userRouter);
app.use("/product", productRouter);

app.get("/", (req, res) => {
    res.send("Main backend route");
})

app.listen(process.env.SERVER_PORT, () => {
    console.log("Server is running");
});