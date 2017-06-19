# SAML Forward Proxy Example for Tableau
=======================

Description
-----------

An example to demonstrate the use of the [Passport-SAML](https://github.com/bergie/passport-saml) Authentication provider as a SAML Proxy for a Tableau Server configured as a SAML Service Provider (SP).
Tableau supports the HTTP-Post binding for SAML Requests and will always sign the requests. Some IdPs cannot be configured to support HTTP-POST but instead only support HTTP-Redirect. Also the IdP may not require a signed request. Usually signing the request in Tableau does not alter the ability of the IdP to process the request but sometimes it is beneficial to reduce the size of the request so that intermediate servers can store the request in a cookie.

This proxy runs as a web server on a port defined in config.js and will work with HTTP or HTTPS.

Usage
-----

```bash
$ npm install saml-forward-proxy
$ npm start
```

Examples
--------

## Run the proxy on localhost with http on port 3000. Use HTTP-Redirect to the original IdP and do not sign the request.

1. Ensure that your IpP is working as expected.
2. Get a copy of the IpPs metadata. Note the HTTP-POST endpoint of the SingleSignOnService and change the Location attribute to http://localhost:3000
3. Note your Tableau SP Entity ID and update the SAML config/config.js to use the modified metadata.
3. On the SAML Forward Proxy host edit the config.js to use the callbackUrl for the HTTP-Redirect originally provided in the IdP Metadata. Update the Issuer with your Tableau Entity.
4. Comment out the privateCert attribute. This will ensure that the Request is not signed.
5. Start the proxy if necessary. npm start.


Authors
-------

| [!["Robin Cottiss"](http://gravatar.com/avatar/b7ccc70dfdbfc700d88c1ca246fa4946.png?s=60)](http://tableau.com "Robin Cottiss <rcottiss@tableau.com>") |
|---|
| [@geordielad](https://twitter.com/geordielad) |


License
-------

Licensed under the MIT license


Note
----

Based on [PassportJS SAML Example ](https://github.com/gbraad/passport-saml-example) by [Gerard Braad](https://github.com/gbraad)
