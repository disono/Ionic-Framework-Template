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
import {StorageHelper} from "../../../disono/storage";

@Component({
    selector: 'app-register',
    templateUrl: './register.page.html',
    styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
    private inputs: FormGroup;
    private submitAttempt: boolean = false;
    private settings = this.storageHelper.fetch('settings', true);

    private inputErrorMsg = this.setInputErrorMsg();

    constructor(
        private navCtrl: NavController,
        private formBuilder: FormBuilder,
        private viewHelper: ViewHelper,
        private authService: AuthService,
        private authSocialService: AuthSocialService,
        private navigatorHelper: NavigatorHelper,
        private storageHelper: StorageHelper
    ) {

    }

    ngOnInit() {
        this.formInputs();
    }

    ionViewDidEnter() {
        this.submitAttempt = false;

        this.inputs.controls['first_name'].setValue('');
        this.inputs.controls['last_name'].setValue('');
        this.inputs.controls['email'].setValue('');
        this.inputs.controls['username'].setValue('');
        this.inputs.controls['password'].setValue('');
        this.inputs.controls['password_confirmation'].setValue('');
    }

    routeLogin() {
        this.navCtrl.navigateRoot('/auth/login').then(() => {
        });
    }

    private formInputs() {
        this.inputs = this.formBuilder.group({
            first_name: ['', Validators.required],
            last_name: ['', Validators.required],
            email: ['', Validators.required],
            username: ['', Validators.required],
            password: ['', Validators.required],
            password_confirmation: ['', Validators.required]
        });
    }

    private doRegister() {
        let self = this;
        self.submitAttempt = true;

        // reset validation messages
        self.inputErrorMsg = this.setInputErrorMsg();

        // is form inputs valid
        if (!self.inputs.valid) {
            return;
        }

        self.viewHelper.loadingPresent('Creating your new account...').then(() => {
            self.authService
                .register(self.inputs.value)
                .subscribe(function (response) {
                    self.viewHelper.loadingDismiss().then(() => {
                        self.submitAttempt = false;
                        self.authenticated();
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
        self.viewHelper.loadingPresent('Creating your new account...').then(() => {
            self.authSocialService.facebookLogin(function () {
                self.viewHelper.loadingDismiss().then(() => {
                    self.authenticated();
                });
            }, function () {
                self.viewHelper.loadingDismiss().then(() => {
                });
            });
        });
    }

    private authenticated() {
        this.navCtrl.navigateRoot('/dashboard').then(() => {
        });
    }

    private setInputErrorMsg() {
        return {
            first_name: {msg: 'Please enter a valid first name.', valid: true},
            last_name: {msg: 'Please enter a valid last name.', valid: true},
            email: {msg: 'Please enter a valid email.', valid: true},
            username: {msg: 'Please enter a valid username.', valid: true},
            password: {msg: 'Please enter a valid password.', valid: true},
            password_confirmation: {msg: 'Please enter a valid password.', valid: true}
        };
    }

}
