const express = require('express');

const ssoRouter = require('./src/sso/sso.router');

const router = express.Router();

router.get('/', (req, res) => {
  res.send({ success: true });
});

router.get('/login', (req, res) => {
  res.send({ success: true, path: '/login' });
});

router.use('/sso', ssoRouter);

module.exports = router;
