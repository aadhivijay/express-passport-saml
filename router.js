const express = require('express');

const ssoRouter = require('./src/sso/sso.router');

const router = express.Router();

router.get('/', (req, res) => {
  res.send({ success: true });
});

router.get('/login', (req, res) => {
  const { query } = req;
  const { RelayState } = query;
  console.log('LOGIN: RelayState: ', RelayState);

  const decodedStr = Buffer.from(RelayState, 'base64').toString('ascii');
  console.log('decoded: ', decodedStr);

  // validate the session and generate the jwt token

  res.send({ success: true, token: 'test' });
});

router.use('/sso', ssoRouter);

module.exports = router;
