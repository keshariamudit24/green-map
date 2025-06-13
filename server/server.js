const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config();
const app = express();
const PORT = process.env.PORT
const userRoute = require("./routes/userRoute")
const tagRoute = require("./routes/userRoute")

app.use(express.json());

mongoose.connect(process.env.MONGODB_URL)
    .then(() => { app.listen(PORT, () => { console.log(`listening on port: ${PORT}.....`) }) })
    .catch()

// routes 
// app.use("/auth", authRoute);
app.use("/user", userRoute);
app.use("/tag", tagRoute);