/**
 * @author Archie, Disono (webmonsph@gmail.com)
 * @git https://github.com/disono/Ionic-Framework-Template
 * @copyright Webmons Development Studio. (webmons.com), 2016-2017
 * @license Apache, 2.0 https://github.com/disono/Ionic-Framework-Template/blob/master/LICENSE
 */

let _WBView = (function () {
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
      let loader = loadingCtrl.create({
        content: message
      });

      loader.present();
      return loader;
    }

  };
}());

export let WBView = _WBView;
