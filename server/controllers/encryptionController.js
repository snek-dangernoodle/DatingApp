const bcrypt = require('bcrypt');
const saltRounds = 10;
const password = 'abc123';

exports.passEncrypt = async (req, res, next) => {
  bcrypt.hash(password, saltRounds, (hash) => {
    console.log(hash);
  });
  return next();
};

exports.decryptPass = async (req, res, next) => {
  bcrypt.compare(password, hash, (err, result) => {
    console.log(result);
  });
};
