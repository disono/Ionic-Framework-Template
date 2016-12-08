import {Injectable} from "@angular/core";
import {Headers, Http, RequestOptions, URLSearchParams} from "@angular/http";
import "rxjs/add/operator/map";
import "rxjs/Rx";
import {WBHelper} from "../lib/helper";
import {Observable} from "rxjs/Observable";
import {WBSecurity} from "../lib/security";
import {WBConfig} from "../lib/config";
import * as jQ from "jquery";

/**
 * @description Application Providers
 * @file app-provider.ts
 *
 * @author Archie Disono
 * @url https://github.com/disono/Ionic-Framework-Template
 * @license Apache 2.0
 */

@Injectable()
export class AppProvider {
  me: any;

  constructor(public http: Http) {
    let auth = WBHelper.getItem('user', true);
    this.me = (!!(auth)) ? auth : null;
  }

  /**
   * Request status response
   *
   * @param response
   * @returns {any}
   */
  requestStatus(response) {
    if (response.status < 200 || response.status >= 300) {
      console.error('AppProvider-requestStatus' + 'Bad response status: ' + response.status);
      this._handleError('Bad response status: ' + response.status);
    }

    return response.json();
  }

  /**
   * Headers for authenticated
   *
   * @returns {Headers}
   */
  headersAuth() {
    let me = this.me;
    console.debug('headersAuth: ' + JSON.stringify(me));

    // headers
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + WBSecurity.jwt(me.secret_key, me.id),
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
  headersGuest() {
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
    let res_options = (this.me) ? this.headersAuth() : thisApp.headersGuest();

    // parameters
    let params = new URLSearchParams();
    if (parameters) {
      jQ.each(parameters, function (i, val) {
        params.set(i, val);
      });
    }

    // append this additional parameters
    res_options.search = params;

    return thisApp.http.get(url, res_options)
      .map(function (response) {
        var res = thisApp.requestStatus(response);

        successCallback(res);
        return res;
      })
      .catch(thisApp._handleError);
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
    let headers = (this.me) ? this.headersAuth() : thisApp.headersGuest();

    return thisApp.http.post(url, body, headers)
      .map(function (response) {
        var res = thisApp.requestStatus(response);

        successCallback(res);
        return res;
      })
      .catch(thisApp._handleError);
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
    let thisApp = this;
    let me = thisApp.me;
    let url = WBConfig.server_url() + uri;
    let xhr = new XMLHttpRequest();

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
        } else {
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
        } else {
          errorCallback(res);
          thisApp._handleError(res.errors);
        }
      }
    };

    if (me) {
      // add headers for JWT token
      xhr.setRequestHeader("Authorization", "Bearer " + WBSecurity.jwt(me.secret_key, me.id));
      xhr.setRequestHeader("token_key", me.token_key);
      xhr.setRequestHeader("authenticated_id", me.id);
    }

    // send the data.
    xhr.send(formData);
  }

  /**
   * Handle errors
   *
   * @param error
   * @returns {ErrorObservable}
   */
  _handleError(error) {
    if (error instanceof String || typeof error.json != 'function') {
      console.error('AppProvider-_handleError-instanceof: ' + error);
      WBHelper.errorMessage(error);

      return;
    }

    console.error('AppProvider-_handleError-Observable.throw: ' + error);
    WBHelper.errorMessage(error.json().errors);

    return Observable.throw(error.json().errors);
  }

}
