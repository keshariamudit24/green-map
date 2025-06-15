require('dotenv').config();
const express = require("express");
const expressAsyncHandler = require('express-async-handler');
const userModel = require("../schemas/userSchema");
const userRoute = express.Router();
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Make sure this folder exists
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'image-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

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

// update a tag
userRoute.put('/update', upload.single('image'), expressAsyncHandler(async (req, res) => {
  try {
    const { email, tagId, confirmUpdate, ...tagData } = req.body;
    console.log("Request body:", req.body);
    
    // Check if email is provided
    if (!email) {
      return res.status(401).send({ error: "Unauthorized: Email is required" });
    }
    
    // Check if tag ID is provided
    if (!tagId) {
      return res.status(400).send({ error: "Tag ID is required" });
    }
    
    // Check for confirmation
    if (!confirmUpdate) {
      return res.status(400).send({ error: "Update confirmation is required", requireConfirmation: true });
    }
    
    const currUser = await userModel.findOne({ email });
    
    // Check if user exists
    if (!currUser) {
      return res.status(404).send({ error: "User not found" });
    }
    
    // Find the tag to update - Try both _id and id formats
    // The ObjectId comparison might be failing, so let's use string comparison
    const tagIndex = currUser.tag.findIndex(tag => 
      tag._id.toString() === tagId.toString()
    );
    
    if (tagIndex === -1) {
      return res.status(404).send({ error: "Tag not found" });
    }
    
    console.log("Found tag at index:", tagIndex);
    
    // Update the tag with new data, preserving fields not in the request
    Object.keys(tagData).forEach(key => {
      if (tagData[key] !== undefined) {
        currUser.tag[tagIndex][key] = tagData[key];
      }
    });
    
    // Handle image upload if provided
    if (req.file) {
      currUser.tag[tagIndex].imgUrl = `/uploads/${req.file.filename}`;
    }
    
    // Save the updated user document
    await currUser.save();
    
    res.status(200).send({ 
      msg: "Tag updated successfully", 
      payload: currUser.tag[tagIndex] 
    });
  } catch (error) {
    console.error("Error updating tag:", error);
    res.status(500).send({ error: "Internal server error", details: error.message });
  }
}));

// delete a tag 
userRoute.delete('/delete', expressAsyncHandler(async (req, res) => {
    const { email, tagId, confirmDelete } = req.body;
    
    // Check if email is provided
    if (!email) {
        return res.status(401).send({ error: "Unauthorized: Email is required" });
    }
    
    // Check if tag ID is provided
    if (!tagId) {
        return res.status(400).send({ error: "Tag ID is required" });
    }
    
    // Check for confirmation
    if (!confirmDelete) {
        return res.status(400).send({ error: "Delete confirmation is required", requireConfirmation: true });
    }
    
    const currUser = await userModel.findOne({ email });
    
    // Check if user exists
    if (!currUser) {
        return res.status(404).send({ error: "User not found" });
    }
    
    // Find the tag to delete
    const tagIndex = currUser.tag.findIndex(tag => tag._id.toString() === tagId);
    
    if (tagIndex === -1) {
        return res.status(404).send({ error: "Tag not found" });
    }
    
    // Save the tag for the response
    const deletedTag = currUser.tag[tagIndex];
    
    // Remove the tag from the array
    currUser.tag.splice(tagIndex, 1);
    
    // Save the updated user document
    await currUser.save();
    
    res.status(200).send({ 
        msg: "Tag deleted successfully", 
        payload: deletedTag 
    });
}));

// get all events 


// export 
module.exports = userRoute