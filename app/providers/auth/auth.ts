/// <reference path="../../../typings/globals/jquery/index.d.ts" />
import {Injectable} from "@angular/core";
import {Http, Headers, RequestOptions} from "@angular/http";
import "rxjs/add/operator/map";
import "rxjs/Rx";
import {Observable} from "rxjs/Observable";
import {WBCONFIG} from "./../../lib/config";
import {WBHELPER} from "./../../lib/helpers";

/**
 * @author Archie Disono on 2016-05-08.
 * @url http://webmons.com
 * @license Apache 2.0
 */
@Injectable()
export class Auth {
  constructor(private http: Http) {
    this.http = http;
  }

  /**
   * Login
   *
   * @param options
   * @returns {Observable<R>}
   */
  login(options) {
    var url = WBCONFIG.server_url() + 'auth/login';
    let body = JSON.stringify(options.parameters);
    let headers = new Headers({'Content-Type': 'application/json'});
    let res_options = new RequestOptions({headers: headers});

    return this.http.post(url, body, res_options)
      .map(function (response) {
        if (response.status < 200 || response.status >= 300) {
          throw new Error('Bad response status: ' + response.status);
        }

        return response.json();
      })
      .catch(Auth._handleError);
  }

  /**
   * Register
   *
   * @param options
   * @returns {Observable<R>}
   */
  register(options) {
    var url = WBCONFIG.server_url() + 'auth/register';
    let body = JSON.stringify(options.parameters);
    let headers = new Headers({'Content-Type': 'application/json'});
    let res_options = new RequestOptions({headers: headers});

    return this.http.post(url, body, res_options)
      .map(function (response) {
        if (response.status < 200 || response.status >= 300) {
          throw new Error('Bad response status: ' + response.status);
        }

        return response.json();
      })
      .catch(Auth._handleError);
  }

  /**
   * Update user settings or profile
   *
   * @param options
   * @param callback
   */
  update(options, callback) {
    var url = WBCONFIG.server_url() + 'user/update/setting';
    var inputs = options.parameters;

    if (!options.parameters || !inputs.authenticated_id || !inputs.first_name || !inputs.last_name || !inputs.email || !inputs.phone || isNaN(inputs.phone)) {
      throw new Error('Please fill all the required inputs.');
    }

    // create a new FormData object.
    var formData = new FormData();

    // files
    if (inputs.image) {
      var file = inputs.image.files[0];
      formData.append('image', file);
    }
    formData.append('first_name', inputs.first_name);
    formData.append('last_name', inputs.last_name);
    formData.append('email', inputs.email);
    formData.append('phone', inputs.phone);
    formData.append('authenticated_id', inputs.authenticated_id);

    // set up the request.
    var xhr = new XMLHttpRequest();
    // open the connection.
    xhr.open('POST', url, true);

    // set up a handler for when the request finishes.
    xhr.onload = function () {
      // success
      callback(JSON.parse(this.response));

      WBHELPER.setItem('user', JSON.parse(this.response).data, true);
    };

    // send the data.
    xhr.send(formData);
  }

  /**
   * Update security
   *
   * @param options
   * @returns {Observable<R>}
   */
  security(options) {
    var url = WBCONFIG.server_url() + 'user/update/security';
    let body = JSON.stringify(options.parameters);
    let headers = new Headers({'Content-Type': 'application/json'});
    let res_options = new RequestOptions({headers: headers});

    return this.http.post(url, body, res_options)
      .map(function (response) {
        if (response.status < 200 || response.status >= 300) {
          throw new Error('Bad response status: ' + response.status);
        }

        return response.json();
      })
      .catch(Auth._handleError);
  }

  /**
   * Forgot password
   *
   * @param options
   * @returns {Observable<R>}
   */
  forgot(options) {
    var url = WBCONFIG.server_url() + 'password/recover';
    let body = JSON.stringify(options.parameters);
    let headers = new Headers({'Content-Type': 'application/json'});
    let res_options = new RequestOptions({headers: headers});

    return this.http.post(url, body, res_options)
      .map(function (response) {
        if (response.status < 200 || response.status >= 300) {
          throw new Error('Bad response status: ' + response.status);
        }

        return response.json();
      })
      .catch(Auth._handleError);
  }

  /**
   * Check if user is authenticated
   *
   * @returns {boolean}
   */
  check() {
    return (WBHELPER.getItem('user', false)) ? true : false;
  }

  /**
   * User detains or information
   *
   * @returns {any}
   */
  user() {
    return WBHELPER.getItem('user', true);
  }

  logout() {
    WBHELPER.clearItem();
  }

  /**
   * Handle errors
   *
   * @param error
   * @returns {ErrorObservable}
   * @private
   */
  static _handleError(error) {
    WBHELPER.errorMessage(error.json().errors || 'Server error.');
    return Observable.throw(error.json().errors || 'Server error.');
  }
}
