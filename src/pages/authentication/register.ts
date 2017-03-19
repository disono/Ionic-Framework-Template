import {Component} from "@angular/core";
import {NavController, AlertController, LoadingController} from "ionic-angular";
import {AuthProvider} from "../../providers/auth-provider";
import {WBView} from "../../lib/views";
import {LoginPage} from "./login";
import {DrawerPage} from "../drawer/drawer";
import {WBSocket} from "../../lib/socket";
import {WBConfig} from "../../lib/config";

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
  wb_config = WBConfig;

  constructor(public nav: NavController, public alertCtrl: AlertController, public loadingCtrl: LoadingController,
              public auth: AuthProvider) {
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
      thisApp.nav.setRoot(DrawerPage);
    }, function (e) {
      loading.dismiss();
    });
  }

  /**
   * Facebook authentication
   */
  isAuthenticated = null;
  intervalAuth = null;

  doFacebook() {
    let thisApp = this;

    // show loading
    let loading = WBView.loading(thisApp.loadingCtrl, 'Creating profile...');

    // check is authenticated
    thisApp._checkIsAuth(thisApp);

    thisApp.auth.facebook(function (response) {
      loading.dismiss();

      // check the users role
      thisApp.isAuthenticated = response;
    }, function (error) {
      loading.dismiss();

      WBView.alert(thisApp.alertCtrl, 'Registration unsuccessful', error);
    }, function () {
      loading.dismiss();
    });
  }

  /**
   * Check if authenticated
   *
   * @param thisApp
   * @private
   */
  _checkIsAuth(thisApp) {
    thisApp.intervalAuth = setInterval(function () {
      if (thisApp.isAuthenticated) {
        let data = thisApp.isAuthenticated;
        clearInterval(thisApp.intervalAuth);
        thisApp.isAuthenticated = null;

        thisApp._checkRole(data, thisApp);
      }
    }, 300);
  }

  /**
   * Check role
   *
   * @param response
   * @param thisApp
   * @private
   */
  _checkRole(response, thisApp) {
    // data
    let data = response.data;

    // show the main menu
    if (data.role == 'client') {
      thisApp.init();

      // emit to sync data
      WBSocket.emitter.emitEvent('sync_application');

      // set the main page
      thisApp.nav.setRoot(DrawerPage);
    } else {
      WBView.alert(thisApp.alertCtrl, 'Not Allowed', 'This Email/Username and password is not allowed to login.');
      thisApp.auth.logout();
    }
  }

  /**
   * Cancel registration drawer page
   */
  cancel() {
    this.nav.setRoot(DrawerPage);
  }

}
