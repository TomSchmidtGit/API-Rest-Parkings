const express = require('express');
const router = express.Router();
const { authenticateJWT } = require('../middleware');
const { getDatabase } = require('../db');
const etag = require('etag');

const secretKey = 'your-secret-key';

router.get('/', authenticateJWT, async (req, res) => {
    const db = getDatabase();
    const parkingsCollection = db.collection('parkingsreservations');
    const parkings = await parkingsCollection.find({}).toArray();

    const responseETag = etag(JSON.stringify(parkings)).replace(/\"/g, "");

    if (req.headers['if-none-match'] === responseETag) {
        res.sendStatus(304);
        console.log("Not modified");
    } else {
        res.set('if-none-match', responseETag);
        res.status(200).json({ parkings, responseETag });
        console.log("Données affichées");
    }
});

router.get('/:id', authenticateJWT, async (req, res) => {
    try {
        const db = getDatabase();
        const parkingsCollection = db.collection('parkingsreservations');
        const id = parseInt(req.params.id);
        const parking = await parkingsCollection.findOne({ id: id });

        if (parking) {
            const responseETag = etag(JSON.stringify(parking)).replace(/\"/g, "");

            if (req.headers['if-none-match'] === responseETag) {
                res.sendStatus(304);
                console.log("Not modified");
            } else {
                res.set('if-none-match', responseETag);
                res.status(200).json({ parking, responseETag });
                console.log("Données affichées");
            }
        } else {
            res.status(404).json({ message: 'Parking non trouvé' });
        }
    } catch (error) {
        console.error('Erreur lors de la récupération du parking depuis la base de données:', error);
        res.status(500).json({ message: 'Erreur interne du serveur' });
    }
});

router.get('/:id/reservations', authenticateJWT, async (req, res) => {
    try {
        const db = getDatabase();
        const parkingsreservationsCollection = db.collection('parkingsreservations');
        const id = parseInt(req.params.id);
        const reservations = await parkingsreservationsCollection.find({ "reservations.parkingId": id }).toArray();

        if (reservations) {
            const responseETag = etag(JSON.stringify(reservations)).replace(/\"/g, "");

            if (req.headers['if-none-match'] === responseETag) {
                res.sendStatus(304);
                console.log("Not modified");
            } else {
                res.set('if-none-match', responseETag);
                res.status(200).json({ reservations, responseETag });
                console.log("Données affichées");
            }
        } else {
            res.status(404).json({ message: 'Réservations non trouvées pour le parking spécifié' });
        }
    } catch (error) {
        console.error('Erreur lors de la récupération des réservations depuis la base de données:', error);
        res.status(500).json({ message: 'Erreur interne du serveur' });
    }
});

router.get('/reservations/:id', authenticateJWT, async (req, res) => {
    try {
        const db = getDatabase();
        const parkingsreservationsCollection = db.collection('parkingsreservations');
        const id = parseInt(req.params.id);
        const reservation = await parkingsreservationsCollection.findOne({ "reservations.id": id });

        if (reservation) {
            res.status(200).json(reservation);
        } else {
            res.status(404).json({ message: 'Réservation non trouvée' });
        }
    } catch (error) {
        console.error('Erreur lors de la récupération de la reservation depuis la base de données:', error);
        res.status(500).json({ message: 'Erreur interne du serveur' });
    }
});

router.post('/', authenticateJWT, async (req, res) => {
    try {
        const db = getDatabase();
        const parkingsCollection = db.collection('parkingsreservations');
        const newParking = req.body;
        await parkingsCollection.insertOne(newParking);
        const parkings = await parkingsCollection.find({}).toArray();
        res.status(200).json(parkings);
    } catch (error) {
        console.error('Erreur lors de l\'ajout du parking à la base de données:', error);
        res.status(500).json({ message: 'Erreur interne du serveur' });
    }
});

router.put('/:id', authenticateJWT, async (req, res) => {
    try {
        const db = getDatabase();
        const parkingsCollection = db.collection('parkingsreservations');
        const id = parseInt(req.params.id);
        const updatedParking = req.body;

        const result = await parkingsCollection.updateOne({ id: id }, { $set: updatedParking });

        if (result.modifiedCount > 0) {
            const parkings = await parkingsCollection.find({}).toArray();
            res.status(200).json(parkings);
            console.log('Parking Modifié');
        } else {
            res.status(404).json({ message: 'Parking non trouvé, impossible de le mettre à jour.' });
        }
    } catch (error) {
        console.error('Erreur lors de la mise à jour du parking dans la base de données:', error);
        res.status(500).json({ message: 'Erreur interne du serveur' });
    }
});

router.delete('/:id', authenticateJWT, async (req, res) => {
    try {
        const db = getDatabase();
        const parkingsCollection = db.collection('parkingsreservations');
        const id = parseInt(req.params.id);
        const result = await parkingsCollection.deleteOne({ id: id });

        if (result.deletedCount > 0) {
            const parkings = await parkingsCollection.find({}).toArray();
            res.status(200).json(parkings);
        } else {
            res.status(404).json({ message: 'Parking non trouvé, impossible de le supprimer.' });
        }
    } catch (error) {
        console.error('Erreur lors de la suppression du parking depuis la base de données:', error);
        res.status(500).json({ message: 'Erreur interne du serveur' });
    }
});

module.exports = router;
