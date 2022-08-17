const passport = require('passport');
const SamlStrategy = require('passport-saml').Strategy;

const idp = {
  callback_url: process.env.SSO_CALLBACK_URL,
  idp_url: process.env.IDP_URL,
  idp_cert: process.env.IDP_CERT,
};
const session = {
  id: '1',
  uid: 'u001',
  code: 'Auth0',
};

async function login(req, res, next) {
  // create a session
  const encodedStr = Buffer.from(
    JSON.stringify({
      sid: session.id,
      uid: session.uid,
      code: session.code,
    }),
  ).toString('base64');

  const strategy = new SamlStrategy(
    {
      callbackUrl: `${idp.callback_url}`,
      entryPoint: idp.idp_url,
      cert: idp.idp_cert,
      additionalParams: {
        RelayState: encodedStr,
      },
    },
    (profile, done) => done(null, profile)
  );
  passport.use(strategy);

  passport.authenticate(strategy)(req, res, next);
}

module.exports = { login };
