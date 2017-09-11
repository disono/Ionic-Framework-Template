/**
 * @author Archie, Disono (webmonsph@gmail.com)
 * @git https://github.com/disono/Ionic-Framework-Template
 * @copyright Webmons Development Studio. (webmons.com), 2016-2017
 * @license Apache, 2.0 https://github.com/disono/Ionic-Framework-Template/blob/master/LICENSE
 */

import {Injectable} from "@angular/core";
import {Headers, Http, RequestOptions, URLSearchParams} from "@angular/http";
import "rxjs/add/operator/map";
import "rxjs/Rx";
import {WBHelper} from "../lib/helper";
import {Observable} from "rxjs/Observable";
import {WBSecurity} from "../lib/security";
import {WBConfig} from "../lib/config";

declare let jQ;
declare let WBUpload;

@Injectable()
export class APDProvider {

  constructor(public http: Http) {
    WBHelper.log('App Provider Called.');
  }

  static me() {
    let auth = WBHelper.getItem('user', true);
    return (!!(auth)) ? auth : null;
  }

  /**
   * Request status response
   *
   * @param response
   * @returns {any}
   */
  static requestStatus(response) {
    if (response.status < 200 || response.status >= 300) {
      WBHelper.error('APDProvider-requestStatus' + 'Bad response status: ' + response.status);
      APDProvider._handleError('Bad response status: ' + response.status);
    }

    return response.json();
  }

  /**
   * Headers for authenticated
   *
   * @returns {Headers}
   */
  static headersAuth() {
    let me = APDProvider.me();

    WBHelper.log('headersAuth: ' + JSON.stringify(me));

    // headers
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + WBSecurity.jwtAuth(),
      'token_key': me.token_key,
      'authenticated_id': me.id
    });

    return new RequestOptions({headers: headers});
  }

  /**
   * Headers for guest
   *
   * @returns {RequestOptions}
   */
  static headersGuest() {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    return new RequestOptions({headers: headers});
  }

  /**
   * GET request
   *
   * @param uri
   * @param parameters
   * @param successCallback
   * @returns {any}
   */
  get(uri, parameters, successCallback) {
    let thisApp = this;
    let url = WBConfig.server_url() + uri;
    let res_options = (APDProvider.me()) ? APDProvider.headersAuth() : APDProvider.headersGuest();

    // parameters
    let params = new URLSearchParams();
    if (parameters) {
      jQ.each(parameters, function (i, val) {
        params.set(i, val);
      });
    }

    // append this additional parameters
    res_options.search = params;

    return thisApp.http.get(url, res_options).map(function (response) {
      let res = APDProvider.requestStatus(response);

      successCallback(res);
      return res;
    }).catch(APDProvider._handleError);
  }

  /**
   * POST request
   *
   * @param uri
   * @param parameters
   * @param successCallback
   * @returns {any}
   */
  post(uri, parameters, successCallback) {
    let thisApp = this;
    let url = WBConfig.server_url() + uri;
    let body = (parameters) ? JSON.stringify(parameters) : null;
    let headers = (APDProvider.me()) ? APDProvider.headersAuth() : APDProvider.headersGuest();

    return thisApp.http.post(url, body, headers).map(function (response) {
      let res = APDProvider.requestStatus(response);

      successCallback(res);
      return res;
    }).catch(APDProvider._handleError);
  }

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
  upload(uri, parameters, successCallback, errorCallback) {
    let me = APDProvider.me();
    let url = WBConfig.server_url() + uri;

    WBUpload(url, me, WBSecurity.jwtAuth(), APDProvider, parameters, successCallback, errorCallback);
  }

  /**
   * Handle errors
   *
   * @param error
   * @returns {any}
   * @private
   */
  static _handleError(error) {
    if (error instanceof String || typeof error.json != 'function') {
      WBHelper.errorMessage(error);
      WBHelper.error('APDProvider-_handleError-instanceof: ' + error);

      return Observable.throw(error);
    }

    let error_data = error.json();
    if (!error_data.errors) {
      WBHelper.errorMessage(error);
      WBHelper.log("APDProvider-_handleError-error_data: Unknown JSON data error.");

      return Observable.throw("Unknown JSON data error.");
    }

    WBHelper.errorMessage(error_data.errors);
    WBHelper.error('APDProvider-_handleError-Observable.throw: ' + JSON.stringify(error_data.errors));

    return Observable.throw(JSON.stringify(error_data.errors));
  }

}
