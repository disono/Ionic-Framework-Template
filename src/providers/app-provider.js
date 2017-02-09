"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
require("rxjs/add/operator/map");
require("rxjs/Rx");
var helper_1 = require("../lib/helper");
var Observable_1 = require("rxjs/Observable");
var security_1 = require("../lib/security");
var config_1 = require("../lib/config");
/*
 Generated class for the AppProvider provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
var AppProvider = (function () {
  function AppProvider(http) {
    this.http = http;
    console.log('App Provider Called.');
  }

  AppProvider.me = function () {
    var auth = helper_1.WBHelper.getItem('user', true);
    return (!!(auth)) ? auth : null;
  };
  /**
   * Request status response
   *
   * @param response
   * @returns {any}
   */
  AppProvider.requestStatus = function (response) {
    if (response.status < 200 || response.status >= 300) {
      console.error('AppProvider-requestStatus' + 'Bad response status: ' + response.status);
      AppProvider._handleError('Bad response status: ' + response.status);
    }
    return response.json();
  };
  /**
   * Headers for authenticated
   *
   * @returns {Headers}
   */
  AppProvider.headersAuth = function () {
    var me = AppProvider.me();
    console.debug('headersAuth: ' + JSON.stringify(me));
    // headers
    var headers = new http_1.Headers({
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + security_1.WBSecurity.jwt(me.secret_key, me.id),
      'token_key': me.token_key,
      'authenticated_id': me.id
    });
    return new http_1.RequestOptions({headers: headers});
  };
  /**
   * Headers for guest
   *
   * @returns {RequestOptions}
   */
  AppProvider.headersGuest = function () {
    var headers = new http_1.Headers({
      'Content-Type': 'application/json'
    });
    return new http_1.RequestOptions({headers: headers});
  };
  /**
   * GET request
   *
   * @param uri
   * @param parameters
   * @param successCallback
   * @returns {any}
   */
  AppProvider.prototype.get = function (uri, parameters, successCallback) {
    var thisApp = this;
    var url = config_1.WBConfig.server_url() + uri;
    var res_options = (AppProvider.me()) ? AppProvider.headersAuth() : AppProvider.headersGuest();
    // parameters
    var params = new http_1.URLSearchParams();
    if (parameters) {
      jQ.each(parameters, function (i, val) {
        params.set(i, val);
      });
    }
    // append this additional parameters
    res_options.search = params;
    return thisApp.http.get(url, res_options)
      .map(function (response) {
        var res = AppProvider.requestStatus(response);
        successCallback(res);
        return res;
      })
      .catch(AppProvider._handleError);
  };
  /**
   * POST request
   *
   * @param uri
   * @param parameters
   * @param successCallback
   * @returns {any}
   */
  AppProvider.prototype.post = function (uri, parameters, successCallback) {
    var thisApp = this;
    var url = config_1.WBConfig.server_url() + uri;
    var body = (parameters) ? JSON.stringify(parameters) : null;
    var headers = (AppProvider.me()) ? AppProvider.headersAuth() : AppProvider.headersGuest();
    return thisApp.http.post(url, body, headers)
      .map(function (response) {
        var res = AppProvider.requestStatus(response);
        successCallback(res);
        return res;
      })
      .catch(AppProvider._handleError);
  };
  /**
   * Upload
   *
   * Single file: {name: value}
   * Multiple file: {name_1: [value_1, value_2], name_2: [value_1, value_2]}
   *
   * @param uri
   * @param parameters
   * @param successCallback
   * @param errorCallback
   */
  AppProvider.prototype.upload = function (uri, parameters, successCallback, errorCallback) {
    var me = AppProvider.me();
    var url = config_1.WBConfig.server_url() + uri;
    var xhr = new XMLHttpRequest();
    // form inputs
    var formData = new FormData();
    // open the connection.
    xhr.open('POST', url, true);
    // files to upload
    if (parameters.files) {
      jQ.each(parameters.files, function (i, val) {
        if (Array.isArray(val)) {
          // multiple files upload
          for (var num = 0; num < val.length; num++) {
            formData.append(i + '[]', val[num]);
          }
        }
        else {
          // single upload
          formData.append(i, val);
        }
      });
    }
    // inputs
    if (parameters.inputs) {
      jQ.each(parameters.inputs, function (i, val) {
        formData.append(i, val);
      });
    }
    // load to server
    // set up a handler for when the request finishes.
    xhr.onload = function () {
      if (this.response) {
        var res = JSON.parse(this.response);
        if (res.success) {
          successCallback(res);
        }
        else {
          errorCallback(res);
          AppProvider._handleError(res.errors);
        }
      }
    };
    if (me) {
      // add headers for JWT token
      xhr.setRequestHeader("Authorization", "Bearer " + security_1.WBSecurity.jwt(me.secret_key, me.id));
      xhr.setRequestHeader("token_key", me.token_key);
      xhr.setRequestHeader("authenticated_id", me.id);
    }
    // send the data.
    xhr.send(formData);
  };
  /**
   * Handle errors
   *
   * @param error
   * @returns {any}
   * @private
   */
  AppProvider._handleError = function (error) {
    if (error instanceof String || typeof error.json != 'function') {
      console.error('AppProvider-_handleError-instanceof: ' + error);
      helper_1.WBHelper.errorMessage(error);
      return Observable_1.Observable.throw("");
    }
    var error_data = error.json();
    if (!error_data.errors) {
      console.log("AppProvider-_handleError-error_data: Unknown JSON data error.");
      return Observable_1.Observable.throw("");
    }
    console.error('AppProvider-_handleError-Observable.throw: ' + JSON.stringify(error_data.errors));
    helper_1.WBHelper.errorMessage(error_data.errors);
    return Observable_1.Observable.throw("");
  };
  AppProvider = __decorate([
    core_1.Injectable()
  ], AppProvider);
  return AppProvider;
}());
exports.AppProvider = AppProvider;
