/**
 * @author Archie, Disono (webmonsph@gmail.com)
 * @url https://github.com/disono/Ionic-Framework-Template
 * @copyright Webmons Development Studio. (webmons.com), 2016-2017
 * @license Apache, 2.0 https://github.com/disono/Ionic-Framework-Template/blob/master/LICENSE
 */

import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/Rx";
import {WBHelper} from "../lib/helper";
import {WBSecurity} from "../lib/security";
import {WBConfig} from "../lib/config";

declare let jQ;

@Injectable()
export class APDProvider {

  constructor(public http: HttpClient) {
    WBHelper.log('App Provider Called.');
  }

  /**
   * Authenticated user
   *
   * @returns {string}
   */
  static me() {
    return WBHelper.getItem('user', true);
  }

  /**
   * Request status response
   *
   * @param response
   * @returns {any}
   */
  static requestStatus(response) {
    if (!response.success) {
      WBHelper.error(response);
      APDProvider._handleError(response);
    }

    return response;
  }

  /**
   * Handle errors
   *
   * @param e
   * @returns {any}
   * @private
   */
  static _handleError(e) {
    if (e instanceof String) {
      WBHelper.errorMessage(e);
      WBHelper.error('APDProvider-_handleError-instanceof: ' + e);
      return Observable.throw(e);
    }

    if (e.error.errors) {
      WBHelper.errorMessage(e.error.errors);
      WBHelper.error('APDProvider-_handleError-instanceof: ' + e.error.errors);
      return Observable.throw(e.error.errors);
    }

    WBHelper.errorMessage("APDProvider-_handleError-error_data: " + " Status Code: " + e.status + ' Message: ' + JSON.stringify(e));
    WBHelper.debugging("APDProvider-_handleError-error_data: " + " Status Code: " + e.status + ' Message: ' + JSON.stringify(e));
    return Observable.throw("Unknown JSON data error: " + e);
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
    let headers = (APDProvider.me()) ? thisApp.headersAuth() : thisApp.headersGuest();

    // parameters
    let params = new HttpParams();
    if (parameters) {
      jQ.each(parameters, function (i, val) {
        let _val = (val === null) ? '' : val;
        params = params.append(i, _val);
      });
    }

    return thisApp.http
      .get(url, {
        headers: headers,
        params: params
      })
      .map(function (response) {
        let res = APDProvider.requestStatus(response);

        successCallback(res);
        return res;
      })
      .catch(APDProvider._handleError);
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
    let params = (parameters) ? JSON.stringify(parameters) : null;
    let headers = (APDProvider.me()) ? thisApp.headersAuth() : thisApp.headersGuest();

    return thisApp.http
      .post(url, params, {
        headers: headers
      })
      .map(function (response) {
        let res = APDProvider.requestStatus(response);

        successCallback(res);
        return res;
      })
      .catch(APDProvider._handleError);
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
   */
  upload(uri, parameters, successCallback) {
    // form inputs
    let formData = new FormData();

    // files to upload
    if (parameters.files) {
      jQ.each(parameters.files, function (i, val) {
        if (Array.isArray(val)) {
          // multiple files upload
          for (let num = 0; num < val.length; num++) {
            // make has values
            if (val[num]) {
              formData.append(i + '[]', val[num]);
            }
          }
        } else {
          // single upload
          // make has value
          if (val) {
            formData.append(i, val);
          }
        }
      });
    }

    // other form inputs
    if (parameters.inputs) {
      jQ.each(parameters.inputs, function (i, val) {
        formData.append(i, val);
      });
    }

    let thisApp = this;
    let url = WBConfig.server_url() + uri;
    let me = APDProvider.me();
    let headers = new HttpHeaders()
      .append('Authorization', "Bearer " + WBSecurity.jwtAuth().toLocaleString())
      .append('token_key', me.token_key.toLocaleString())
      .append('authenticated_id', me.id.toLocaleString());

    return thisApp.http
      .post(url, formData, {
        headers: headers
      })
      .map(function (response) {
        let res = APDProvider.requestStatus(response);

        successCallback(res);
        return res;
      })
      .catch(APDProvider._handleError);
  }

  /**
   * HttpHeaders for authenticated
   *
   * @returns {HttpHeaders}
   */
  headersAuth() {
    let me = APDProvider.me();

    return new HttpHeaders()
      .append('Content-Type', 'application/json')
      .append('Authorization', "Bearer " + WBSecurity.jwtAuth().toLocaleString())
      .append('token_key', me.token_key.toLocaleString())
      .append('authenticated_id', me.id.toLocaleString());
  }

  /**
   * HttpHeaders for guest
   *
   * @returns {HttpHeaders}
   */
  headersGuest() {
    return new HttpHeaders()
      .append('Content-Type', 'application/json');
  }

}
