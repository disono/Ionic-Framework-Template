/**
 * @description helpers
 * @file helper.ts
 *
 * @author Archie Disono
 * @url https://github.com/disono/Ionic-Framework-Template
 * @license Apache 2.0
 */
import * as jQ from "jquery";
import {WBConfig} from "./config";

declare let navigator;
declare let Connection;
declare let window;
declare let ionic;

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
        console.error(message);
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
    }
  };
}());

export let WBHelper = _WBHelper;
