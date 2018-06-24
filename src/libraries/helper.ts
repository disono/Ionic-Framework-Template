/**
 * @author          Archie, Disono (webmonsph@gmail.com)
 * @link            https://webmons.com
 * @copyright       Webmons Development Studio. (webmons.com), 2018
 * @license         Apache, 2.0 https://github.com/disono/Ionic-Framework-Template/blob/master/LICENSE
 */
import {WBConfig} from "../config";

declare let window;
declare let navigator;

let _WBHelper = (function () {
  return {
    /**
     * Set default values
     *
     * @param params_defaults
     * @param options
     * @returns {any}
     */
    defaults: function (params_defaults, options) {
      for (let prop in params_defaults) {
        // Note: if options would contain some undefined or unnecessary values, you should check for undefined instead.
        options[prop] = (typeof options[prop] !== 'undefined') ? options[prop] : params_defaults[prop];
      }

      params_defaults = options;

      return params_defaults;
    },

    /**
     * Set local storage
     *
     * @param key
     * @param value
     * @param isJson
     */
    setItem: function (key, value, isJson) {
      if (isJson === true) {
        value = JSON.stringify(value);
      }

      window.localStorage.setItem(key, value);
    },

    /**
     * Get local storage
     *
     * @param key
     * @param isJson
     */
    getItem: function (key, isJson) {
      let value = window.localStorage.getItem(key);

      if (isJson === true && value != null) {
        value = JSON.parse(value);
      }

      return value;
    },

    /**
     * Remove local storage
     *
     * @param key
     */
    removeItem: function (key) {
      window.localStorage.removeItem(key);
    },

    /**
     * Clear local storage
     */
    clearItem: function () {
      window.localStorage.clear();
    },

    /**
     * Show toast
     *
     * @url https://github.com/EddyVerbruggen/Toast-PhoneGap-Plugin
     * @param message
     */
    showToast: function (message) {
      if (WBConfig.isBrowser) {
        _WBHelper.log(message);
        return;
      }

      window.plugins.toast.showWithOptions({
          message: message,
          duration: "short",
          position: "bottom"
        },
        function () {

        },
        function (e) {
          _WBHelper.error(e);
        });
    },

    /**
     * Android alert box
     *
     * @url https://github.com/apache/cordova-plugin-dialogs
     * @params object {desc, title, callBackFunction, btnOk}
     */
    alert: function (options) {
      if (WBConfig.isBrowser) {
        _WBHelper.log('Alert: ' + options.title + ', ' + options.desc);
        return;
      }

      options = _WBHelper.defaults({
        btnOk: 'Ok',
        title: '',
        desc: '',
        callback: function () {

        }
      }, options);

      navigator.notification.alert(
        options.desc,
        options.callback,
        options.title,
        options.btnOk
      );
    },

    /**
     * Android confirm box
     *
     * @url https://github.com/apache/cordova-plugin-dialogs
     * @params object {desc, title, callBackFunction, btnOk}
     */
    confirm: function (options) {
      if (WBConfig.isBrowser) {
        _WBHelper.log('Alert: ' + options.title + ', ' + options.desc);
        return;
      }

      options = _WBHelper.defaults({
        btnOk: 'Yes,No',
        title: '',
        desc: '',
        callback: function () {

        }
      }, options);

      navigator.notification.confirm(
        options.desc,
        options.callback,
        options.title,
        options.btnOk
      );
    },

    /**
     * Show error messages
     *
     * @param obj
     */
    errorMessage: function (obj) {
      let errorText = 'Unknown error occurred, or please check your network connection.';

      if (typeof obj === 'object') {
        for (let key in obj) {
          if (obj.hasOwnProperty(key)) {
            errorText = obj[key].toString();
            _WBHelper.showToast(errorText);

            return errorText;
          }
        }

        return errorText;
      }

      if (!obj) {
        _WBHelper.showToast(obj);
        return obj;
      }

      _WBHelper.showToast(obj);
      return obj;
    },

    /**
     * Log messages
     *
     * @param message
     */
    log: function (message) {
      if (!WBConfig.isBrowser || !message) {
        return;
      }

      console.log('WB Log: ' + new Date() + ': ' + message);
    },

    /**
     * Log errors
     *
     * @param message
     */
    error: function (message) {
      if (!WBConfig.isBrowser || !message) {
        return;
      }

      console.log('WB Error: ' + new Date() + ': ' + message);
    },

    /**
     * Copy to clipboard
     *
     * @param value
     * @param input
     * @param message
     */
    copyToClipboard: function (value, message) {
      const el = document.createElement('textarea');
      el.value = value;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);

      _WBHelper.showToast(message);
    },

    /**
     * Filter errors
     *
     * @param e
     * @returns {any}
     */
    getErrors: function (e) {
      if (typeof e === 'object') {
        for (let key in e) {
          if (e.hasOwnProperty(key)) {
            return e[key];
          }
        }
      }

      return e;
    },

    /**
     * Convert base64 to blob
     *
     * @param dataURI
     * @returns {Blob}
     */
    b64toBlob(dataURI) {
      // convert base64/URLEncoded data component to raw binary data held in a string
      let byteString;
      if (dataURI.split(',')[0].indexOf('base64') >= 0) {
        byteString = atob(dataURI.split(',')[1]);
      } else {
        byteString = encodeURI(dataURI.split(',')[1]);
      }

      // separate out the mime component
      let mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
      // write the bytes of the string to a typed array
      let ia = new Uint8Array(byteString.length);

      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }

      return new Blob([ia], {type: mimeString});
    }
  };
}());

export let WBHelper = _WBHelper;
