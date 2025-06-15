require('dotenv').config();
const express = require('express')
const expressAsyncHandler = require('express-async-handler')
const adminModel = require("../schemas/adminSchema")
const adminRoute = express.Router();

adminRoute.post('/auth/signin', expressAsyncHandler(async (req ,res) => {
    const { email, password } = req.body
    
    // check if it is correct 
    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASS) {
        console.log("Authentication successful");
        const currAdmin = await adminModel.findOne({ email });
        if(!currAdmin){
            // admin doesnt exist, create one and store in the db
            const admin = new adminModel({
                email,
            })
            await admin.save();
        }
        res.status(200).send({ 
            msg: "valid credentials, you're in!",
            redirectUrl: '/admin/events/add'  // Changed from /admin/events/add to /admin/events
        });
    } else {
        console.log("Authentication failed");
        res.status(401).send({ 
            error: "Invalid credentials",
            showToast: true
        });
    }

}))

// post an event 
adminRoute.post('/event/post', expressAsyncHandler(async (req, res) => {

}))

// get all events 

// export 
module.exports = adminRoute