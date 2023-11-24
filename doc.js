// Routes
/**
 * @swagger
 * /parkings:
 *   get:
 *     summary: Récupérer les parkings avec gestion de la mise en cache (ETag)
 *     description: Récupère la ressource depuis la base de données et gère la mise en cache avec ETag.
 *     tags:
 *       - Parkings
 *     security:
 *       - BearerAuth: []  # Utilisez le jeton d'authentification JWT (Bearer Token)
 *     parameters:
 *       - in: header
 *         name: If-None-Match
 *         description: Valeur de l'en-tête ETag pour la requête
 *         required: false
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Succès, renvoie la ressource et l'ETag.
 *         content:
 *           application/json:
 *             example:
 *               parkings:
 *                 - _id: "60f3a9b1c7ef2a1e9c74ef53"
 *                   name: "Parking A"
 *                   capacity: 50
 *                   location: "Adresse du Parking A"
 *                 - _id: "60f3a9b1c7ef2a1e9c74ef54"
 *                   name: "Parking B"
 *                   capacity: 30
 *                   location: "Adresse du Parking B"
 *               responseETag: "a1b2c3d4"
 *       304:
 *         description: Non modifié, utilisez la copie en cache.
 *         content:
 *           application/json:
 *             example:
 *               message: "Non modifié, utilisez la copie en cache."
 *       401:
 *         description: Non autorisé, jeton d'authentification manquant ou invalide.
 *         content:
 *           application/json:
 *             example:
 *               message: "Non autorisé, jeton d'authentification manquant ou invalide."
 *       500:
 *         description: Erreur interne du serveur.
 *         content:
 *           application/json:
 *             example:
 *               message: "Erreur interne du serveur"
 */

/**
 * @swagger
 * /parkings/{id}:
 *   get:
 *     summary: Récupérer les détails d'un parking avec gestion de la mise en cache (ETag) (Même retour que /parkings/{id}/reservations)
 *     description: Récupère les détails d'un parking depuis la base de données et gère la mise en cache avec ETag.
 *     tags:
 *       - Parkings
 *     security:
 *       - BearerAuth: []  # Utilisez le jeton d'authentification JWT (Bearer Token)
 *     parameters:
 *       - in: header
 *         name: If-None-Match
 *         description: Valeur de l'en-tête ETag pour la requête
 *         required: false
 *         schema:
 *           type: string
 *       - in: path
 *         name: id
 *         description: Identifiant unique du parking à récupérer
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Succès, renvoie les détails du parking et l'ETag.
 *         content:
 *           application/json:
 *             example:
 *               _id: "60f3a9b1c7ef2a1e9c74ef53"
 *               name: "Parking A"
 *               capacity: 50
 *               location: "Adresse du Parking A"
 *               responseETag: "a1b2c3d4"
 *       304:
 *         description: Non modifié, utilisez la copie en cache.
 *         content:
 *           application/json:
 *             example:
 *               message: "Non modifié, utilisez la copie en cache."
 *       404:
 *         description: Parking non trouvé.
 *         content:
 *           application/json:
 *             example:
 *               message: "Parking non trouvé."
 *       401:
 *         description: Non autorisé, jeton d'authentification manquant ou invalide.
 *         content:
 *           application/json:
 *             example:
 *               message: "Non autorisé, jeton d'authentification manquant ou invalide."
 *       500:
 *         description: Erreur interne du serveur.
 *         content:
 *           application/json:
 *             example:
 *               message: "Erreur interne du serveur"
 */

/**
 * @swagger
 * /parkings/{id}/reservations:
 *   get:
 *     summary: Récupérer les réservations d'un parking avec gestion de la mise en cache (ETag) (Même retour que /parkings/{id})
 *     description: |
 *       Récupère les réservations d'un parking depuis la base de données et gère la mise en cache avec ETag.
 *     tags:
 *       - Reservations
 *     security:
 *       - BearerAuth: []  # Utilisez le jeton d'authentification JWT (Bearer Token)
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Identifiant unique du parking pour lequel récupérer les réservations
 *         required: true
 *         schema:
 *           type: integer
 *       - in: header
 *         name: If-None-Match
 *         description: Valeur de l'en-tête ETag pour la requête
 *         required: false
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: |
 *           Succès, renvoie les réservations du parking et l'ETag.
 *         content:
 *           application/json:
 *             example: |
 *               {
 *                 "reservations": [
 *                   {
 *                     "_id": "60f3a9b1c7ef2a1e9c74ef55",
 *                     "date": "2023-01-01",
 *                     "parkingId": 1
 *                     // autres détails des réservations
 *                   },
 *                   {
 *                     "_id": "60f3a9b1c7ef2a1e9c74ef56",
 *                     "date": "2023-01-02",
 *                     "parkingId": 1
 *                     // autres détails des réservations
 *                   }
 *                 ],
 *                 "responseETag": "a1b2c3d4"
 *               }
 *       304:
 *         description: Non modifié, utilisez la copie en cache.
 *         content:
 *           application/json:
 *             example:
 *               message: "Non modifié, utilisez la copie en cache."
 *       404:
 *         description: |
 *           Réservations non trouvées pour le parking spécifié.
 *         content:
 *           application/json:
 *             example:
 *               message: "Réservations non trouvées pour le parking spécifié."
 *       401:
 *         description: |
 *           Non autorisé, jeton d'authentification manquant ou invalide.
 *         content:
 *           application/json:
 *             example:
 *               message: "Non autorisé, jeton d'authentification manquant ou invalide."
 *       500:
 *         description: Erreur interne du serveur.
 *         content:
 *           application/json:
 *             example:
 *               message: "Erreur interne du serveur"
 */

