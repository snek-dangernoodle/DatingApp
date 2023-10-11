const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const databaseRoutes = require('./routes/databaseRoutes')
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

//register USER
app.use('/database', databaseRoutes);

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  console.log('Error: ', err);
  const errorStatus = err.status || 500;
  return res.status(errorStatus).send(res.locals.message);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});