const bcrypt = require('bcrypt');

exports.passEncrypt = async (req, res, next) => {
  try {
    const password = req.body.password;
    const salt = await bcrypt.genSalt(12);
    console.log('this is the salt', salt);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log('this is the hashed password', hashedPassword);
    res.locals.pass = hashedPassword;
    return next();
  } catch (err) {
    return next({
      log: 'Error occured in encrytpion controller.passEncrypt',
      status: 500,
      message: { err: 'Unable to verify username and password' },
    });
  }
};

exports.decryptPass = async (req, res, next) => {
  try {
    const password = res.locals.plainPass;
    const hash = res.locals.hashPass;
    const match = await bcrypt.compare(password, hash);
    if (match) {
      return next();
    } else
      return next({
        log: 'User authentication failed due to incorrect input',
        status: 400,
        message: { err: 'Username or Password is incorrect' },
      });
  } catch (error) {
    return next({
      log: `Express error handler caught middleware error in encryptionController.decryptPass: ${error}`,
      status: 500,
      message: { err: 'Internal server error' },
    });
  }
};
