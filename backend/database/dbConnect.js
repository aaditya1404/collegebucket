const mongoose = require("mongoose");

async function connectToDB(){
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to db");
    } catch (error) {
        console.log("Error connecting to database", error);
    }
}

module.exports = connectToDB;