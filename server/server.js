const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const PORT = process.env.PORT || 3000;

const mongoose = require('mongoose');
require('dotenv').config();


console.log(process.env.POSTGRES);

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'DatingApp',
  })
  .then(() => console.log('Connected to Mongo DB'))
  .catch((err) => console.log(err));

const databaseRoutes = require('./routes/databaseRoutes');

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended: true}));

// can use sessionCOntroller.isLoggedIn eventually to check for active session and bypass login with persisted session
app.use(express.static(path.join(__dirname, 'public')));

//register USER
app.use('/database', databaseRoutes);

// servers html file
// app.get('/', (req, res) => {
//   console.log('test')
//   res.sendFile(path.resolve(__dirname, '../src/index.html'));
// });

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  console.log('Error: ', err);
  const errorStatus = err.status || 500;
  return res.status(errorStatus).send(res.locals.message);
});

module.exports = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
