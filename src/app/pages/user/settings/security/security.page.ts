import {Component, OnInit} from '@angular/core';
import {NavController} from '@ionic/angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ViewHelper} from "../../../../disono/view";
import {AuthService} from "../../../../services/auth/auth.service";
import {NavigatorHelper} from "../../../../disono/navigator";
import {AuthSocialService} from "../../../../services/auth/auth.social.service";
import {SettingsService} from "../../../../services/app/settings.service";
import {StorageHelper} from "../../../../disono/storage";
import {UserService} from "../../../../services/auth/user.service";

@Component({
    selector: 'app-security',
    templateUrl: './security.page.html',
    styleUrls: ['./security.page.scss'],
})
export class SecurityPage implements OnInit {
    private inputs: FormGroup;
    private submitAttempt: boolean = false;
    private settings = null;
    private me = this.authService.user();

    private inputErrorMsg = this.setInputErrorMsg();

    constructor(
        private navCtrl: NavController,
        private formBuilder: FormBuilder,
        private viewHelper: ViewHelper,
        private authService: AuthService,
        private userService: UserService,
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
        this.settings = null;
        this.submitAttempt = false;
        this.me = this.authService.user();
        this.inputErrorMsg = this.setInputErrorMsg();
        this.fetchSettings();
    }

    private formInputs() {
        this.inputs = this.formBuilder.group({
            email: [this.me.email, Validators.required],
            current_password: ['', Validators.required],
            password: [''],
            password_confirmation: [''],
        });
    }

    private fetchSettings() {
        let self = this;

        self.viewHelper.loadingPresent('Syncing...').then(() => {
            self.settingService.settings().subscribe((response) => {
                self.viewHelper.loadingDismiss().then(() => {
                    self.settings = response.data;
                    self.storageHelper.set('settings', self.settings, true);
                });
            }, (e) => {
                self.viewHelper.loadingDismiss().then(() => {

                });
            });
        });
    }

    private doSave() {
        let self = this;
        self.submitAttempt = true;

        // reset validation messages
        self.inputErrorMsg = this.setInputErrorMsg();

        // is form inputs valid
        if (!self.inputs.valid) {
            return;
        }

        self.viewHelper.loadingPresent('Saving...').then(() => {
            self.userService
                .updateSecurity(self.inputs.value)
                .subscribe(function (response) {
                    self.viewHelper.loadingDismiss().then(() => {
                        self.submitAttempt = false;
                    });
                }, function (e) {
                    self.viewHelper.loadingDismiss().then(() => {
                        self.submitAttempt = true;
                        self.navigatorHelper.inputErrors(e, self.inputErrorMsg);
                    });
                });
        });
    }

    private setInputErrorMsg() {
        return {
            email: {msg: 'Please enter a valid email.', valid: true},
            current_password: {msg: 'Please enter a valid current password.', valid: true},
            password: {msg: 'Please enter a valid password.', valid: true},
            password_confirmation: {msg: 'Please enter a valid confirmation password.', valid: true}
        };
    }

}
