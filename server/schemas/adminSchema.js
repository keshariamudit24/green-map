const mongoose = require('mongoose')

const adminSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    firstName: {
        type: String,
        required: true
    },
    events: []
})

const adminModel = mongoose.model("admin", adminSchema)

module.exports = adminModel