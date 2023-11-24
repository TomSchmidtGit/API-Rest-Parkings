const express = require('express');
const router = express.Router();
const { getDatabase } = require('../db');
const jwt = require('jsonwebtoken');

const secretKey = 'your-secret-key';

router.post('/login', async (req, res) => {
    const db = getDatabase();
    const parkingsCollection = db.collection('parkingsreservations');
    const parking = await parkingsCollection.findOne({ id: req.id });

    const token = jwt.sign({ parking }, secretKey);
    res.json({ token });
});

module.exports = router;
