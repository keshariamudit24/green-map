const express = require("express");
const expressAsyncHandler = require('express-async-handler')
const userModel = require("../schemas/userSchema")
const tagRoute = express.Router();

// define route handlers 
tagRoute.post("/submit", expressAsyncHandler(async (req, res) => {
    // userEmail, form details
    // form details: entity, species, age, location, description, imgUrl
    // take the req inputs 
    const { email, entity, species, age, location, description, imgUrl } = req.body;
    // find the user based on email 
    const currUser = await userModel.findOne({ email });
    if(!currUser){
        res.status(404).send({ msg: "User not found" })
    } 
    // update the currUser 
    const newTag = {
        entity,
        location,
        description
    };
    if (species) newTag.species = species;
    if (age !== undefined) newTag.age = age;
    if (imgUrl) newTag.imgUrl = imgUrl;
    // Push and save
    currUser.tag.push(newTag);
    await currUser.save();

    res.status(200).send({ msg: "Tag submitted successfully" });
}))

// export 
module.exports = tagRoute