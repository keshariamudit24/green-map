const express = require('express');
const authRoute = express.Router();
const expressAsyncHandler = require('express-async-handler');

authRoute.post("/store/db", expressAsyncHandler(async (req, res) => {
    const { email, firstName } = req.body
    const checkUser = await UserModel.findOne({ email });
    if(!checkUser){ 
        // create one 
        const newUser = new UserModel({
            email,
            firstName
        })
        await newUser.save();
        return res.status(201).json({ message: "User created", user: newUser });
    } else {
        return res.status(200).json({ message: "User already exists", user: checkUser });
    }
}))

module.exports = authRoute