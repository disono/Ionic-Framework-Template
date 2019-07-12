/**
 * @author          Archie, Disono (webmonsph@gmail.com)
 * @link            https://webmons.com
 * @copyright       Archie Disono - Webmons Development Studio. (webmons.com), 2018
 * @license         Apache, 2.0 https://github.com/disono/Ionic-Framework-Template/blob/master/LICENSE
 */

import {Injectable} from '@angular/core';
import {Configurations} from "../../../environments/config";
import {NavigatorHelper} from "../../disono/navigator";
import {BaseService} from "../base/base.service";
import {SecurityHelper} from "../../disono/security";
import {StorageHelper} from "../../disono/storage";

declare let facebookConnectPlugin;

@Injectable({
    providedIn: 'root'
})
export class AuthSocialService {
    private config = new Configurations();
    private navigatorHelper = new NavigatorHelper();
    private securityHelper = new SecurityHelper();
    private storageHelper = new StorageHelper();

    constructor(private base: BaseService) {
        this.navigatorHelper.log('AuthSocialService');
    }

    facebookLogin(onSuccess, onFail) {
        let self = this;

        // users birthday is required for approval
        // user_birthday
        let permissions = [
            'email'
        ];

        if (self.config.browser || typeof facebookConnectPlugin === 'undefined') {
            onFail();

            self.navigatorHelper.alert({
                title: 'Facebook Authentication Failed',
                desc: 'Facebook login is not compatible with current platform mode, or the facebook authentication is disabled.'
            });
        } else {
            // remove any facebook auth
            self.facebookLogout(function (logoutResponse) {
                // authenticate
                self._facebookAuth(self, permissions, onSuccess, onFail);
            }, function (e) {
                // authenticate
                self._facebookAuth(self, permissions, onSuccess, onFail);
            });
        }
    }

    facebookLogout(onSuccess, onFail) {
        let self = this;

        if (typeof facebookConnectPlugin === 'undefined' || !self.storageHelper.fetch('FacebookAuth', false)) {
            onFail('Facebook logout is not initialized.');
            return;
        }

        let settings = self.storageHelper.fetch('settings', true);
        if (!settings) {
            onFail('Facebook settings is not initialized.');
            return;
        }

        if (settings.authSocialFacebook.value !== 'enabled') {
            onFail('Facebook is not enabled.');
            return;
        }

        if (!self.config.browser) {
            facebookConnectPlugin.logout(function (logoutResponse) {
                onSuccess(logoutResponse);
            }, function (error) {
                onFail(error);
            });
        }
    }

    private _registerFacebook(parameters) {
        let self = this;
        return this.base.post('auth/social/facebook', parameters, function (response) {
            self.navigatorHelper.log('AuthSocialService-registerFacebook: ' + response);
            self.securityHelper.saveAuth(response.data);
        });
    }

    private _facebookAuth(thisApp, permissions, onSuccess, onFail) {
        let self = this;

        // start to login
        facebookConnectPlugin.login(permissions, function (loginResponse) {
            if (typeof loginResponse !== 'string') {

                // get user
                facebookConnectPlugin.api('/me?fields=first_name,last_name,email,gender', permissions, function (apiResponse) {
                    if (typeof apiResponse.email === 'undefined') {
                        onFail('Unable to register, email is required.');
                        return;
                    }

                    if (!apiResponse.email) {
                        onFail('Unable to register, email is required.');
                        return;
                    }

                    // submit to server
                    thisApp._registerFacebook({
                        social_token: loginResponse.authResponse.accessToken,
                        social_id: apiResponse.id,
                        first_name: apiResponse.first_name,
                        last_name: apiResponse.last_name,
                        email: apiResponse.email,
                    }).subscribe(function (registerResponse) {
                        // Set Facebook Login
                        self.storageHelper.set('FacebookAuth', apiResponse.id, false);
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
