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

    // api for google maps
    api_key_google: null,
    map_box_token: '',

    // server url
    server_url: function () {
      return (_WBConfig.dev) ? 'http://your-dev-domain/api/v1/' : 'http://your-prod-domain/api/v1/';
    },

    // socket IO
    socket_uri: function () {
      return (_WBConfig.dev) ? 'http://your-dev-domain/' : 'http://your-prod-domain:3000/';
    },

    // Fire-base Cloud Messaging
    enableFCM: false,

    // GPS
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
