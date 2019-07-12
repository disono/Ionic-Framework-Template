import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {AuthService} from "../../../services/auth/auth.service";
import {Events, NavController} from "@ionic/angular";
import {NavigatorHelper} from "../../../disono/navigator";
import {StorageHelper} from "../../../disono/storage";
import {ViewHelper} from "../../../disono/view";
import * as moment from "moment";

@Component({
    selector: 'app-sms',
    templateUrl: './sms.page.html',
    styleUrls: ['./sms.page.scss'],
})
export class SMSPage implements OnInit {
    private timer = null;
    private showResendBtn = false;
    private currentTime = '00:00';
    private me = this.authService.user();
    private inputVerifyCode = null;

    constructor(
        private authService: AuthService, private navCtrl: NavController, private events: Events,
        private navigatorHelper: NavigatorHelper, private storageHelper: StorageHelper,
        private viewHelper: ViewHelper, private changeRef: ChangeDetectorRef
    ) {

    }

    ngOnInit() {

    }

    ionViewDidEnter() {
        let self = this;
        self.inputVerifyCode = null;
        self.currentTime = '00:00';
        self.showResendBtn = false;
        self.timer = null;
        self.me = self.authService.user();

        let expiration = self.hasExpiration(self, false);
        if (expiration.valid) {
            self.showResendBtn = false;
            self.setTimer(expiration.time, self);
            return;
        }

        self.showResendBtn = true;
    }

    private verifyAction(code) {
        let self = this;

        if (!code) {
            return;
        }

        self.viewHelper.loadingPresent('Verifying...').then(() => {
            self.authService
                .verifyPhone(self.authService.user().phone, code)
                .subscribe((response) => {
                    self.viewHelper.loadingDismiss().then(() => {
                        self.continueAction();
                    });
                }, (e) => {
                    self.viewHelper.loadingDismiss().then(() => {
                        self.navigatorHelper.alert({
                            title: 'Verification Failed',
                            desc: self.navigatorHelper.failed(e)
                        });
                    });
                });
        });
    }

    private resendCodeAction() {
        let self = this;

        let expiration = self.hasExpiration(self);
        if (expiration.valid) {
            self.showResendBtn = false;
            self.setTimer(expiration.time, self);
            return;
        }

        self.viewHelper.loadingPresent('Resending verification URL...').then(() => {
            self.authService
                .reSendVerify('phone')
                .subscribe((response) => {
                    self.viewHelper.loadingDismiss().then(() => {
                        self.showResendBtn = false;
                        self.setTimer(expiration.time, self);

                        self.navigatorHelper.alert({
                            title: 'Code Sent',
                            desc: 'We already sent you the code to ' + self.authService.user().phone + '.'
                        });
                    });
                }, function (e) {
                    self.viewHelper.loadingDismiss().then(() => {
                        self.navigatorHelper.alert({
                            title: 'Resend Failed',
                            desc: self.navigatorHelper.failed(e)
                        });
                    });
                });
        });
    }

    private continueAction() {
        let self = this;

        self.authService.sync().subscribe((res) => {
            self.clearTimer();
            self.storageHelper.set('settings', res.data.setting, true);
            self.navCtrl.navigateRoot('/dashboard').then(() => {
            });
        }, (e) => {
            self.navigatorHelper.alert({
                title: 'Verification Failed',
                desc: self.navigatorHelper.failed(e)
            });
        });
    }

    private logoutAction() {
        this.clearTimer();
        this.events.publish('onLogout', true);
    }

    private hasExpiration(self, create = true) {
        let hasExpiration = true;

        let expiration = self.storageHelper.fetch('phoneResendExpiration');
        if (!expiration) {
            expiration = moment().add('5', 'm').unix();
            hasExpiration = false;

            if (create) {
                self.storageHelper.set('phoneResendExpiration', expiration);
            }
        }

        return {valid: hasExpiration, time: expiration};
    }

    private setTimer(expiration, self) {
        self.clearTimer();

        let exp = moment.unix(expiration).format("M/D/YYYY H:mm");
        let end = moment(new Date(exp));

        self.timer = setInterval(() => {
            let now = moment(new Date());
            let duration = moment.duration(end.diff(now));
            self.currentTime = duration.minutes() + ":" + ((duration.seconds() >= 10) ? duration.seconds() : '0' + duration.seconds());
            self.changeRef.detectChanges();

            if (expiration < moment().unix() || duration.seconds() < 0) {
                self.showResendBtn = true;
                self.storageHelper.remove('phoneResendExpiration');
                self.clearTimer();
            }
        }, 1000);
    }

    private clearTimer() {
        let self = this;
        if (self.timer) {
            clearInterval(self.timer);
        }
    }

}
