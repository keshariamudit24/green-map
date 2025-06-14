const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config();
const app = express();
const PORT = process.env.PORT
const userRoute = require("./routes/userRoute")
const adminRoute = require("./routes/adminRoute")
const tagRoute = require("./routes/tagRoute")
const authRoute = require("./routes/authRoute")

app.use(express.json());

mongoose.connect(process.env.MONGODB_URL)
    .then(() => { app.listen(PORT, () => { console.log(`listening on port: ${PORT}.....`) }) })
    .catch()

// routes 
app.use("/auth", authRoute); // store auth details in db
app.use("/user", userRoute); // alltags, mytags
app.use('/admin', adminRoute) // handle events
app.use("/tag", tagRoute); //post a tag