const passport = require('passport');
const SamlStrategy = require('passport-saml').Strategy;
const Auth0Strategy = require('passport-auth0');

const idp = {
  callback_url: 'https://node-p2dzbs--3000.local.webcontainer.io/sso/callback',
  idp_url:
    'https://dev-j6i4odf4.us.auth0.com/samlp/pjc1MqepfMvMDnTUEw2VvCKdUParZiOw',
  idp_cert:
    'MIIDDTCCAfWgAwIBAgIJV28jATJeu3MoMA0GCSqGSIb3DQEBCwUAMCQxIjAgBgNVBAMTGWRldi1qNmk0b2RmNC51cy5hdXRoMC5jb20wHhcNMjIwNzE3MDYwMTI0WhcNMzYwMzI1MDYwMTI0WjAkMSIwIAYDVQQDExlkZXYtajZpNG9kZjQudXMuYXV0aDAuY29tMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1g9dHR+iKJmq7P7hbGNZw61VeybmLZMSThhmjfloq1NFZLJojnWHRwsf82tSr5kiY3XlBvM63C2Kv5a5xF7bOuVMmHsyF0rQ1l0Pw+iyrdv9LtmYL/hI/cMG5KxgWgPZxzFRUFx4rSai5Uz/UcmHd/Ct3EIEzdg1cEG7LiCM5uvlU7xqgwuX2YcSGof9n0OLMhaIWFIzc170t1Z6FtqVPzSOal459txAHRKLM2PmGQgVGhsPick16LxFWf7+/Rxd5SdxfCirtWnzLEM5lA46maVmI3B4+h3BoXzYuXtYC6hxNalQthJySRJAfCUoZ/ACNgeeJkNUm+Es6iZAhSi6AwIDAQABo0IwQDAPBgNVHRMBAf8EBTADAQH/MB0GA1UdDgQWBBQzNZTaLE125f5DuT2yzGg8y6YgzDAOBgNVHQ8BAf8EBAMCAoQwDQYJKoZIhvcNAQELBQADggEBAFde+GnUcdgOr5u8Lo3q6MBXpN13V57Eg62K+F2JXjhdovqGTk5XrFLqhUlM2cTGb1wnYagXwbQ7EGfRBmBbW7Jy7N23AotZfPKpcBtEkaPouaA/OMmk2ZI3aIgZYDZYyf4U98cYyMAU/fmpFQR2DEw0qMU5m7CBSkiGlJEtT38w0eg2q34iGzlWMrGsXL5OB1lSOFyLI2rKEK5PVXdq71bM2GmtIO33gnwxrn2JmJ3ad/l5QpJd+tCNDp32aTxP871ruiuPKNWCnqntigvBbyhoKBwAKqCifSYbgM6p0W5NunepOBO0hWXhSCxHVcVBleESsFfcRfxHRg+/FPaWY1I=',
};
const session = {
  id: '1',
  uid: 'u001',
  code: 'saml',
};

async function login(req, res, next) {
  // const strategy = new Auth0Strategy(
  //   {
  //     domain: 'dev-j6i4odf4.us.auth0.com',
  //     clientID: 'pjc1MqepfMvMDnTUEw2VvCKdUParZiOw',
  //     clientSecret:
  //       '6W1PwCB3iq6l2y-Th9Xl1J1hM0tJhqd7m513JxeU-oL39ijhyEG7ZnLJ2sSLvB5S',
  //     callbackURL:
  //       'https://node-p2dzbs--3000.local.webcontainer.io/sso/callback',
  //     state: false,
  //   },
  //   (accessToken, refreshToken, extraParams, profile, done) =>
  //     done(null, profile)
  // );

  const strategy = new SamlStrategy(
    {
      callbackUrl: `${idp.callback_url}`,
      entryPoint: idp.idp_url,
      cert: idp.idp_cert,
      additionalParams: {
        RelayState: JSON.stringify({
          sid: session.id,
          uid: session.uid,
          code: session.code,
        }),
      },
    },
    (profile, done) => done(null, profile)
  );
  passport.use(strategy);

  passport.authenticate(strategy)(req, res, next);
}

async function callback(req, res, next) {
  const strategy = new SamlStrategy(
    {
      callbackUrl: `${idp.callback_url}`,
      entryPoint: idp.idp_url,
      cert: idp.idp_cert,
      additionalParams: {
        RelayState: JSON.stringify({
          sid: session.id,
          uid: session.uid,
          code: session.code,
        }),
      },
    },
    (profile, done) => done(null, profile)
  );
  passport.use(strategy);

  passport.authenticate('saml', async (error, info) => {
    if (error) {
      console.error('[sso.manager] Error: ', error);
      return res.status(500).send({ error: true, path: req.path });
    }

    console.log('INFO: ', info);
    res.redirect('/');
  })(req, res);
}

module.exports = { login, callback };
