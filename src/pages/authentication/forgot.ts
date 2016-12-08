import {Component} from "@angular/core";
import {NavController, AlertController, LoadingController} from "ionic-angular";
import {LoginPage} from "./login";
import {WBView} from "../../lib/views";
import {Auth} from "../../providers/auth";

/**
 * @author Archie Disono
 * @url https://github.com/disono/Ionic-Framework-Template
 * @license Apache 2.0
 */

@Component({
  templateUrl: 'forgot.html'
})
export class ForgotPage {
  inputs: any;

  constructor(public nav: NavController, public alertCtrl: AlertController, public loadingCtrl: LoadingController,
              public auth: Auth) {
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
