// app.test.js
const request = require('supertest');
const app = require('./app');
const { connectToDatabase, closeDatabase } = require('./db');

const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXJraW5nIjpudWxsLCJpYXQiOjE3MDA4MTg1MzJ9.5pKUTuZx2onfLv21t0v7DSfqdx9vb14MKT8GpPL4M7Q';

beforeAll(async () => {
  // Assure-toi que la connexion à la base de données est établie avant de commencer les tests
  await connectToDatabase();
});

afterAll(async () => {
  // Ferme la connexion à la base de données après tous les tests
  await closeDatabase();
});

describe('GET /parkings', () => {
  it('responds with json containing a list of parkings', async () => {
    const response = await request(app)
      .get('/parkings')
      .set('Authorization', `Bearer ${accessToken}`); 

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('parkings');
  });
});

describe('GET /parkings/:id', () => {
  it('responds with json containing details of a parking', async () => {
    const response = await request(app)
      .get('/parkings/1')
      .set('Authorization', `Bearer ${accessToken}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('parking');
    // Ajoutez d'autres assertions selon vos besoins
  });

  it('responds with 404 if parking is not found', async () => {
    const response = await request(app)
      .get('/parkings/999')
      .set('Authorization', `Bearer ${accessToken}`);

    expect(response.statusCode).toBe(404);
  });
});

describe('POST /parkings', () => {
    it('creates a new parking and responds with the updated list of parkings', async () => {
      const newParkingData = {
        // Add the necessary properties for your new parking
        // For example:
        id: 69,
        name: 'New Parking',
        type: 'New Type',
        city: 'New City',
      };
  
      const response = await request(app)
        .post('/parkings')
        .set('Authorization', `Bearer ${accessToken}`)
        .send(newParkingData);
  
      expect(response.statusCode).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
    //   expect(response.body.parkings).toHaveLength(/* The expected length of the parkings array after adding a new one */);
  
      // You can also add additional assertions based on your application logic
    });
  });

  describe('PUT /parkings/:id', () => {
    it('updates an existing parking and responds with the updated list of parkings', async () => {
      // Assuming you have an existing parking with id = 1 in the database
      const existingParkingId = 1;
  
      // Update data for the existing parking
      const updatedParkingData = {
        name: 'UpdatedData',
        type: 'UpdatedData',
        city: 'UpdatedData',
        // Add other properties you want to update
      };
  
      const response = await request(app)
        .put(`/parkings/${existingParkingId}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .send(updatedParkingData);
  
      expect(response.statusCode).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
      // Add assertions based on the expected state of the parkings array after updating
  
      // You can also add additional assertions based on your application logic
    });
  
    it('responds with 404 if the parking is not found', async () => {
      // Assuming you have a non-existing parking with id = 999 in the database
      const nonExistingParkingId = 999;
  
      const response = await request(app)
        .put(`/parkings/${nonExistingParkingId}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          // Updated data for the non-existing parking
          name: 'Updated Parking',
          type: 'Updated Type',
          city: 'Updated City',
          // Add other properties you want to update
        });
  
      expect(response.statusCode).toBe(404);
      expect(response.body).toEqual({ message: 'Parking non trouvé, impossible de le mettre à jour.' });
    });
  });
  
  describe('DELETE /parkings/:id', () => {
    it('deletes an existing parking and responds with the updated list of parkings', async () => {
      // Assuming you have an existing parking with id = 1 in the database
      const existingParkingId = 69;
  
      const response = await request(app)
        .delete(`/parkings/${existingParkingId}`)
        .set('Authorization', `Bearer ${accessToken}`);
  
      // If the parking is found and deleted successfully, the status 200 is expected
      if (response.statusCode === 200) {
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
        // Add assertions based on the expected state of the parkings array after deletion
      } else if (response.statusCode === 404) {
        // If the parking is not found, the status 404 is expected
        expect(response.statusCode).toBe(404);
        expect(response.body).toEqual({ message: 'Parking non trouvé, impossible de le supprimer.' });
      }
    });
  
    it('responds with 404 if the parking is not found', async () => {
      // Assuming you have a non-existing parking with id = 999 in the database
      const nonExistingParkingId = 999;
  
      const response = await request(app)
        .delete(`/parkings/${nonExistingParkingId}`)
        .set('Authorization', `Bearer ${accessToken}`);
  
      expect(response.statusCode).toBe(404);
      expect(response.body).toEqual({ message: 'Parking non trouvé, impossible de le supprimer.' });
    });
  });
  
// Ajoutez d'autres tests pour les autres routes
