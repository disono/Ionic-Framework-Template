/**
 * @author Archie, Disono (webmonsph@gmail.com)
 * @git https://github.com/disono/Ionic-Framework-Template
 * @copyright Webmons Development Studio. (webmons.com), 2016-2017
 * @license Apache, 2.0 https://github.com/disono/Ionic-Framework-Template/blob/master/LICENSE
 */

import {Component} from "@angular/core";
import {AlertController, LoadingController, NavController} from "ionic-angular";
import {LoginPage} from "./login";
import {WBView} from "../../lib/views";
import {AuthProvider} from "../../providers/auth-provider";

@Component({
  templateUrl: 'forgot.html'
})
export class ForgotPage {
  inputs: any;

  constructor(public nav: NavController, public alertCtrl: AlertController, public loadingCtrl: LoadingController,
              public auth: AuthProvider) {
    this.init();
  }

  /**
   * Initialize
   */
  init() {
    this.inputs = {
      email: ''
    };
  }

  /**
   * Do reset
   *
   * @param $event
   * @param inputs
   */
  doReset($event, inputs) {
    $event.preventDefault();
    let thisApp = this;

    // check for values
    if (!inputs.email) {
      WBView.alert(thisApp.alertCtrl, 'Required Inputs', 'Email is required.');
      return;
    }

    // show loading
    let loading = WBView.loading(thisApp.loadingCtrl, 'Send request...');

    // send to server
    thisApp.auth.forgot(inputs).subscribe(function (res) {
      loading.dismiss();
      thisApp.nav.setRoot(LoginPage);
    }, function (e) {
      loading.dismiss();
    });
  }

}
