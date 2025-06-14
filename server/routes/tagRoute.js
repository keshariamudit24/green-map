const express = require('express');
const { getAuth } = require('@clerk/clerk-sdk-node');
const expressAsyncHandler = require('express-async-handler');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const userModel = require('../schemas/userSchema');

const tagRoute = express.Router();

// Configure multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Create uploads directory if it doesn't exist
    const uploadDir = path.join(__dirname, '../uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    // Generate unique filename
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, 'image-' + uniqueSuffix + ext);
  }
});

// File filter for images only
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

// Initialize multer upload
const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5 MB size limit
  }
});

// Route to add a new tag
tagRoute.post('/add', upload.single('image'), expressAsyncHandler(async (req, res) => {
  try {
    // Get clerk user ID from auth
    // console.log(req.body)
    const { userEmail } = req.body
    // Find the user
    const user = await userModel.findOne({ email: userEmail });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    // Create new tag
    const newTag = {
      entity: req.body.entity,
      species: req.body.species || '',
      age: req.body.age ? parseInt(req.body.age) : undefined,
      location: req.body.location,
      description: req.body.description,
      // Store username within the tag data structure
      postedBy: user.username || 'Anonymous User',
      // Set image URL if file was uploaded
      imgUrl: req.file ? `/uploads/${req.file.filename}` : ''
    };

    // Add tag to user
    user.tag.push(newTag);
    await user.save();

    res.status(201).json({ message: 'Tag added successfully', tag: newTag });
  } catch (error) {
    console.error('Error adding tag:', error);
    res.status(500).json({ error: error.message });
  }
}));

module.exports = tagRoute;