import {Injectable} from "@angular/core";
import {WBHelper} from "../lib/helper";
import {AppProvider} from "./app-provider";

/*
 Generated class for the Auth provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class Auth {

  constructor(public appProvider: AppProvider) {
    console.log('Auth Provider Called.');
  }

  /**
   * Login
   *
   * @param parameters
   * @returns {any}
   */
  login(parameters) {
    return this.appProvider.post('auth/login', parameters, function (res) {
      console.debug('Auth-login: ' + res);

      // save
      WBHelper.setItem('user', res.data, true);
    });
  }

  /**
   * Forgot password
   *
   * @param parameters
   * @returns {any}
   */
  forgot(parameters) {
    return this.appProvider.post('password/recover', parameters, function (res) {
      console.debug('Auth-forgot: ' + res);
    });
  }

  /**
   * Register
   *
   * @param parameters
   * @returns {any}
   */
  register(parameters) {
    return this.appProvider.post('auth/register', parameters, function (res) {
      console.debug('Auth-register: ' + res);
    });
  }

  /**
   * Update user settings or profile
   *
   * @param parameters
   * @param successCallback
   * @param errorCallback
   */
  update(parameters, successCallback, errorCallback) {
    let thisApp = this;

    this.appProvider.upload('user/update/setting', parameters, function (res) {
      // success
      successCallback(res);

      // get the secret key and token key
      let user = thisApp.user();
      res.data.secret_key = user.secret_key;
      res.data.token_key = user.token_key;

      WBHelper.setItem('user', res.data, true);
    }, function (res) {
      // errors
      errorCallback(res);
    });
  }

  /**
   * Update security
   *
   * @param parameters
   * @returns {any}
   */
  security(parameters) {
    let thisApp = this;

    return this.appProvider.post('user/update/security', parameters, function (res) {
      console.debug('Auth-security: ' + res);

      let me = thisApp.user();
      res = res.data;
      res.secret_key = me.secret_key;
      res.token_key = me.token_key;

      WBHelper.setItem('user', res, true);
    });
  }

  /**
   * Sync user details
   *
   * @returns {any}
   */
  sync() {
    let thisApp = this;

    return this.appProvider.get('user/' + thisApp.user().id, null, function (res) {
      console.debug('Auth-sync: ' + res);

      // save the data for authenticated user
      let user = thisApp.user();
      res.data.secret_key = user.secret_key;
      res.data.token_key = user.token_key;

      WBHelper.setItem('user', res.data, true);
    });
  }

  /**
   * Check if user is authenticated
   *
   * @returns {boolean}
   */
  check() {
    return !!(WBHelper.getItem('user', false));
  }

  /**
   * User detains or information
   *
   * @returns {any}
   */
  user() {
    return WBHelper.getItem('user', true);
  }

  /**
   * Logout
   */
  logout() {
    WBHelper.clearItem();
  }

  /**
   * Store FCM token
   *
   * @param id
   * @param token
   * @returns {any}
   */
  fcm_token(id, token) {
    return this.appProvider.get('user/fcm-token/' + id + '/' + token, null, function (res) {
      console.debug('Auth-fcm_token: ' + res);
    });
  }

}
