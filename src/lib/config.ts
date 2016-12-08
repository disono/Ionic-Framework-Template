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
    dev: true,
    is_browser: true,

    api_key_google: null,

    server_url: function () {
      return (_WBConfig.dev) ? 'http://your-dev-domain/api/v1/' : 'http://your-prod-domain/api/v1/';
    },

    enableFCM: false
  };
}());

export let WBConfig = _WBConfig;
