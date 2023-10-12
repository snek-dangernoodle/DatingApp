const Session = require('../models/sessionModel');

const sessionController = {};

sessionController.isLoggedIn = async (req, res, next) => {
  // cookie in req.cookie
  const cookie = req.cookies.user;
  console.log('sessioncontroller is logged in');
  try {
    const response = await Session.find({ cookieId: `${cookie}` });
    if (response.length) {
      res.locals.signedIn = true;
      return next();
    } else {
      res.status(400);
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
  const signedIn = await Session.find({ cookieId: `${id}` });
  if (signedIn.length === 0) {
    console.log('no res locals signedIn');
    try {
      const session = await new Session({
        cookieId: `${id}`,
      });
      session.save();
      console.log('session is saved');
      res.cookie('user', `${id}`);

      return next();
    } catch (error) {
      return next({
        log: `Express error handler caught middleware error in sessionController.startSession. Error: ${error}`,
        status: 500,
        message: { err: 'Bad request: failed to start session' },
      });
    }
  } else {
    const cookie = req.cookies.user;
    if (cookie) return next();
    else res.cookie('user', `${id}`);
    return next();
  }
    
};

module.exports = sessionController;
