/**
 * @author          Archie, Disono (webmonsph@gmail.com)
 * @link            https://webmons.com
 * @copyright       Webmons Development Studio. (webmons.com), 2018
 * @license         Apache, 2.0 https://github.com/disono/Ionic-Framework-Template/blob/master/LICENSE
 */

import {Component} from '@angular/core';
import {LoadingController, NavController} from 'ionic-angular';
import {AuthProvider} from "../../../providers/auth";
import {LoginPage} from "../login/login";
import {WBHelper} from "../../../libraries/helper";
import {WBViews} from "../../../libraries/views";

@Component({
  templateUrl: 'verify.html'
})
export class VerifyPage {
  private auth = this.authProvider.user();
  private timer = 900000;
  private showResendEmailButton = false;

  constructor(public navCtrl: NavController, private authProvider: AuthProvider, private loadingCtrl: LoadingController) {

  }

  ionViewDidEnter() {
    this.resendTimer();
  }

  resendTimer() {
    let thisApp = this;
    thisApp.showResendEmailButton = false;
    setTimeout(function () {
      thisApp.showResendEmailButton = true;
    }, thisApp.timer);
  }

  logout() {
    let thisApp = this;
    thisApp.authProvider.logout()
      .subscribe(function (response) {
        thisApp.navCtrl.setRoot(LoginPage);
      }, function (e) {

      });
  }

  resend(type, value) {
    let thisApp = this;
    let loader = WBViews.loading(thisApp.loadingCtrl, 'Resending...');
    thisApp.authProvider.resendVerify(type, value)
      .subscribe(function (response) {
        loader.dismiss();
        thisApp.resendTimer();
      }, function (e) {
        loader.dismiss();
        WBHelper.alert({
          title: 'Validation Errors',
          desc: WBHelper.getErrors(e)
        });
      });
  }

}
