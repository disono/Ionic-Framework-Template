import {Component, OnInit} from '@angular/core';
import {NavController} from "@ionic/angular";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ViewHelper} from "../../../disono/view";
import {AuthService} from "../../../services/auth/auth.service";
import {AuthSocialService} from "../../../services/auth/auth.social.service";
import {NavigatorHelper} from "../../../disono/navigator";

@Component({
    selector: 'app-forgot',
    templateUrl: './forgot.page.html',
    styleUrls: ['./forgot.page.scss'],
})
export class ForgotPage implements OnInit {
    private inputs: FormGroup;
    private submitAttempt: boolean = false;

    private inputErrorMsg = this.setInputErrorMsg();

    constructor(
        private navCtrl: NavController,
        private formBuilder: FormBuilder,
        private viewHelper: ViewHelper,
        private authService: AuthService,
        private authSocialService: AuthSocialService,
        private navigatorHelper: NavigatorHelper
    ) {

    }

    ngOnInit() {
        this.formInputs();
    }

    ionViewDidEnter() {
        this.submitAttempt = false;
        this.inputs.controls['email'].setValue('');
    }

    routeLogin() {
        this.navCtrl.navigateRoot('/auth/login').then(() => {
        });
    }

    private formInputs() {
        this.inputs = this.formBuilder.group({
            email: ['', Validators.required],
        });
    }

    private doForgot() {
        let self = this;
        self.submitAttempt = true;

        // reset validation messages
        self.inputErrorMsg = this.setInputErrorMsg();

        // is form inputs valid
        if (!self.inputs.valid) {
            return;
        }

        self.viewHelper.loadingPresent('Sending Verification...').then(() => {
            self.authService
                .passwordForgot(self.inputs.value.email)
                .subscribe(function (response) {
                    self.viewHelper.loadingDismiss().then(() => {
                        self.submitAttempt = false;
                        self.authenticate();

                        self.navigatorHelper.alert({
                            title: 'Sent Verification',
                            desc: 'Please check your email ' + self.inputs.value.email + ' to reset your password.'
                        });
                    });
                }, function (e) {
                    self.viewHelper.loadingDismiss().then(() => {
                        self.submitAttempt = true;
                        self.navigatorHelper.inputErrors(e, self.inputErrorMsg);
                    });
                });
        });
    }

    private authenticate() {
        this.routeLogin();
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
            email: {msg: 'Please enter a valid email address.', valid: true},
        };
    }

}
