import {WBHelper} from "./helper";
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

    // facebook authentication (disabled)
    facebook_auth: false,

    // server url
    server_url: function () {
      return (_WBConfig.dev) ? 'http://your-domain/api/v1/' : 'http://your-prod-domain/api/v1/';
    },

    // socket IO
    socket_uri: function () {
      return (_WBConfig.dev) ? 'http://your-domain:3000/' : 'http://your-prod-domain:3000/';
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
      WBHelper.stopWatchPosition();

      _WBConfig.lat = 0;
      _WBConfig.lng = 0;
      _WBConfig.watchPositionID = null;
    }
  };
}());

export let WBConfig = _WBConfig;
