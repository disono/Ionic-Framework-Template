/**
 * @author          Archie, Disono (webmonsph@gmail.com)
 * @link            https://webmons.com
 * @copyright       Archie Disono - Webmons Development Studio. (webmons.com), 2018
 * @license         Apache, 2.0 https://github.com/disono/Ionic-Framework-Template/blob/master/LICENSE
 */

import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate} from '@angular/router';
import {Configurations} from "../../../environments/config";
import {AuthService} from "./auth.service";
import {NavController} from "@ionic/angular";
import {StorageHelper} from "../../disono/storage";
import {SettingsService} from "../app/settings.service";
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
    constructor(
        private navCtrl: NavController,
        private config: Configurations,
        private authService: AuthService,
        private storageHelper: StorageHelper,
        private settingsService: SettingsService
    ) {

    }

    canActivate(route: ActivatedRouteSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        let self = this;
        let settings = self.storageHelper.fetch('settings', true);

        if (!settings) {
            return new Promise((resolve, reject) => {
                self.settingsService.settings().subscribe((response) => {
                    settings = response.data;
                    self.storageHelper.set('settings', settings, true);
                    resolve(self.resolvePath(self, route, settings));
                }, function (e) {
                    reject(false);
                });
            });
        }

        return self.resolvePath(self, route, settings);
    }

    private resolvePath(self, route, settings) {
        let me = self.authService.user();
        if (!me) {
            self.navCtrl.navigateRoot('/auth/login').then(() => {
            });
            return false;
        }

        if (!me.is_email_verified && settings.emailVerification.value === 'enabled' &&
            route.url.toString() != 'auth,verify,email' && route.url.toString() != 'auth,verify,sms') {
            self.navCtrl.navigateRoot('/auth/verify/email').then(() => {
            });
            return false;
        }

        if (!self.authService.user().is_phone_verified && settings.phoneVerification.value === 'enabled' &&
            route.url.toString() != 'auth,verify,sms' && route.url.toString() != 'auth,verify,email') {
            self.navCtrl.navigateRoot('/auth/verify/sms').then(() => {
            });
            return false;
        }

        return true;
    }

}
