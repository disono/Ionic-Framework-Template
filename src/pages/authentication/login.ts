import {Component} from "@angular/core";
import {NavController, AlertController, LoadingController} from "ionic-angular";
import {WBView} from "../../lib/views";
import {Auth} from "../../providers/auth";
import {DrawerPage} from "../drawer/drawer";
import {RegisterPage} from "./register";
import {ForgotPage} from "./forgot";

/**
 * @description Login
 * @file login.ts
 *
 * @author Archie Disono
 * @url https://github.com/disono/Ionic-Framework-Template
 * @license Apache 2.0
 */

@Component({
  templateUrl: 'login.html'
})
export class LoginPage {
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
      email: '',
      password: ''
    };
  }

  /**
   * Login
   *
   * @param $event
   * @param inputs
   */
  doLogin($event, inputs) {
    $event.preventDefault();
    let thisApp = this;

    // check for values
    if (!inputs.email || !inputs.password) {
      WBView.alert(thisApp.alertCtrl, 'Required Inputs', 'Email and password is required.');
      return;
    }

    // show loading
    let loading = WBView.loading(thisApp.loadingCtrl, 'Authenticating');

    // login
    thisApp.auth.login(inputs).subscribe(function (res) {
      loading.dismiss();

      // data
      let data = res.data;

      // show the main menu
      if (data.role == 'client') {
        thisApp.init();

        // set the main page
        thisApp.nav.setRoot(DrawerPage);
      } else {
        WBView.alert(thisApp.alertCtrl, 'Not Allowed', 'This Email/Username and password is not allowed to login.');
        thisApp.auth.logout();
      }
    }, function (e) {
      loading.dismiss();

      WBView.alert(thisApp.alertCtrl, 'Required Inputs', 'Email/Username and password is required.');
    });
  }

  /**
   * Register
   */
  goToRegister() {
    this.nav.push(RegisterPage);
  }

  /**
   * Forgot password
   */
  goToReset() {
    this.nav.push(ForgotPage);
  }

}
