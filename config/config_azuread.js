const fs = require('fs');

module.exports = {
  development: {
    app: {
      name: 'Passport SAML strategy example',
      port: process.env.PORT || 8443
    },
    passport: {
      strategy: 'saml',
      saml: {
        path: process.env.SAML_PATH || '/',
        callbackUrl: 'https://tableau10.tableau.rocks/wg/saml/SSO/index.html',
        entryPoint: process.env.SAML_ENTRY_POINT || 'https://login.microsoftonline.com/3ace9196-a14f-45fd-88b3-ee37b1d11451/saml2', 
	authnRequestBinding: 'HTTP-Redirect',
        issuer: 'https://tableau10.tableau.rocks',
        privateCert: process.env.SAML_PRIVATE_CERT || fs.readFileSync('./tableau_ami_sp.key', 'utf-8'),
        skipRequestCompression: true,
        acceptedClockSkewMs: -1,
        disableRequestedAuthnContext: true,
        cert: process.env.SAML_CERT || fs.readFileSync('./okta.cert', 'utf-8')
      }
    }
  }
};
