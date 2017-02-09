"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
var core_1 = require("@angular/core");
var helper_1 = require("../lib/helper");
/*
 Generated class for the Auth provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
var Auth = (function () {
  function Auth(appProvider) {
    this.appProvider = appProvider;
    console.log('Auth Provider Called.');
  }

  /**
   * Login
   *
   * @param parameters
   * @returns {any}
   */
  Auth.prototype.login = function (parameters) {
    return this.appProvider.post('auth/login', parameters, function (res) {
      console.debug('Auth-login: ' + res);
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
  Auth.prototype.forgot = function (parameters) {
    return this.appProvider.post('password/recover', parameters, function (res) {
      console.debug('Auth-forgot: ' + res);
    });
  };
  /**
   * Register
   *
   * @param parameters
   * @returns {any}
   */
  Auth.prototype.register = function (parameters) {
    return this.appProvider.post('auth/register', parameters, function (res) {
      console.debug('Auth-register: ' + res);
    });
  };
  /**
   * Update user settings or profile
   *
   * @param parameters
   * @param successCallback
   * @param errorCallback
   */
  Auth.prototype.update = function (parameters, successCallback, errorCallback) {
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
  Auth.prototype.security = function (parameters) {
    var thisApp = this;
    return this.appProvider.post('user/update/security', parameters, function (res) {
      console.debug('Auth-security: ' + res);
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
  Auth.prototype.sync = function () {
    var thisApp = this;
    return this.appProvider.get('user/' + thisApp.user().id, null, function (res) {
      console.debug('Auth-sync: ' + res);
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
  Auth.prototype.check = function () {
    return !!(helper_1.WBHelper.getItem('user', false));
  };
  /**
   * User detains or information
   *
   * @returns {any}
   */
  Auth.prototype.user = function () {
    return helper_1.WBHelper.getItem('user', true);
  };
  /**
   * Logout
   */
  Auth.prototype.logout = function () {
    helper_1.WBHelper.clearItem();
  };
  /**
   * Store FCM token
   *
   * @param id
   * @param token
   * @returns {any}
   */
  Auth.prototype.fcm_token = function (id, token) {
    return this.appProvider.get('user/fcm-token/' + id + '/' + token, null, function (res) {
      console.debug('Auth-fcm_token: ' + res);
    });
  };
  Auth = __decorate([
    core_1.Injectable()
  ], Auth);
  return Auth;
}());
exports.Auth = Auth;
