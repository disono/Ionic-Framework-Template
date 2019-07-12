import {Injectable} from '@angular/core';
import {BaseService} from "../base/base.service";
import {NavigatorHelper} from "../../disono/navigator";
import {SecurityHelper} from "../../disono/security";
import {StorageHelper} from "../../disono/storage";
import {AuthSocialService} from "./auth.social.service";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private navigatorHelper = new NavigatorHelper();
    private securityHelper = new SecurityHelper();
    private storageHelper = new StorageHelper();

    constructor(private base: BaseService, private authSocialService: AuthSocialService) {

    }

    register(parameters) {
        let self = this;
        return this.base.post('auth/register', parameters, function (response) {
            self.navigatorHelper.log('AuthService-register');
            self.securityHelper.saveAuth(response.data);
        });
    }

    login(parameters) {
        let self = this;
        return this.base.post('auth/login', parameters, function (response) {
            self.navigatorHelper.log('AuthService-login: ' + JSON.stringify(response));
            self.storageHelper.set('user', response.data, true);
        });
    }

    logout() {
        let self = this;
        let user = self.user();
        let tokenId = user ? user.token.id : 0;

        return this.base.get('auth/logout/' + tokenId, null, function (response) {
            self.navigatorHelper.log('AuthService-logout: ' + response);

            // logout facebook
            self.authSocialService.facebookLogout(function (facebookLogoutResponse) {
                self.storageHelper.clear();
            }, function (facebookLogoutError) {
                self.storageHelper.clear();
            });
        });
    }

    passwordForgot(email) {
        let self = this;
        return this.base.post('auth/password/forgot', {email: email}, function (res) {
            self.navigatorHelper.log('AuthService-forgot: ' + res);
        });
    }

    reSendVerify(type) {
        let self = this;
        return this.base.post('auth/verify/resend/' + type, null, function (res) {
            self.navigatorHelper.log('Auth-verify: ' + res);
        });
    }

    verifyPhone(number, code) {
        let self = this;
        return this.base.post('auth/verify/phone', {phone: number, token: code}, function (res) {
            self.navigatorHelper.log('Auth-verifyPhone: ' + res);
        });
    }

    sync() {
        let self = this;
        return this.base.get('user/sync', null, function (res) {
            self.navigatorHelper.log('Auth-sync: ' + res);
            self.securityHelper.saveAuth(res.data.profile);
            self.storageHelper.set('settings', res.data.setting, true);
        });
    }

    storeFCMToken(token) {
        let self = this;
        let me = this.user();
        let token_id = (me) ? me.token.id : '';

        return this.base.post('user/fcm/store', {fcm_token: token, token_id: token_id}, function (res) {
            self.navigatorHelper.log('Auth-token: ' + res);
        });
    }

    user() {
        return this.storageHelper.fetch('user', true);
    }

}
