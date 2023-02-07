const request = require('supertest');
const app     = require('./server');

describe('GET /pois', () => {
  let bookSpy;
  let bookSpyFindById;

  beforeAll( () => {
    const Poi = require('./models/poi');
    bookSpy = jest.spyOn(Poi, 'find').mockImplementation((criterias) => {
      return [{
        id: "6394ad8a19897b010dabcd67",
        nome: "Duomo di Trento"
      },{
        id: "6394b0e319897b010dabcd6e",
        nome: "Muse"
      }];
    });
    bookSpyFindById = jest.spyOn(Poi, 'findById').mockImplementation((id) => {
      if (id=="6394ad8a19897b010dabcd67")
        return {
          id: "6394ad8a19897b010dabcd67",
          nome: "Duomo di Trento"
        };
      else
        return {};
    });
  });

  afterAll(async () => {
    bookSpy.mockRestore();
    bookSpyFindById.mockRestore();
  });
  
  test('GET /pois should respond with an array of pois', async () => {
    return request(app)
      .get('/pois')
      .expect('Content-Type', /json/)
      .expect(200)
      .then( (res) => {
        if(res.body && res.body[0]) {
          expect(res.body[0]).toEqual({
            self: 'pois/6394ad8a19897b010dabcd67',
            nome : "Duomo di Trento"
          });
        }
      });
  });

  
  test('GET /pois:id should respond with json', async () => {
    return request(app)
      .get('/pois/6394ad8a19897b010dabcd67')
      .expect('Content-Type', /json/)
      .expect(200, {
          id: '6394ad8a19897b010dabcd67',
          nome: "Duomo di Trento"
        });
  });

});