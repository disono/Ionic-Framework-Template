/**
 * @author Archie, Disono (webmonsph@gmail.com)
 * @git https://github.com/disono/Ionic-Framework-Template
 * @copyright Webmons Development Studio. (webmons.com), 2016-2017
 * @license Apache, 2.0 https://github.com/disono/Ionic-Framework-Template/blob/master/LICENSE
 */

import {WBConfig} from "./config";

declare let jQ;
declare let navigator;
declare let Connection;
declare let window;
declare let ionic;
declare let moment;
declare let cordova;

let _WBHelper = (function () {
  return {
    defaults: function (params_defaults, options) {
      for (let prop in params_defaults) {
        // Note: if options would contain some undefined or unnecessary values, you should check for undefined instead.
        options[prop] = (typeof options[prop] !== 'undefined') ? options[prop] : params_defaults[prop];
      }

      params_defaults = options;

      return params_defaults;
    },

    /**
     * Convert string to bytes
     *
     * @param val
     * @returns {Array}
     */
    stringToByte: function (val) {
      let bytes = [];

      for (let i = 0; i < val.length; ++i) {
        bytes.push(val.charCodeAt(i));
      }

      return bytes;
    },

    /**
     * Convert byte to string
     *
     * @param val
     * @returns {string}
     */
    byteToString: function (val) {
      return String.fromCharCode.apply(String, val);
    },

    /**
     * set local storage
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
     * get local storage
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
     * remove local storage
     *
     * @param key
     */
    removeItem: function (key) {
      window.localStorage.removeItem(key);
    },

    /**
     * clear local storage
     */
    clearItem: function () {
      window.localStorage.clear();
    },

    /**
     * check for network access connection
     *
     * @returns {boolean}
     */
    hasConnection: function () {
      if (WBConfig.is_browser) {
        return true;
      }

      if (navigator.connection.type == Connection.NONE) {
        _WBHelper.showToast('No network connection.');

        return false;
      } else {
        return true;
      }
    },

    /**
     * show toast
     *
     * @param message
     */
    showToast: function (message) {
      if (WBConfig.is_browser) {
        console.log(message);
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
          console.error(e);
        });
    },

    /**
     * android alert box
     *
     * @params object {desc, title, callBackFunction, btnOk}
     */
    alert: function (options) {
      if (WBConfig.is_browser) {
        console.debug('Alert: ' + options.title + ', ' + options.desc);
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
     * android confirm box
     *
     * @params object {desc, title, callBackFunction, btnOk}
     */
    confirm: function (options) {
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
     * show error messages
     *
     * @param obj
     */
    errorMessage: function (obj) {
      let errorText = '';

      if (typeof obj === 'object') {
        jQ.each(obj, function (k, v) {
          _WBHelper.showToast(v.toString());

          errorText = v.toString();
          return false;
        });

        return errorText;
      } else {
        if (!obj) {
          _WBHelper.showToast('Unknown error occurred, or please check your network connection.');
        }

        _WBHelper.showToast(obj);
        return obj;
      }
    },

    /**
     * Notify
     * @url https://github.com/katzer/cordova-plugin-local-notifications
     *
     * @param title
     * @param description
     */
    notify: function (title, description) {
      if (WBConfig.is_browser) {
        console.warn('Notify: ' + title + ', ' + description);
        return;
      }

      cordova.plugins.notification.local.schedule({
        id: new Date().getTime(),
        title: title,
        text: description
      });
    },

    /**
     * Date
     *
     * @param value
     */
    humaDate: function (value) {
      return moment(new Date(value)).format('MMMM DD YYYY');
    },

    /**
     * Get the current location
     *
     * @param successCallback
     * @param errorCallback
     *
     * returns
     * lat: position.coords.latitude
     * lng: position.coords.longitude
     */
    getCurrentPosition: function (successCallback, errorCallback) {
      navigator.geolocation.getCurrentPosition(function (position) {
        WBConfig.lat = position.coords.latitude;
        WBConfig.lng = position.coords.longitude;
        console.log(position);

        successCallback(position);
      }, function (error) {
        console.error('GPS Error (getCurrentPosition): ' + error.message + ', code: ' + error.code);

        errorCallback(error);
      }, {
        timeout: 30000,
        enableHighAccuracy: true
      });
    },

    /**
     * Watch the current position
     *
     * @param successCallback
     * @param errorCallback
     *
     * returns
     * lat: position.coords.latitude
     * lng: position.coords.longitude
     */
    watchPosition: function (successCallback, errorCallback) {
      // clear the data on GPS watch
      if (WBConfig.watchPositionID) {
        navigator.geolocation.clearWatch(WBConfig.watchPositionID);
        WBConfig.watchPositionID = null;
      }

      // watch the current position
      WBConfig.watchPositionID = navigator.geolocation.watchPosition(function (position) {
        WBConfig.lat = position.coords.latitude;
        WBConfig.lng = position.coords.longitude;
        console.log(position);

        successCallback(position);
      }, function (error) {
        console.error('GPS Error (watchPosition): ' + error.message + ', code: ' + error.code);

        errorCallback(error);
      }, {
        timeout: 30000,
        enableHighAccuracy: true
      });
    },

    /**
     * Stop the GPS watch
     */
    stopWatchPosition: function () {
      if (WBConfig.watchPositionID) {
        navigator.geolocation.clearWatch(WBConfig.watchPositionID);
        WBConfig.watchPositionID = null;
      }
    },

    /**
     * Log messages
     *
     * @param message
     */
    log: function (message) {
      if (WBConfig.is_browser || !message) {
        return;
      }

      console.log('WB Log ' + new Date() + ': ' + message);
    },

    /**
     * Log errors
     *
     * @param message
     */
    error: function (message) {
      if (WBConfig.is_browser || !message) {
        return;
      }

      console.log('WB Error ' + new Date() + ': ' + message);
    }
  };
}());

export let WBHelper = _WBHelper;