/**
 * @swagger
 * /parkings/reservations/{id}:
 *   get:
 *     summary: Récupérer les détails d'une réservation précise ainsi que le parking lié
 *     description: >
 *       Récupère les détails d'une réservation pour un parking spécifique depuis la base de données.
 *     tags:
 *       - Reservations
 *     security:
 *       - BearerAuth: []  # Utilisez le jeton d'authentification JWT (Bearer Token)
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Identifiant unique de la réservation à récupérer
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: >
 *           Succès, renvoie les détails de la réservation.
 *         content:
 *           application/json:
 *             example:
 *               _id: "60f3a9b1c7ef2a1e9c74ef55"
 *               date: "2023-01-01"
 *               parkingId: 1
 *               # autres détails de la réservation
 *       404:
 *         description: >
 *           Réservation non trouvée pour l'identifiant spécifié.
 *         content:
 *           application/json:
 *             example:
 *               message: "Réservation non trouvée."
 *       401:
 *         description: >
 *           Non autorisé, jeton d'authentification manquant ou invalide.
 *         content:
 *           application/json:
 *             example:
 *               message: "Non autorisé, jeton d'authentification manquant ou invalide."
 *       500:
 *         description: >
 *           Erreur interne du serveur.
 *         content:
 *           application/json:
 *             example:
 *               message: "Erreur interne du serveur."
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Parking:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         name:
 *           type: string
 *         type:
 *           type: string
 *         city:
 *           type: string
 *       required:
 *         - id
 *         - name
 *         - type
 *         - city
 */

/**
 * @swagger
 * paths:
 *   /parkings:
 *     post:
 *       summary: Ajouter un nouveau parking
 *       description: Permet d'ajouter un nouveau parking à la base de données.
 *       tags:
 *       - Parkings
 *       security:
 *         - BearerAuth: []
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 type:
 *                   type: string
 *                 city:
 *                   type: string
 *               required:
 *                 - id
 *                 - name
 *                 - type
 *                 - city
 *       responses:
 *         '200':
 *           description: OK
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Parking'
 *         '500':
 *           description: Erreur interne du serveur
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message: 
 *                     type: string
 */

/**
 * @swagger
 * paths:
 *   /parkings/{id}:
 *     put:
 *       summary: Mettre à jour un parking existant
 *       description: Permet de mettre à jour les informations d'un parking existant.
 *       tags:
 *       - Parkings
 *       security:
 *         - BearerAuth: []
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: integer
 *           description: ID du parking à mettre à jour
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                 type:
 *                   type: string
 *                 city:
 *                   type: string
 *               required:
 *                 - name
 *                 - type
 *                 - city
 *       responses:
 *         '200':
 *           description: OK
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Parking'
 *         '404':
 *           description: Parking non trouvé
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *         '500':
 *           description: Erreur interne du serveur
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *
 *     delete:
 *       summary: Supprimer un parking
 *       description: Permet de supprimer un parking existant.
 *       tags:
 *       - Parkings
 *       security:
 *         - BearerAuth: []
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: integer
 *           description: ID du parking à supprimer
 *       responses:
 *         '200':
 *           description: OK
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Parking'
 *         '404':
 *           description: Parking non trouvé
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *         '500':
 *           description: Erreur interne du serveur
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 */

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Authentification utilisateur et génération de token JWT
 *     description: |
 *       Permet à un utilisateur de s'authentifier en fournissant un identifiant, 
 *       puis génère un token JWT pour l'authentification ultérieure.
 *     tags:
 *       - Authentification
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: Identifiant de l'utilisateur.
 *             required:
 *               - id
 *     responses:
 *       200:
 *         description: Authentification réussie, renvoie un token JWT.
 *         content:
 *           application/json:
 *             example:
 *               token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXJraW5nIjp7ImlkIjoiMTIzNDU2Nzg5MCJ9LCJpYXQiOjE2MzE2MjUzNzYsImV4cCI6MTYzMTYyODk3Nn0.1uDOJ7JYNMhK4rKxe5HcBvbzJ7XjIX8dOMFjBoE9NhM"
 *       404:
 *         description: Utilisateur non trouvé dans la base de données.
 *         content:
 *           application/json:
 *             example:
 *               message: "Utilisateur non trouvé dans la base de données."
 *       500:
 *         description: Erreur interne du serveur.
 *         content:
 *           application/json:
 *             example:
 *               message: "Erreur interne du serveur."
 */