const express = require("express");
const app = express();

app.use(json());

app.listen(3000);

// routes 
app.use("/user", userRoute);