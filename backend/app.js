const express = require("express");
const app = express();

let dotenv = require("dotenv").config();

app.get("/", (req, res) => {
    res.send("Main backend route");
})

app.listen(process.env.SERVER_PORT, () => {
    console.log("Server is running");
});