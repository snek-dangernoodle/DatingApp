const Session = require('../models/sessionModel');

const sessionController = {};

sessionController.isLoggedIn = async (req, res, next) => {
  // cookie in req.cookie
  const cookie = req.cookie;
  try {
    const response = await Session.find({ cookieId: `${cookie}` });
    if (response) {
      res.locals.signedIn = true;
      return next();
    } else {
      res.redirect(200, '/');
    }
  } catch (error) {
    return next({
      log: `Express error handler caught middleware error in sessionController.isLoggedIn. Error: ${error}`,
      status: 500,
      message: { err: 'Bad request: failed to start session' },
    });
  }
};

sessionController.startSession = async (req, res, next) => {
  const id = res.locals.user;
  if (!res.locals.signedIn) {
    try {
      const session = await new Session({
        cookieId: `${id}`,
      });
      session.save();
      return next();
    } catch (error) {
      return next({
        log: `Express error handler caught middleware error in sessionController.startSession. Error: ${error}`,
        status: 500,
        message: { err: 'Bad request: failed to start session' },
      });
    }
  } else return next();
};

module.exports = sessionController;
