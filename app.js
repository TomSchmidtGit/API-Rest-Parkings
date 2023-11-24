const express = require('express');
const { connectToDatabase } = require('./db');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');

const parkingRoutes = require('./routes/parkingsRoutes');
const authRoutes = require('./routes/authRoutes');

const secretKey = 'your-secret-key';

app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const PORT = 8080;
connectToDatabase()
    .then(() => {
        // Une fois la connexion réussie, définis les routes
        app.use('/parkings', parkingRoutes);
        app.use('/', authRoutes);

        app.listen(PORT, () => {
            console.log(`Serveur à l'écoute sur le port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Erreur de connexion à la base de données:', error);
        process.exit(1);
    });

module.exports = app;
