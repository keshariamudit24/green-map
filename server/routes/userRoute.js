require('dotenv').config();
const express = require("express");
const expressAsyncHandler = require('express-async-handler');
const userModel = require("../schemas/userSchema");
const userRoute = express.Router();

// define route handlers 

// all tags
userRoute.get("/all-tags", expressAsyncHandler(async (req, res) => {
  const users = await userModel.find();

    const allTags = users.flatMap(user =>
        user.tag.map(tag => ({
            userTag: tag,
            userFirstName: user.firstName
        }))
    );

  res.status(200).send({ msg: "sending all tags", payload: allTags });
}));

// my tags
userRoute.get("/my-tags/:email", expressAsyncHandler(async (req, res) => {
    const { email } = req.params;
    console.log("user email: ", email)
    if (!email) {
        return res.status(401).send({ error: "Unauthorized" });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
        return res.status(404).send({ error: "User not found" });
    }

    res.status(200).send({ msg: "sending user tags", payload: user.tag });
}))

// export 
module.exports = userRoute