const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API REST Web Services Parkings',
      version: '1.0.0',
      description: 'API Tom Schmidt',
    },
    components: {
        securitySchemes: {
          BearerAuth: {
            type: 'apiKey',
            in: 'header',
            name: 'Authorization',
            },
        },
    },
  },
  apis: ['./doc.js'], // Chemin vers le fichier de routes
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;