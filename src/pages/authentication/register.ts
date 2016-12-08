import {Component} from "@angular/core";
import {NavController, AlertController, LoadingController} from "ionic-angular";
import {Auth} from "../../providers/auth";
import {WBView} from "../../lib/views";
import {LoginPage} from "./login";

/**
 * @author Archie Disono
 * @url https://github.com/disono/Ionic-Framework-Template
 * @license Apache 2.0
 */

@Component({
  templateUrl: 'register.html'
})
export class RegisterPage {
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
      first_name: '',
      last_name: '',
      phone: '',
      email: '',
      username: '',
      password: ''
    };
  }

  /**
   * Do register
   *
   * @param $event
   * @param inputs
   */
  doRegister($event, inputs) {
    $event.preventDefault();
    let thisApp = this;

    // check for values
    if (!inputs.email || !inputs.password) {
      WBView.alert(thisApp.alertCtrl, 'Required Inputs', 'Email is required.');
      return;
    }

    // show loading
    let loading = WBView.loading(thisApp.loadingCtrl, 'Creating profile...');

    // register
    thisApp.auth.register(inputs).subscribe(function (res) {
      loading.dismiss();

      WBView.alert(thisApp.alertCtrl, 'Registration successful', 'Please check your email to verify your registration.');
      thisApp.nav.setRoot(LoginPage);
    }, function (e) {
      loading.dismiss();
    });
  }

}
