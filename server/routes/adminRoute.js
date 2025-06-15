const express = require('express')
const expressAsyncHandler = require('express-async-handler')
const adminModel = require("../schemas/adminSchema")
const adminRoute = express.Router();

// post an event 
adminRoute.post('/event/post', expressAsyncHandler(async (req, res) => {
    
}))

// export 
module.exports = adminRoute