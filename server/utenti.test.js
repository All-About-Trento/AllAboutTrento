const request = require('supertest');
const jwt     = require('jsonwebtoken');
const app     = require('./server');

describe('GET utentis/me', () => {
    let userSpy;
  
  beforeAll( () => {
    const User = require('./models/utenti');
    userSpy = jest.spyOn(User, 'findOne').mockImplementation((criterias) => {
        return {
          id: "6399a501490ca809bc4879f9",
          email: 'manuel.vettori@studenti.unitn.it'
        };
      });
    });
    
    afterAll(async () => {
      userSpy.mockRestore();
    });
    
    test('GET utentis/me with no token should return 401', async () => {
      const response = await request(app).get('/utentis/me');
      expect(response.statusCode).toBe(401);
    });
    test('GET /utentis/me?token=<invalid> should return 401', async () => {
      const response = await request(app).get('/utentis/me/123456');
      expect(response.statusCode).toBe(401);
    });


    var payload = {
      email: 'manuel.vettori@studenti.unitn.it',
      id : "12345"
    }
    var options = {
      expiresIn: 86400 // expires in 24 hours
    }
    var token = jwt.sign(payload,"AllAboutTrento", options);

    test('GET /utentis/me?token=<valid> should return 200', async () => {
      expect.assertions(1);
      const response = await request(app).get('/utentis/me/'+token);
      expect(response.statusCode).toBe(401);
    });

  });