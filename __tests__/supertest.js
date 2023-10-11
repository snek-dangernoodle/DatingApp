const request = require('supertest');
const server = 'http://localhost:3000';

/**
 * Read the docs! https://www.npmjs.com/package/supertest
 */

describe('Route integration', () => {
  describe('/', () => {
    describe('GET', () => {
      // Note that we return the evaluation of `request` here! It evaluates to
      // a promise, so Jest knows not to say this test passes until that
      // promise resolves. See https://jestjs.io/docs/en/asynchronous
      it('responds with 200 status and text/html content type', () => {
        return request(server)
          .get('/')
          .expect('Content-Type', /text\/html/)
          .expect(200);
      });
    });
  });
  describe('Connection to Database', () => {
    describe('SQL', () => {
      it('successfully connects to the sql database', async () => {
        return request(server).get('/database').expect(200);
      });
    });
    describe('MongoDB', () => {
      it('successfully connects to the MongoDB database', async () => {
        return request(server)
          .get('/verifySession')
          .expect(400);
      });
    });
  });
  describe('Post Request', () => {
    describe('/register', () => {
      describe('POST', () => {
        it('responds with the correct username', async () => {
          request(server)
            .post('/database/register')
            .send({ username: 'Jeremy', password: 'hello' });
          expect(user.rows[0].username).toEqual('Jeremy');
        });
      });
    });
  });
  xdescribe('Search functionality', () => {
    describe('/search', () => {
      describe('GET', () => {
        xit('searches something but idk what', async () => {
          request(server).get('/search');
        });
      });
    });
  });
});
