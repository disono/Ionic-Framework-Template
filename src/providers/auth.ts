import {Injectable} from "@angular/core";
import {Http, Headers, RequestOptions} from "@angular/http";
import "rxjs/add/operator/map";
import "rxjs/Rx";
import {Observable} from "rxjs/Observable";
import {WBCONFIG} from "../lib/config";
import {WBHELPER} from "../lib/helper";

/*
 Generated class for the Auth provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class Auth {

  constructor(public http: Http) {

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
          Auth._handleError('Bad response status: ' + response.status);
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
          Auth._handleError('Bad response status: ' + response.status);
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
          Auth._handleError('Bad response status: ' + response.status);
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

    if (!options.parameters || !inputs.authenticated_id || !inputs.first_name || !inputs.last_name
      || !inputs.email || !inputs.phone || isNaN(inputs.phone)) {
      Auth._handleError('Please fill all the required inputs.');
    }

    // create a new FormData object.
    var formData = new FormData();

    // files
    if (inputs.image) {
      var file = inputs.image.files[0];
      formData.append('image', file);
    }

    // inputs
    formData.append('first_name', inputs.first_name);
    formData.append('last_name', inputs.last_name);
    formData.append('email', inputs.email);
    formData.append('phone', inputs.phone);
    formData.append('address', inputs.address);
    formData.append('authenticated_id', inputs.authenticated_id);

    // set up the request.
    var xhr = new XMLHttpRequest();
    // open the connection.
    xhr.open('POST', url, true);

    // set up a handler for when the request finishes.
    xhr.onload = function () {
      if (this.response) {
        // success
        callback(JSON.parse(this.response));

        var res = JSON.parse(this.response);
        if (res.success) {
          WBHELPER.setItem('user', res.data, true);
        } else {
          Auth._handleError(res.errors);
        }
      }
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
          Auth._handleError('Bad response status: ' + response.status);
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

  /**
   * Logout
   */
  logout() {
    WBHELPER.clearItem();
  }

  /**
   * Handle errors
   *
   * @param error
   * @returns {ErrorObservable}
   */
  static _handleError(error) {
    if (error instanceof String || typeof error.json != 'function') {
      WBHELPER.errorMessage(error);

      return;
    }

    WBHELPER.errorMessage(error.json().errors);
    return Observable.throw(error.json().errors);
  }

}
