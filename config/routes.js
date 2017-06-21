module.exports = function (app, config, passport, util, samlEncodeDecode, xml2js, xpath) {

/*
  app.get('/', function (req, res) {
    if (req.isAuthenticated()) {
      res.render('home',
        {
          user: req.user
        });
    } else {
      res.render('home',
        {
          user: null
        });
    }
  });
*/

  app.post('/saml_proxy', function(req, res, next) {

    var AssertionConsumerServiceURL;
    var issuer;

    samlEncodeDecode.decodeSamlPost(req.body.SAMLRequest, function(err, xml) {
      if (!err) {
        console.log("POST decoded XML", xml);
        xml2js.parseString(xml, function(err, json) {
          // find all elements: returns xml2js JSON of the element
          var matches = xpath.find(json, "//saml2p:AuthnRequest");
          console.log("AuthnRequest",matches);
          console.log("Issuer from Element",matches[0]['saml2:Issuer'][0]._);

          // find the first element, and get its id:
          AssertionConsumerServiceURL = xpath.evalFirst(json, "//saml2p:AuthnRequest", "AssertionConsumerServiceURL");
          console.log("ACS URL",AssertionConsumerServiceURL);

          var matches = xpath.evalFirst(json, "//saml2p:AuthnRequest/saml2:Issuer");
          issuer = matches._;

          console.log("Issuer",issuer);

        });
      }
    });

    delete req.body.SAMLRequest;
    passport.authenticate(config.passport.strategy,
      {
        failureRedirect: '/loginFail',
        callbackUrl: AssertionConsumerServiceURL,
        issuer: issuer
      })(req, res, next); // <- just remember to add these
  });

};
