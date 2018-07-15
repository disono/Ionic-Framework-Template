/**
 * @author          Archie, Disono (webmonsph@gmail.com)
 * @link            https://webmons.com
 * @copyright       Webmons Development Studio. (webmons.com), 2018
 * @license         Apache, 2.0 https://github.com/disono/Ionic-Framework-Template/blob/master/LICENSE
 */

import {Injectable} from '@angular/core';
import {BaseProvider} from "./base";
import {WBHelper} from "../libraries/helper";
import {WBSecurity} from "../libraries/security";
import {AuthSocialProvider} from "./authSocial";

@Injectable()
export class AuthProvider {

  constructor(private base: BaseProvider, private authSocialProvider: AuthSocialProvider) {
    WBHelper.log('Auth Provider');
  }

  register(parameters) {
    return this.base.post('auth/register', parameters, function (res) {
      WBHelper.log('Auth-register: ' + res);
    });
  }

  login(parameters) {
    return this.base.post('auth/login', parameters, function (res) {
      WBHelper.log('Auth-login: ' + res);
      WBSecurity.saveAuth(res.data);
    });
  }

  logout() {
    let auth = WBHelper.getItem('user', true);
    let tokenId = 0;

    if (auth) {
      tokenId = auth.token.id;
    }

    let thisApp = this;
    return this.base.get('auth/logout/' + tokenId, null, function (res) {
      WBHelper.log('Auth-logout: ' + res);

      // logout facebook
      thisApp.authSocialProvider.facebookLogout(function (facebookLogoutResponse) {
        WBHelper.clearItem();
      }, function (facebookLogoutError) {
        WBHelper.clearItem();
      });
    });
  }

  passwordForgot(email) {
    return this.base.post('auth/password/forgot', {email: email}, function (res) {
      WBHelper.log('Auth-forgot: ' + res);
    });
  }

  resendVerify(type, value) {
    return this.base.post('auth/verify/resend/' + type, {type_value: value}, function (res) {
      WBHelper.log('Auth-verify: ' + res);
    });
  }

  verifyPhone(number, code) {
    return this.base.post('auth/verify/phone', {phone: number, token: code}, function (res) {
      WBHelper.log('Auth-verifyPhone: ' + res);
    });
  }

  sync() {
    return this.base.get('user/sync', null, function (res) {
      WBHelper.log('Auth-sync: ' + res);
      WBSecurity.saveAuth(res.data.profile);
    });
  }

  token(token) {
    let me = this.user();
    let token_id = (me) ? me.token.id : '';

    return this.base.post('user/fcm/store', {fcm_token: token, token_id: token_id}, function (res) {
      WBHelper.log('Auth-token: ' + res);
    });
  }

  user() {
    return WBHelper.getItem('user', true);
  }

}