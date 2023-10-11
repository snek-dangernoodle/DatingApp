const { Pool } = require('pg');
require('dotenv').config();
const pool = new Pool({
  connectionString: process.env.POSTGRES,
});

//User middleware

exports.registerUser = async (req, res, next) => {
  console.log('in registerUser');

  const { username } = req.body;
  const password = res.locals.pass;
  try {
    const id = await pool.query(
      'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING _id',
      [username, password]
    );
    res.locals.user = id.rows[0]._id;
    console.log(res.locals.user);
    return next();
  } catch (error) {
    console.log(error);
    return next({
      log: 'Express error handler caught middleware error in userController.registerUser',
      status: 500,
      message: { err: 'Error! Username is already taken!' },
    });
  }
};

exports.loginUser = async (req, res, next) => {
  const { username, password } = req.body;
  res.locals.plainPass = password;
  try {
    // Check if the user exists in the database
    const user = await pool.query('SELECT * FROM users WHERE username = $1', [
      username,
    ]);

    if (user.rows.length === 0) {
      return next({
        log: 'User authentication failed due to incorrect input',
        status: 400,
        message: { err: 'Username or Password is incorrect' },
      });
    } else {
      res.locals.hashPass = user.rows[0].password;
      res.locals.user = user.rows[0].id;
      return next();
    }
  } catch (error) {
    console.log(error);
    return next({
      log: 'Express error handler caught middleware error in userController.loginUser',
      status: 500,
      message: { err: 'Internal server error' },
    });
  }
};


/** _id | interest
 *    1 | climbing
 *    2 | cards
 *    3 | coding
 * 
 * 
 */

// QUERY SELECT * FROM interests
// tell frontend to set key value pairs with interest_id = key, interest = value

// backend recieves object
exports.updateInterests = async (req, res, next) => {
  const { _id, personalInterestObject } = req.body;
  const interestArr = Object.keys(personalInterestObject)
// {_id: 4, personalInterestObject: {2: a, 3: b, 1: swimming}}
  // query SELECT * FROM 
  try {
    await pool.query(
      'UPDATE users SET interest1 = $1, interest2 = $2, interest = $3 WHERE _id = $4' ,
      [interestArr, _id]
    );
    return next();
  } catch (error) {
    return next({
      log: 'Express error handler caught middleware error in userController.updateInterests',
      status: 400,
      message: { err: 'Error! Please select 3 interests' },
    });
  } 
};

exports.searchUsers = async (req, res, next) => {
  console.log('searching...');
  const matches = await pool.query('SELECT username,interest1, interest2, interest3 FROM users WHERE interest1 IN ($1, $2, $3) or interest2 IN ($1, $2, $3) or interest3 IN ($1, $2, $3);', [interestArr])
  res.locals.matches = matches.rows
  return next();
};
