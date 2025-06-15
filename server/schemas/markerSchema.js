const mongoose = require('mongoose');

const markerSchema = new mongoose.Schema({
    entity: {
        type: String,
        required: true
    },
    species: String,
    age: Number,
    location: {
        type: {
            type: String,
            default: 'Point'
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    description: {
        type: String,
        required: true
    },
    imgUrl: String
}, { timestamps: true });

markerSchema.index({ location: '2dsphere' });
const Marker = mongoose.model('Marker', markerSchema);

module.exports = Marker;
