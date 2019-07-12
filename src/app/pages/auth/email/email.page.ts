import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {AuthService} from "../../../services/auth/auth.service";
import {NavigatorHelper} from "../../../disono/navigator";
import * as moment from "moment";
import {StorageHelper} from "../../../disono/storage";
import {Events, NavController} from "@ionic/angular";
import {ViewHelper} from "../../../disono/view";

@Component({
    selector: 'app-email',
    templateUrl: './email.page.html',
    styleUrls: ['./email.page.scss'],
})
export class EmailPage implements OnInit {
    private timer = null;
    private showResendBtn = false;
    private currentTime = '00:00';
    private me = this.authService.user();

    constructor(private authService: AuthService, private navCtrl: NavController, private events: Events,
                private navigatorHelper: NavigatorHelper, private storageHelper: StorageHelper,
                private viewHelper: ViewHelper, private changeRef: ChangeDetectorRef) {

    }

    ngOnInit() {

    }

    ionViewDidEnter() {
        let self = this;

        let expiration = self.hasExpiration(self, false);
        if (expiration.valid) {
            self.showResendBtn = false;
            self.setTimer(expiration.time, self);
            return;
        }

        self.showResendBtn = true;
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
                .reSendVerify('email')
                .subscribe((response) => {
                    self.viewHelper.loadingDismiss().then(() => {
                        self.showResendBtn = false;
                        self.setTimer(expiration.time, self);

                        self.navigatorHelper.alert({
                            title: 'Code Sent',
                            desc: 'Please check your email to verify your account.'
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

        let expiration = self.storageHelper.fetch('emailResendExpiration');
        if (!expiration) {
            expiration = moment().add('5', 'm').unix();
            hasExpiration = false;

            if (create) {
                self.storageHelper.set('emailResendExpiration', expiration);
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
                self.storageHelper.remove('emailResendExpiration');
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
