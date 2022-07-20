const ssoManager = require('./services/sso.manager');
const passport = require('passport');

async function getRedirectUrl(req, res, next) {
  console.log('Test: ');
  ssoManager.login(req, res, next);
}

async function authenticateCallback(req, res, next) {
  passport.authenticate('saml', async (error, info) => {
    if (error) {
      console.error('[sso.manager] Error: ', error);
      return res.status(500).send({ error: true, path: req.path });
    }

    console.log('INFO: ', info);
    req.ssoInfo = info;

    next();
  })(req, res, next);
}

async function callback(req, res, next) {
  try {
    const { body, params, query, ssoInfo } = req;
    console.log('CALLBACK: params: ', params);
    console.log('CALLBACK: query: ', query);
    console.log('CALLBACK: BODY: ', body);
    console.log('CALLBACK: ssoInfo: ', ssoInfo);
    res.redirect('/');
  } catch (error) {
    console.error('[ss-controller] Error: ', error);
    res.status(500).send({ error: true, msg: error });
  }
}

async function logout(req, res, next) {
  try {
    const { body } = req;
    console.log('LOGOUT: ', body);
  } catch (error) {
    console.error('[ss-controller] Error: ', error);
    res.status(500).send({ error: true, msg: error });
  }
}

module.exports = { getRedirectUrl, authenticateCallback, callback, logout };
