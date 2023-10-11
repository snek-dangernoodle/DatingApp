const request = require('supertest');
const { Pool } = require('pg');
const server = 'http://localhost:3000';
require('dotenv').config();

/**
 * Read the docs! https://www.npmjs.com/package/supertest
 */
const pool = new Pool({
  connectionString:
    process.env.POSTGRES,
});
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
    describe('SELECT', () => {
      it('successfully connects to the database', async () => {
        const res = await pool.query('SELECT * FROM users;');
        // console.log(res);
        expect(res).not.toEqual(null);
      });
    });
  });
  describe('Post Request', () => {
    describe('/register', () => {
      describe('POST', () => {
        it('responds with the correct username', async () => {
          request(server).post('/register')
          .send({ username: 'Jeremy', password: 'hello' })
          let username = 'Jeremy';
          const user = await pool.query(
            'SELECT * FROM users WHERE username =$1', [username]);
          console.log(user);
          expect(user.rows[0].username).toEqual(username);
        });
      });
    });
  });
  xdescribe('Search functionality', () => {
    describe('/search', () => {
      describe('GET', () => {
        it('searches something but idk what', async () => {
          request(server).get('/search')
          
        })
      })
    })
  })


});






/**
 * describe('Route integration', () => {
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

  describe('/markets', () => {
    describe('GET', () => {
      it('responds with 200 status and application/json content type', () => {
        return request(server)
          .get('/markets')
          .expect('Content-Type', /application\/json/)
          .expect(200);
      });

      // For this test, you'll need to inspect the body of the response and
      // ensure it contains the markets list. Check the markets.dev.json file
      // in the dev database to get an idea of what shape you're expecting.
      it('markets from "DB" json are in body of response', async () => {
        const response = await request(server).get('/markets');
        expect(Array.isArray(response.body)).toBe(true);
      });
    });

    describe('PUT', () => {
      const marketList = [
        { location: 'here', cards: 12 },
        { location: 'there', cards: 13 },
      ];
      it('responds with 200 status and application/json content type', () => {
        return request(server)
          .put('/markets')
          .send(marketList)
          .expect('Content-Type', /application\/json/)
          .expect(200);
      });

      it('responds with the updated market list', async () => {
        const response = await request(server).put('/markets').send(marketList);
        expect(response.body).toEqual(marketList);
      });

      it('responds to invalid request with 400 status and error message in body', async () => {
        const response = await request(server)
          .put('/markets')
          .send({ location: 'here' })
          .expect(400);
        expect(response.body).toMatchObject({ error: {} });
      });
    });
  });
});
 */
