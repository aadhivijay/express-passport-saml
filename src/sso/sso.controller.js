const ssoManager = require('./services/sso.manager');

async function getRedirectUrl(req, res, next) {
  console.log('Test: ');
  // res.redirect('https://dev-j6i4odf4.us.auth0.com');
  ssoManager.login(req, res, next);
}

async function callback(req, res, next) {
  try {
    const { body, params, query } = req;
    console.log('CALLBACK: params: ', params);
    console.log('CALLBACK: query: ', query);
    console.log('CALLBACK: BODY: ', body);
    ssoManager.callback(req, res, next);
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

module.exports = { getRedirectUrl, callback, logout };
