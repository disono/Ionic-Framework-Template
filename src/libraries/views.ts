/**
 * @author          Archie, Disono (webmonsph@gmail.com)
 * @link            https://webmons.com
 * @copyright       Webmons Development Studio. (webmons.com), 2018
 * @license         Apache 2.0
 */

let _WBViews = (function () {
  return {
    /**
     * Loading view
     *
     * @param loadingCtrl
     * @param message
     * @returns {any}
     */
    loading: function (loadingCtrl, message) {
      let loader = loadingCtrl.create({
        content: message
      });

      loader.present();
      return loader;
    }
  }
}());

export let WBViews = _WBViews;
