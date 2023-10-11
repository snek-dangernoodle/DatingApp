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
    describe('SQL', () => {
      it('successfully connects to the sql database', async () => {
        const res = await pool.query('SELECT * FROM users;');
        // console.log(res);
        expect(res).not.toEqual(null);
      });
    });
    describe('MongoDB', () => {
      it('successfully connects to the MongoDB database', async () => {
        
      })
    })
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
        xit('searches something but idk what', async () => {
          request(server).get('/search')
          
        })
      })
    })
  })


});



