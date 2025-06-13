const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config();
const app = express();
const PORT = process.env.PORT

app.use(json());

mongoose.connect(process.env.MONGODB_URL)
    .then(() => { app.listen(PORT, () => { console.log(`listening on port: ${PORT}.....`) }) })
    .catch()

// routes 
app.use("/user", userRoute);