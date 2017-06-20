const fs = require('fs');

module.exports = {
  development: {
    app: {
      name: 'Tableau SAML Forward Proxy example',
      protocol: process.env.PROTOCOL || 'http', // http or https
      sslOptions: {
      //  key: fs.readFileSync('.ssl/yoursslkey.key', 'utf8'),
      //  cert: fs.readFileSync('.ssl/yoursslcert.crt', 'utf8')
      },
      port: process.env.PORT || 3000 // Any available port
    },
    passport: {
      strategy: 'saml',
      saml: {
        path: '/',
        callbackUrl: 'https://example.com/saml_callback', // DYNAMIC FROM ORININAL REQUEST - See routes.js
        entryPoint: process.env.SAML_ENTRY_POINT || 'https://youridp.com/entryPoint', 
	      authnRequestBinding: process.env.SAML_AUTHN_REQUEST_BINDING || 'HTTP-Redirect', // Change to HTTP-POST if required
        issuer: 'https://saml_sp_entityid', // DYNAMIC FROM ORININAL REQUEST - See routes.js
        //skipRequestCompression: true, // Optional depending on IdP
        //acceptedClockSkewMs: -1, // Optional depending on IdP
        //disableRequestedAuthnContext: true, //Optional depending on IdP
        //privateCert: process.env.SAML_PRIVATE_CERT || fs.readFileSync('./tableau_ami_sp.key', 'utf-8'), //Uncomment if Request Signing is required.
        //cert: process.env.SAML_CERT || fs.readFileSync('./okta.cert', 'utf-8') // Not needed because we are not processing AuthnResponse
      }
    }
  }
};
