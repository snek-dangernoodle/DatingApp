const { Pool } = require('pg');
require('dotenv').config();


const pool = new Pool({
  connectionString:
    process.env.POSTGRES,
});
//User middleware

exports.registerUser = async (req, res, next) => {
  console.log('in registerUser');
  const { username, password } = req.body;
  try {
    await pool.query(
      'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING user_id',
      [username, password]
    );
    return next();
  } catch (error) {
    return next({
      log: 'Express error handler caught middleware error in userController.registerUser',
      status: 500,
      message: { err: 'Error! Username is already taken!' },
    });
  }
};

exports.loginUser = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    // Check if the user exists in the database
    const user = await pool.query('SELECT * FROM users WHERE username = $1', [
      username,
    ]);

    if (user.rows.length === 0) {
      return next({
        log: 'User authentication failed due to incorrect input',
        status: 400,
        message: {err: 'Username or Password is incorrect'}
      })
    } else {
      res.json(user.rows[0]);
    }
  } catch (error) {
    return next({
      log: 'Express error handler caught middleware error in userController.loginUser',
      status: 500,
      message: {err: 'Internal server error'}
    });
  }
};

// //     if (Array.isArray(personalInterests)) {
//   for (const personalInterest of personalInterests) {
//     await pool.query(
//       'INSERT INTO personal_interests (user_id, interest) VALUES ($1, $2)',
//       [userId, personalInterest]
//     );
//   }
