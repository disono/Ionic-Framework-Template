"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
var core_1 = require("@angular/core");
var helper_1 = require("../lib/helper");
var config_1 = require("../lib/config");
var socket_1 = require("../lib/socket");
/*
 Generated class for the AuthProvider provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
var AuthProvider = (function () {
  function AuthProvider(appProvider) {
    this.appProvider = appProvider;
    console.log('AuthProvider Provider Called.');
  }

  /**
   * Login
   *
   * @param parameters
   * @returns {any}
   */
  AuthProvider.prototype.login = function (parameters) {
    return this.appProvider.post('auth/login', parameters, function (res) {
      console.debug('AuthProvider-login: ' + res);
      // save
      helper_1.WBHelper.setItem('user', res.data, true);
    });
  };
  /**
   * Forgot password
   *
   * @param parameters
   * @returns {any}
   */
  AuthProvider.prototype.forgot = function (parameters) {
    return this.appProvider.post('password/recover', parameters, function (res) {
      console.debug('AuthProvider-forgot: ' + res);
    });
  };
  /**
   * Register
   *
   * @param parameters
   * @returns {any}
   */
  AuthProvider.prototype.register = function (parameters) {
    return this.appProvider.post('auth/register', parameters, function (res) {
      console.debug('AuthProvider-register: ' + res);
    });
  };
  /**
   * Update user settings or profile
   *
   * @param parameters
   * @param successCallback
   * @param errorCallback
   */
  AuthProvider.prototype.update = function (parameters, successCallback, errorCallback) {
    var thisApp = this;
    this.appProvider.upload('user/update/setting', parameters, function (res) {
      // success
      successCallback(res);
      // get the secret key and token key
      var user = thisApp.user();
      res.data.secret_key = user.secret_key;
      res.data.token_key = user.token_key;
      helper_1.WBHelper.setItem('user', res.data, true);
    }, function (res) {
      // errors
      errorCallback(res);
    });
  };
  /**
   * Update security
   *
   * @param parameters
   * @returns {any}
   */
  AuthProvider.prototype.security = function (parameters) {
    var thisApp = this;
    return this.appProvider.post('user/update/security', parameters, function (res) {
      console.debug('AuthProvider-security: ' + res);
      var me = thisApp.user();
      res = res.data;
      res.secret_key = me.secret_key;
      res.token_key = me.token_key;
      helper_1.WBHelper.setItem('user', res, true);
    });
  };
  /**
   * Sync user details
   *
   * @returns {any}
   */
  AuthProvider.prototype.sync = function () {
    var thisApp = this;
    return this.appProvider.get('user/' + thisApp.user().id, null, function (res) {
      console.debug('AuthProvider-sync: ' + res);
      // save the data for authenticated user
      var user = thisApp.user();
      res.data.secret_key = user.secret_key;
      res.data.token_key = user.token_key;
      helper_1.WBHelper.setItem('user', res.data, true);
    });
  };
  /**
   * Check if user is authenticated
   *
   * @returns {boolean}
   */
  AuthProvider.prototype.check = function () {
    return !!(helper_1.WBHelper.getItem('user', false));
  };
  /**
   * UserProvider detains or information
   *
   * @returns {any}
   */
  AuthProvider.prototype.user = function () {
    return helper_1.WBHelper.getItem('user', true);
  };
  /**
   * Logout
   */
  AuthProvider.prototype.logout = function () {
    // destroy the socket
    socket_1.WBSocket.disconnect();
    // reset GPS
    config_1.WBConfig.resetGPS();
    // clear all stored data
    helper_1.WBHelper.clearItem();
  };
  /**
   * Store FCM token
   *
   * @param id
   * @param token
   * @returns {any}
   */
  AuthProvider.prototype.fcm_token = function (id, token) {
    return this.appProvider.get('user/fcm-token/' + id + '/' + token, null, function (res) {
      console.debug('AuthProvider-fcm_token: ' + res);
    });
  };
  AuthProvider = __decorate([
    core_1.Injectable()
  ], AuthProvider);
  return AuthProvider;
}());
exports.AuthProvider = AuthProvider;
