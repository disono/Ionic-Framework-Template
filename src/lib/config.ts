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
    dev: true,

    api_key_google: null,

    server_url: function () {
      return (_WBConfig.dev) ? 'http://yout-domain/api/v1/' : 'http://';
    }
  };
}());

export let WBCONFIG = _WBConfig;
