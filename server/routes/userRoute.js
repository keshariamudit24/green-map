const express = require("express");
const expressAsyncHandler = require('express-async-handler');
const userModel = require("../schemas/userSchema");
const userRoute = express.Router();

// define route handlers 

// all tags
userRoute.get("/all-tags", expressAsyncHandler(async (req, res) => {
    // get all users 
    const users = userModel.find();
    // get their tags and store them 
    const allTags = users.findMap(user => user.tag);

    // return the tags 
    res.status(200).send({ msg: "sending all tags", payload: allTags });
})) 

// my tags
userRoute.get("/my-tags/", expressAsyncHandler(async (req, res) => {
    const userId = req.auth
    if (!userId) {
        return res.status(401).send({ error: "Unauthorized" });
    }

    const user = await userModel.findOne({ _id: userId });
    if (!user) {
        return res.status(404).send({ error: "User not found" });
    }

    res.status(200).send({ msg: "sending user tags", payload: user.tag });
}))

// export 
module.exports = userRoute