const express = require('express');
const authRoute = express.Router();
const expressAsyncHandler = require('express-async-handler');
// Import the UserModel that's missing
const userModel = require('../schemas/userSchema');

authRoute.post("/store/db", expressAsyncHandler(async (req, res) => {
    const { email, firstName } = req.body
    // console.log("email : ", email)
    // console.log("firstName : ", firstName)
    const checkUser = await userModel.findOne({ email });
    if(!checkUser){ 
        // create one 
        const newUser = new userModel({
            email,
            firstName
        })
        await newUser.save();
        return res.status(201).json({ message: "User created", user: newUser });
    } else {
        return res.status(200).json({ message: "User already exists", user: checkUser });
    }
}));

module.exports = authRoute;