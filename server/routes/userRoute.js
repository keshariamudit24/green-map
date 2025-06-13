const express = require("express");
const expressAsyncHandler = require('express-async-handler')
const userRoute = express.Router();

// define route handlers 

// all tags
// my tags
userRoute.get("/get/all", expressAsyncHandler(async (req, res) => {
    res.status(200).send({ msg: "successfull" });
}))

// export 
module.exports = userRoute