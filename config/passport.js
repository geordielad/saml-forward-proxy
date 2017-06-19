const SamlStrategy = require('passport-saml').Strategy;

module.exports = function (passport, config) {

  passport.serializeUser(function (user, done) {
    done(null, user);
  });

  passport.deserializeUser(function (user, done) {
    done(null, user);
  });

  passport.use(new SamlStrategy(
    {
      path: config.passport.saml.path,
      callbackUrl: config.passport.saml.callbackUrl,
      entryPoint: config.passport.saml.entryPoint,
      authnRequestBinding: config.passport.saml.authnRequestBinding,
      issuer: config.passport.saml.issuer,
      skipRequestCompression: config.passport.saml.skipRequestCompression,
      acceptedClockSkewMs: config.passport.saml.acceptedClockSkewMs,
      disableRequestedAuthnContext: config.passport.saml.disableRequestedAuthnContext,
      privateCert: config.passport.saml.privateCert,
      cert: config.passport.saml.cert
    },
    function (profile, done) {
      return done(null,
        {
          id: profile.uid,
          email: profile.email,
          displayName: profile.cn,
          firstName: profile.givenName,
          lastName: profile.sn
        });
    })
  );

};
