/**
 * @author          Archie, Disono (webmonsph@gmail.com)
 * @link            https://webmons.com
 * @copyright       Webmons Development Studio. (webmons.com), 2018
 * @license         Apache, 2.0 https://github.com/disono/Ionic-Framework-Template/blob/master/LICENSE
 */

import {Injectable} from '@angular/core';
import {BaseProvider} from "./base";
import {WBHelper} from "../libraries/helper";
import {WBConfig} from "../config";
import {WBSecurity} from "../libraries/security";

declare let facebookConnectPlugin;

@Injectable()
export class AuthSocialProvider {

  constructor(private baseProvider: BaseProvider) {
    WBHelper.log('AuthSocial Provider');
  }

  facebookLogin(onSuccess, onComplete, onFail) {
    let thisApp = this;

    // users birthday is required for approval
    // user_birthday
    let permissions = [
      'email'
    ];

    if (WBConfig.isBrowser || !WBConfig.authentication.facebook || typeof facebookConnectPlugin === 'undefined') {
      WBHelper.alert({
        title: 'Facebook Authentication Failed',
        desc: 'Facebook login is not compatible with current platform mode, or the facebook authentication is disabled.'
      });

      onComplete();
    } else {
      // remove any facebook auth
      thisApp.facebookLogout(function (logoutResponse) {

        // authenticate
        thisApp._facebookAuth(thisApp, permissions, onSuccess, onFail);
      }, function (e) {

        // authenticate
        thisApp._facebookAuth(thisApp, permissions, onSuccess, onFail);
      });
    }
  }

  registerFacebook(parameters) {
    return this.baseProvider.post('auth/social/facebook', parameters, function (res) {
      WBHelper.log('AuthSocial-registerFacebook: ' + res);
      WBSecurity.saveAuth(res.data);
    });
  }

  facebookLogout(onSuccess, onFail) {
    if (typeof facebookConnectPlugin === 'undefined' || !WBHelper.getItem('FacebookAuth', false)) {
      onFail('Facebook logout is not initialized.');
      return;
    }

    if (!WBConfig.isBrowser && WBConfig.authentication.facebook) {
      facebookConnectPlugin.logout(function (logoutResponse) {
        onSuccess(logoutResponse);
      }, function (error) {
        onFail(error);
      });
    }
  }

  private _facebookAuth(thisApp, permissions, onSuccess, onFail) {
    // start to login
    facebookConnectPlugin.login(permissions, function (loginResponse) {
      if (typeof loginResponse !== 'string') {

        // get user
        facebookConnectPlugin.api('/me?fields=first_name,last_name,email,gender', permissions, function (apiResponse) {
          if (typeof apiResponse.email === 'undefined') {
            onFail('Unable to register, email is required.');
            return;
          }

          if (!apiResponse.email || apiResponse.email === null) {
            onFail('Unable to register, email is required.');
            return;
          }

          // submit to server
          thisApp.registerFacebook({
            social_token: loginResponse.authResponse.accessToken,
            social_id: apiResponse.id,
            first_name: apiResponse.first_name,
            last_name: apiResponse.last_name,
            email: apiResponse.email,
          }).subscribe(function (registerResponse) {
            // Set Facebook Login
            WBHelper.setItem('FacebookAuth', apiResponse.id, false);
            onSuccess(registerResponse);
          }, function (registerError) {
            onFail('Registration: ' + JSON.stringify(registerError));
          });
        }, function (apiError) {
          onFail('Facebook User: ' + JSON.stringify(apiError));
        });
      } else {
        onFail('Facebook Response: ' + loginResponse);
      }
    }, function (loginError) {
      onFail('Facebook Login: ' + JSON.stringify(loginError));
    });
  }

}
