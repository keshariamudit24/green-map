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
            redirectUrl: '/admin/events'  // Ensure this matches frontend
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
    try {
        const admin = await adminModel.findOne({ email: process.env.ADMIN_EMAIL });
        admin.events.push(req.body);
        await admin.save();
        res.status(201).send({ 
            msg: "Event added successfully",
            event: admin.events[admin.events.length - 1]
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Failed to add event" });
    }
}));

// get all events 
adminRoute.get('/all/events', expressAsyncHandler(async (req, res) => {
    try {
        const admin = await adminModel.findOne({ email: process.env.ADMIN_EMAIL })
        if (!admin) {
            return res.status(404).send({ error: "Admin not found" });
        }
        res.status(200).send({ msg: "sending all events", payload: admin.events })
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Failed to fetch events" });
    }
}));

// get single event
adminRoute.get('/event/:id', expressAsyncHandler(async (req, res) => {
    try {
        const admin = await adminModel.findOne({ email: process.env.ADMIN_EMAIL });
        const event = admin.events.find(event => event._id.toString() === req.params.id);
        
        if (!event) {
            return res.status(404).send({ error: "Event not found" });
        }
        
        res.status(200).send({ event });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Failed to fetch event" });
    }
}));

// delete event
adminRoute.delete('/event/:id', expressAsyncHandler(async (req, res) => {
    try {
        const result = await adminModel.updateOne(
            { email: process.env.ADMIN_EMAIL },
            { $pull: { events: { _id: req.params.id } } }
        );
        
        if (result.modifiedCount > 0) {
            res.status(200).send({ msg: "Event deleted successfully" });
        } else {
            res.status(404).send({ error: "Event not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Failed to delete event" });
    }
}));

// update event
adminRoute.put('/event/:id', expressAsyncHandler(async (req, res) => {
    try {
        const result = await adminModel.updateOne(
            { 
                email: process.env.ADMIN_EMAIL,
                "events._id": req.params.id 
            },
            { 
                $set: { "events.$": { ...req.body, _id: req.params.id } }
            }
        );

        if (result.modifiedCount > 0) {
            res.status(200).send({ msg: "Event updated successfully" });
        } else {
            res.status(404).send({ error: "Event not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Failed to update event" });
    }
}));

// export 
module.exports = adminRoute