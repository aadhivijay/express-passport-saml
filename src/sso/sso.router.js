const router = require('express').Router();

const ssoController = require('./sso.controller');

router.get('/', ssoController.getRedirectUrl);

router.post(
  '/callback',
  ssoController.authenticateCallback,
  ssoController.callback,
);

router.post('/logout', ssoController.logout);

module.exports = router;
