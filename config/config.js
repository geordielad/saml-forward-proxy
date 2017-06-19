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
        path: '/',
        callbackUrl: 'https://example.com/saml_callback', // DYNAMIC FROM ORININAL REQUEST - See routes.js
        entryPoint: process.env.SAML_ENTRY_POINT || 'https://dev-221604.oktapreview.com/app/tableausoftwaredev221604_tableau_1/exk61mg6poMGQ8Fnk0h7/sso/saml', 
	      authnRequestBinding: process.env.SAML_AUTHN_REQUEST_BINDING || 'HTTP-Redirect', // Change to HTTP-POST if required
        issuer: 'https://saml_sp_entityid', // DYNAMIC FROM ORININAL REQUEST - See routes.js
        //privateCert: process.env.SAML_PRIVATE_CERT || fs.readFileSync('./tableau_ami_sp.key', 'utf-8'),
        //skipRequestCompression: true, // Optional depending on IdP
        //acceptedClockSkewMs: -1, // Optional depending on IdP
        //disableRequestedAuthnContext: true, //Optional depending on IdP
        //privateCert: process.env.SAML_PRIVATE_CERT || fs.readFileSync('./tableau_ami_sp.key', 'utf-8'), //Uncomment if Request Signing is required.
        //cert: process.env.SAML_CERT || fs.readFileSync('./okta.cert', 'utf-8') // Not needed becuase we are not processing AuthnResponse
      }
    }
  }
};
