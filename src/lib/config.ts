/**
 * @description Configurations
 * @file config.ts
 *
 * @author Archie Disono
 * @url https://github.com/disono/Ionic-Framework-Template
 * @license Apache 2.0
 */

let _WBConfig = (function () {
  return {
    // is development mode
    dev: true,

    // platform type default is browser mode
    is_browser: true,

    api_key_google: null,

    server_url: function () {
      return (_WBConfig.dev) ? 'http://your-dev-domain/api/v1/' : 'http://your-prod-domain/api/v1/';
    },

    socket_uri: function () {
      return (_WBConfig.dev) ? 'http://your-dev-domain/' : 'http://your-prod-domain:3000/';
    },

    enableFCM: false,

    lat: 0,
    lng: 0,
    GPSWatchID: null,

    // reset the config
    reset: function () {
      _WBConfig.lat = 0;
      _WBConfig.lng = 0;
      _WBConfig.GPSWatchID = null;
    }
  };
}());

export let WBConfig = _WBConfig;
