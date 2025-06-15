const mongoose = require('mongoose')

const adminSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    events: [
        {
            title: {
                type: String,
                required: true
            },
            description: {
                type: String,
                required: true
            },
            date: {
                type: Date,
                required: true
            },
            time: {
                type: String,  // Changed from Time to String since we're getting HH:MM format
                required: true
            },
            location: {
                type: String,
                required: true
            },
            organizer: {
                type: String,
                required: true
            },
            maxParticipants: {
                type: Number,
                default: 50
            },
            isVirtual: {
                type: Boolean,
                default: false
            }
        }
    ]
}, {
    timestamps: true  // Adds createdAt and updatedAt timestamps
})

const adminModel = mongoose.model("admin", adminSchema)

module.exports = adminModel