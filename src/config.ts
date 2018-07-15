/**
 * @author          Archie, Disono (webmonsph@gmail.com)
 * @link            https://webmons.com
 * @copyright       Webmons Development Studio. (webmons.com), 2018
 * @license         Apache, 2.0 https://github.com/disono/Ionic-Framework-Template/blob/master/LICENSE
 */

let _WBConfig = (function () {
  return {
    development: true,
    isBrowser: false,

    productionURI: 'https://domain/',
    developmentURI: '/',
    url: function () {
      return ((_WBConfig.development) ? _WBConfig.developmentURI : _WBConfig.productionURI) + 'api/v1/';
    },

    authentication: {
      facebook: true,
      email: true
    }
  };
}());

export let WBConfig = _WBConfig;
