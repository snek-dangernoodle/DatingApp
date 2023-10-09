const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');
const e = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

const pool = new Pool({
  connectionString:
    'postgres://wpfxyyjg:Ysiz0SrjbiiYT-YDm9yArEns6x9RXQG3@peanut.db.elephantsql.com/wpfxyyjg',
});

app.get('/', (req, res) => {
  res.send('Welcome to Dating App'); // You can customize this response
});

//register USER
app.post('/register', async (req, res) => {
  const { username, password, personalInterests } = req.body;

  try {
    // Insert the user into the 'users' table
    const newUser = await pool.query(
      'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id',
      [username, password]
    );

    // Extract the newly generated user ID
    const userId = newUser.rows[0].id;

    // Insert user's personal interests into the 'personal_interests' table
    if (Array.isArray(personalInterests)) {
      for (const personalInterest of personalInterests) {
        await pool.query(
          'INSERT INTO personal_interests (user_id, interest) VALUES ($1, $2)',
          [userId, personalInterest]
        );
      }
      res.status(201).json({ message: 'Registration successful' });
    } else {
      res.status(400).json({ error: 'personalInterests should be an array' });
    }
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
});

//LOGIN  --> test if user exists (for now, later check for password)
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the user exists in the database
    const user = await pool.query('SELECT * FROM users WHERE username = $1', [
      username,
    ]);

    if (user.rows.length === 0) {
      return res.status(401).json({ message: 'Authentication failed' });
    } else {
      res.json(user.rows[0]);
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/matches', async (req, res) => {
  res.sendFile(path.resolve(__dirname, '../src/components/Matches.jsx'));
});

// app.get('/interests', async (req, res) => {
//   const interests = await pool.query('SELECT interest FROM personal_interests');
//   console.log(interests.rows);
// });

app.get('/connect', async (req, res) => {
  res.sendFile(path.resolve(__dirname, '../src/SIKE.html'));
});

app.get('/search', async (req, res) => {
  const { preference1, preference2, preference3 } = req.query;
  const interestArr = [preference1, preference2, preference3];

  // create object to store user interests
  const userInterests = {};

  try {
    // Fetch users with each interest -> take it one interest at a time ->
    for (const preference of interestArr) {
      const usersWithInterest = await pool.query(
        //keep same query string we were using before ->
        'SELECT users.username, personal_interests.interest FROM users JOIN personal_interests ON users.id = personal_interests.user_id WHERE personal_interests.interest = $1',
        [preference]
      );

      // Iterate through the users with the current interest
      for (const user of usersWithInterest.rows) {
        //set username to user.username
        const username = user.username;
        //set interest to user.interest
        const interest = user.interest;

        // If the user already exists in userInterests, update their interests
        if (userInterests[username]) {
          userInterests[username].push(' , ' + interest);
        } else {
          // If the user doesn't exist, create  new entry
          userInterests[username] = [interest];
        }
      }
    }

    // Convert userInterests object to an array for response, MAP username and interest
    const output = Object.entries(userInterests).map(
      ([username, interest]) => ({
        username,
        interest,
      })
    ); //output is now an array of objects; where usernam is username and interest is the array of interests

    //RESPONSE
    //no users found check
    if (output.length === 0) {
      return res.status(404).json({ message: 'No users found' });
    } else {
      //if users found, we need to write output to storage.txt
      fs.writeFileSync('./server/public/storage.txt', JSON.stringify(output));
      res.redirect('http://localhost:8080/');
      // res.status(200).send("Hi Hadrian");
    }
  } catch (error) {
    console.error('Error during search:', error);
    res.status(500).json({ error: 'Search failed' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
