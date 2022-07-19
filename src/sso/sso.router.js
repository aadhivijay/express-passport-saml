const router = require('express').Router();

const ssoController = require('./sso.controller');

router.get('/', ssoController.getRedirectUrl);

router.get('/callback', ssoController.callback);
router.post('/callback', ssoController.callback);

router.post('/logout', ssoController.logout);

module.exports = router;
