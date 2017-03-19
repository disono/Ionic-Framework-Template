import {Injectable} from "@angular/core";
import {WBHelper} from "../lib/helper";
import {APDProvider} from "./apd-provider";
import {WBConfig} from "../lib/config";
import {WBSocket} from "../lib/socket";
import {WBSecurity} from "../lib/security";

declare let facebookConnectPlugin;

/*
 Generated class for the AuthProvider provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class AuthProvider {

  constructor(public appProvider: APDProvider) {
    console.log('AuthProvider Provider Called.');
  }

  /**
   * Login
   *
   * @param parameters
   * @returns {any}
   */
  login(parameters) {
    return this.appProvider.post('auth/login', parameters, function (res) {
      console.debug('AuthProvider-login: ' + res);

      WBSecurity.saveAuth(res.data);
    });
  }

  /**
   * Facebook authentication
   */
  facebook(successCallback, errorCallback, completeCallback) {
    let thisApp = this;
    let permissions = [
      'email', 'user_birthday'
    ];

    if (WBConfig.is_browser || !WBConfig.facebook_auth) {
      alert('Facebook login is not compatible with browser mode, or the facebook authentication is disabled.');
      completeCallback();
    } else {
      // remove any facebook auth
      thisApp.facebookLogout(function () {
        // start to login
        facebookConnectPlugin.login(permissions, function (login_response) {
          if (typeof login_response !== 'string') {
            // get user
            facebookConnectPlugin.api('/me?fields=name,first_name,last_name,email,gender,birthday', permissions, function (api_response) {
              // submit to server
              thisApp.register({
                social_id: api_response.id,

                first_name: api_response.first_name,
                last_name: api_response.last_name,
                email: api_response.email
              }).subscribe(function (register_response) {
                // save
                WBSecurity.saveAuth(register_response.data);

                // call success
                successCallback(register_response);
              }, function (register_error) {
                errorCallback("Server Failed: " + register_error);
              });
            }, function (api_error) {
              errorCallback('API FB Response: ' + JSON.stringify(api_error));
            });
          } else {
            errorCallback('Auth FB Response: ' + login_response);
          }
        }, function (login_error) {
          errorCallback('Auth FB API: ' + JSON.stringify(login_error));
        });
      });
    }
  }

  /**
   * Facebook logout
   */
  facebookLogout(callback) {
    // facebook logout
    if (!WBConfig.is_browser && WBConfig.facebook_auth) {
      facebookConnectPlugin.logout(function (success) {
        callback();
      }, function (error) {
        callback();
      });
    }
  }

  /**
   * Forgot password
   *
   * @param parameters
   * @returns {any}
   */
  forgot(parameters) {
    return this.appProvider.post('password/recover', parameters, function (res) {
      console.debug('AuthProvider-forgot: ' + res);
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
      console.debug('AuthProvider-register: ' + res);
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
    this.appProvider.upload('user/update/setting', parameters, function (res) {
      // success
      successCallback(res);

      WBSecurity.saveAuth(res.data);
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
    return this.appProvider.post('user/update/security', parameters, function (res) {
      console.debug('AuthProvider-security: ' + res);

      WBSecurity.saveAuth(res.data);
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
      console.debug('AuthProvider-sync: ' + res);

      WBSecurity.saveAuth(res.data);
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
   * UserProvider detains or information
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
    // destroy the socket
    WBSocket.disconnect();

    // reset GPS
    WBConfig.resetGPS();

    // clear all stored data
    WBHelper.clearItem();

    // facebook logout
    this.facebookLogout(function () {

    });
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
      console.debug('AuthProvider-fcm_token: ' + res);
    });
  }

}
