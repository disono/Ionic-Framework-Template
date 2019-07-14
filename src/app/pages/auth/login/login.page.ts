/**
 * @author          Archie, Disono (webmonsph@gmail.com)
 * @link            https://webmons.com
 * @copyright       Archie Disono - Webmons Development Studio. (webmons.com), 2018
 * @license         Apache, 2.0 https://github.com/disono/Ionic-Framework-Template/blob/master/LICENSE
 */

import {Component, OnInit} from '@angular/core';
import {NavController} from '@ionic/angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ViewHelper} from "../../../disono/view";
import {AuthService} from "../../../services/auth/auth.service";
import {NavigatorHelper} from "../../../disono/navigator";
import {AuthSocialService} from "../../../services/auth/auth.social.service";
import {SettingsService} from "../../../services/app/settings.service";
import {StorageHelper} from "../../../disono/storage";

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
    private inputs: FormGroup;
    private submitAttempt: boolean = false;
    private settings = null;

    private inputErrorMsg = this.setInputErrorMsg();

    constructor(
        private navCtrl: NavController,
        private formBuilder: FormBuilder,
        private viewHelper: ViewHelper,
        private authService: AuthService,
        private authSocialService: AuthSocialService,
        private settingService: SettingsService,
        private navigatorHelper: NavigatorHelper,
        private storageHelper: StorageHelper
    ) {

    }

    ngOnInit() {
        this.formInputs();
    }

    ionViewDidEnter() {
        this.submitAttempt = false;
        this.inputs.controls['username'].setValue('');
        this.inputs.controls['password'].setValue('');
        this.fetchSettings();
    }

    private formInputs() {
        this.inputs = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required],
        });
    }

    private fetchSettings() {
        let self = this;

        let settings = self.storageHelper.fetch('settings', true);
        if (settings) {
            self.settings = settings;
            return;
        }

        self.viewHelper.loadingPresent('Syncing...').then(() => {
            self.settingService.settings().subscribe((response) => {
                self.viewHelper.loadingDismiss().then(() => {
                    self.settings = response.data;
                    self.storageHelper.set('settings', self.settings, true);
                });
            }, (e) => {
                self.viewHelper.loadingDismiss().then(() => {
                    self.settings = null;
                });
            });
        });
    }

    private doLogin() {
        let self = this;
        self.submitAttempt = true;

        // reset validation messages
        self.inputErrorMsg = this.setInputErrorMsg();

        // is form inputs valid
        if (!self.inputs.valid) {
            return;
        }

        self.viewHelper.loadingPresent('Authenticating...').then(() => {
            self.authService
                .login(self.inputs.value)
                .subscribe(function (response) {
                    self.viewHelper.loadingDismiss().then(() => {
                        self.submitAttempt = false;
                        self.authenticate();
                    });
                }, function (e) {
                    self.viewHelper.loadingDismiss().then(() => {
                        self.submitAttempt = true;
                        self.navigatorHelper.inputErrors(e, self.inputErrorMsg);
                    });
                });
        });
    }

    private doFacebookLogin() {
        let self = this;
        self.viewHelper.loadingPresent('Authenticating...').then(() => {
            self.authSocialService.facebookLogin(function () {
                self.viewHelper.loadingDismiss().then(() => {
                    self.authenticate();
                });
            }, function () {
                self.viewHelper.loadingDismiss().then(() => {

                });
            });
        });
    }

    private authenticate() {
        this.navCtrl.navigateRoot('/dashboard').then(() => {
        });
    }

    private routeRegister() {
        this.navCtrl.navigateRoot('/auth/register').then(() => {
        });
    }

    private routeForgotPassword() {
        this.navCtrl.navigateRoot('/auth/forgot').then(() => {
        });
    }

    private setInputErrorMsg() {
        return {
            username: {msg: 'Please enter a valid username.', valid: true},
            password: {msg: 'Please enter a valid password.', valid: true}
        };
    }

}
