import {Injectable} from "@angular/core";
import {Http, Headers, RequestOptions} from "@angular/http";
import "rxjs/add/operator/map";
import "rxjs/Rx";
import {Observable} from "rxjs/Observable";
import {WBCONFIG} from "../lib/config";
import {WBHELPER} from "../lib/helper";
import {WBSecurity} from "../lib/security";

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
    let url = WBCONFIG.server_url() + 'auth/login';
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
    let url = WBCONFIG.server_url() + 'password/recover';
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
    let url = WBCONFIG.server_url() + 'auth/register';
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
    let url = WBCONFIG.server_url() + 'user/update/setting';
    let inputs = options.parameters;

    if (!options.parameters || !inputs.first_name || !inputs.last_name
      || !inputs.email || !inputs.phone || isNaN(inputs.phone)) {
      Auth._handleError('Please fill all the required inputs.');
    }

    let user = this.user();
    let formData = new FormData();

    // image
    if (inputs.image) {
      formData.append('image', inputs.image);
    }

    // inputs
    formData.append('first_name', inputs.first_name);
    formData.append('last_name', inputs.last_name);
    formData.append('email', inputs.email);
    formData.append('phone', inputs.phone);
    formData.append('address', inputs.address);

    // set up the request.
    let xhr = new XMLHttpRequest();
    // open the connection.
    xhr.open('POST', url, true);

    // set up a handler for when the request finishes.
    xhr.onload = function () {
      if (this.response) {
        // success
        callback(JSON.parse(this.response));

        let res = JSON.parse(this.response);
        if (res.success) {
          // get the secret key and token key
          res.data.secret_key = user.secret_key;
          res.data.token_key = user.token_key;

          WBHELPER.setItem('user', res.data, true);
        } else {
          Auth._handleError(res.errors);
        }
      }
    };

    // add headers
    xhr.setRequestHeader("Authorization", "Bearer " + WBSecurity.jwt(user.secret_key, user.id));
    xhr.setRequestHeader("token_key", user.token_key);
    xhr.setRequestHeader("authenticated_id", user.id);

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
    let url = WBCONFIG.server_url() + 'user/update/security';
    let body = JSON.stringify(options.parameters);
    let user = this.user();

    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + WBSecurity.jwt(user.secret_key, user.id),
      'token_key': user.token_key,
      'authenticated_id': user.id
    });
    let res_options = new RequestOptions({headers: headers});

    return this.http.post(url, body, res_options)
      .map(function (response) {
        if (response.status < 200 || response.status >= 300) {
          Auth._handleError('Bad response status: ' + response.status);
        }

        let res = response.json().data;

        // get the secret key and token key
        res.secret_key = user.secret_key;
        res.token_key = user.token_key;
        WBHELPER.setItem('user', res, true);

        return res;
      })
      .catch(Auth._handleError);
  }

  /**
   * Check if user is authenticated
   *
   * @returns {boolean}
   */
  check() {
    return !!(WBHELPER.getItem('user', false));
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
   * Store FCM token
   *
   * @param id
   * @param token
   * @returns {any}
   */
  fcm_token(id, token) {
    let url = WBCONFIG.server_url() + 'user/fcm-token/' + id + '/' + token;

    return this.http.get(url)
      .map(function (response) {
        if (response.status < 200 || response.status >= 300) {
          throw new Error('Bad response status: ' + response.status);
        }

        return response.json().data;
      })
      .catch(Auth._handleError);
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
