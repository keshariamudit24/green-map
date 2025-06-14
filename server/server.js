const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config();
const cors = require('cors')
const path = require('path');
const app = express();
const PORT = process.env.PORT
const userRoute = require("./routes/userRoute")
const adminRoute = require("./routes/adminRoute")
const tagRoute = require("./routes/tagRoute")
const authRoute = require("./routes/authRoute")

app.use(cors({
  origin: ['http://localhost:5173'],
  credentials: true
}));
app.use(express.json());
// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

mongoose.connect(process.env.MONGODB_URL)
    .then(() => { app.listen(PORT, () => { console.log(`listening on port: ${PORT}.....`) }) })
    .catch()

// routes 
app.use("/auth", authRoute); // store auth details in db
app.use("/user", userRoute); // alltags, mytags
app.use('/admin', adminRoute) // handle events
app.use("/tag", tagRoute); //post a tag