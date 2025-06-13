const mongoose = require('mongoose');

// define schemas
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    firstName: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    tag: [
        {
            entity: {
                type: String,
                required: true
            },
            species: String,
            age: Number,
            location: {
                type: String,
                required: true
            },
            description: {
                type: String,
                required: true
            },
            imgUrl: String
        }
    ]
})

// create model 
const userModel = mongoose.model("user", userSchema)

// export
module.exports = userModel 