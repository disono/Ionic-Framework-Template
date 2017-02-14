"use strict";
var helper_1 = require("./helper");
/**
 * @description Configurations
 * @file config.ts
 *
 * @author Archie Disono
 * @url https://github.com/disono/Ionic-Framework-Template
 * @license Apache 2.0
 */
var _WBConfig = (function () {
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
      return (_WBConfig.dev) ? 'http://192.168.1.58:40105/api/v1/' : 'http://your-prod-domain/api/v1/';
    },
    // socket IO
    socket_uri: function () {
      return (_WBConfig.dev) ? 'http://192.168.1.58:3000/' : 'http://your-prod-domain:3000/';
    },
    // Fire-base Cloud Messaging
    enableFCM: false,
    // we will watch the user's position on application sync
    watchPosition: true,
    // GPS
    lat: 0,
    lng: 0,
    watchPositionID: null,
    // socket defaults
    private_message_on_view: false,
    // reset the config
    resetGPS: function () {
      // stop GSP watch
      helper_1.WBHelper.stopWatchPosition();
      _WBConfig.lat = 0;
      _WBConfig.lng = 0;
      _WBConfig.watchPositionID = null;
    }
  };
}());
exports.WBConfig = _WBConfig;
