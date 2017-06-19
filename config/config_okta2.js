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
        entryPoint: process.env.SAML_ENTRY_POINT || 'https://dev-221604.oktapreview.com/app/tableausoftwaredev221604_tableau_1/exk61mg6poMGQ8Fnk0h7/sso/saml', 
	      authnRequestBinding: 'HTTP-Redirect',
        issuer: 'https://tableau10.tableau.rocks',
        //privateCert: process.env.SAML_PRIVATE_CERT || fs.readFileSync('./tableau_ami_sp.key', 'utf-8'),
        skipRequestCompression: true,
        acceptedClockSkewMs: -1,
        disableRequestedAuthnContext: true,
        cert: process.env.SAML_CERT || fs.readFileSync('./okta.cert', 'utf-8')
      }
    }
  }
};
