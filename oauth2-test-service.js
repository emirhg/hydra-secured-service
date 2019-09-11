/**
* @name Oauth2-test
* @summary Oauth2-test Hydra Express service entry point
* @description tests oauth
*/
'use strict';

const version = require('./package.json').version;
const hydraExpress = require('hydra-express');

const jwtAuth = require('fwsp-jwt-auth');

let config = require('fwsp-config');

/**
* Load configuration file and initialize hydraExpress app
*/
config.init('./config/config.json')
  .then(() => {
    config.version = version;
    return jwtAuth.loadCerts(null, config.jwtPublicCert);
  })
  .then(status => {
    console.log(status);
    return hydraExpress.init(config.getObject(), version, () => {
      hydraExpress.registerRoutes({
        '/api/oauth2-test': require('./routes/oauth2-test-v1-routes')
      });
    });
  })
  .then(serviceInfo => console.log('serviceInfo', serviceInfo))
  .catch(err => console.log('err', err));
