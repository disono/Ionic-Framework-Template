/**
 * @description view helpers
 * @file view.ts
 *
 * @author Archie Disono
 * @url https://github.com/disono/Ionic-Framework-Template
 * @license Apache 2.0
 */

var _WBView = (function () {
  return {

    /**
     * alert
     *
     * @param alertCtrl
     * @param title
     * @param message
     */
    alert: function (alertCtrl, title, message) {
      let alert = alertCtrl.create({
        title: title,
        message: message,
        buttons: ['Ok']
      });

      alert.present();
    },

    /**
     * Toast
     *
     * @param toastCtrl
     * @param message
     */
    toast: function (toastCtrl, message) {
      let toast = toastCtrl.create({
        message: message,
        duration: 3000
      });

      toast.present();
    },

    /**
     * Loading
     *
     * @param loadingCtrl
     * @param message
     */
    loading: function (loadingCtrl, message) {
      var loader = loadingCtrl.create({
        content: message
      });

      loader.present();
      return loader;
    }

  };
}());

export let WBView = _WBView;
