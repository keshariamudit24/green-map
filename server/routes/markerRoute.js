const express = require('express');
const Marker = require('../schemas/markerSchema');
const userModel = require('../schemas/userSchema');

const router = express.Router();

// Get all markers
router.get('/all', async (req, res) => {
    try {
        const markers = await Marker.find();
        const users = await userModel.find();
        const allTags = users.flatMap(user =>
            user.tag.map(tag => ({
                userTag: tag,
                userFirstName: user.firstName
            }))
        );
        const combined = [...markers, ...allTags];
        res.json(combined);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch markers' });
    }
});

// Post new marker
router.post('/post', async (req, res) => {
    try {
        const marker = new Marker(req.body);
        await marker.save();
        res.status(201).json(marker);
    } catch (error) {
        console.error('Error saving marker:', error);
        res.status(500).json({ error: 'Failed to save marker' });
    }
});

module.exports = router;