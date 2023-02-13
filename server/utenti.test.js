const request = require('supertest');
const jwt     = require('jsonwebtoken');
const app     = require('./server');

/*describe('Testing Login', () => {
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
    var token = jwt.sign(payload, "AllAboutTrento", options);

    test('GET /utentis/me?token=<valid> should return 200', async () => {
      expect.assertions(1);
      const response = await request(app).get('/utentis/me/'+token);
      expect(response.statusCode).toBe(401);
    });

  });

 describe('Testing Registrazione', function() {
    it('should respond with 201', function(done) {
      request(app)
        .post('/utentis')
        .send({nome:"Manuel",cognome:"Vettori",email:"manu.vettori@live.it",numTelefono:"12345",password:"12345",ruolo:"utente"})
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201)
        .end(function(err, res) {
          if (err) return done(err);
          return done();
        });
    });
  });

  describe('Testing Cambio Password', function() {
    it('should respond with 201', function(done) {
      request(app)
        .put('/utentis/63e374453fb7a44d700ef04a')
        .send({oPassword:"12345" , nPassword:"123"})
        .expect(201)
        .end(function(err, res) {
          done();
        });
    });
  });
  */

  describe('Testing Ruolo Utente', function() {
    it('should respond with "utente" ', function(done) {
      const response = request(app).get('/utentis/63e374453fb7a44d700ef04a')      
      expect(response.body.ruolo).toEqual('utente');
    });
  });

