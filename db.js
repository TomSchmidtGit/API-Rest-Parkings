const { MongoClient } = require('mongodb');

const url = 'mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.0.1';
const dbName = 'parkingApi';

let db;
let client;

async function connectToDatabase() {
    try {
        client = await MongoClient.connect(url);
        console.log('Connecté à MongoDB');
        db = client.db(dbName);
    } catch (error) {
        console.error('Erreur de connexion à MongoDB:', error);
        throw error;
    }
}

function getDatabase() {
    if (!db) {
        throw new Error('La base de données n\'est pas encore connectée. Assurez-vous d\'appeler connectToDatabase() avant getDatabase().');
    }
    return db;
}

async function closeDatabase() {
    try {
        if (client) {
            await client.close();
            console.log('Déconnecté de MongoDB');
        }
    } catch (error) {
        console.error('Erreur lors de la déconnexion de MongoDB:', error);
        throw error;
    }
}

module.exports = { connectToDatabase, getDatabase, closeDatabase };