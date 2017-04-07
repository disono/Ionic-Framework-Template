import {Component} from "@angular/core";
import {AlertController, App, LoadingController, NavController, NavParams, ViewController} from "ionic-angular";
import {WBView} from "../../lib/views";
import {AuthProvider} from "../../providers/auth-provider";
import {RegisterPage} from "./register";
import {ForgotPage} from "./forgot";
import {WBSocket} from "../../lib/socket";
import {WBConfig} from "../../lib/config";
import {DrawerPage} from "../drawer/drawer";

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
  wb_config = WBConfig;

  constructor(public nav: NavController, public app: App, public alertCtrl: AlertController, public loadingCtrl: LoadingController,
              public auth: AuthProvider, public params: NavParams, public viewCtrl: ViewController) {
    WBConfig.thisApp = this;

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
    // $event.preventDefault();
    let thisApp = this;

    // check for values
    if (!inputs.email || !inputs.password) {
      WBView.alert(thisApp.alertCtrl, 'Required Inputs', 'Email and password is required.');
      return;
    }

    // show loading
    let loading = WBView.loading(thisApp.loadingCtrl, 'Authenticating');

    // login
    thisApp.auth.login(inputs).subscribe(function (response) {
      loading.dismiss();

      // check the users role
      thisApp._checkRole(response, thisApp);
    }, function (e) {
      loading.dismiss();

      WBView.alert(thisApp.alertCtrl, 'Invalid', e);
    });
  }

  /**
   * Facebook authentication
   */
  doFacebook() {
    let thisApp = this;

    // show loading
    let loading = WBView.loading(thisApp.loadingCtrl, 'Creating profile...');

    // check is authenticated
    thisApp.auth.facebook(function (response) {
      loading.dismiss();

      // check the users role
      WBConfig.thisApp._checkRole(response, WBConfig.thisApp);
    }, function (error) {
      loading.dismiss();

      WBView.alert(thisApp.alertCtrl, 'Registration unsuccessful', error);
    }, function () {
      loading.dismiss();
    });
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

      // set the default call page
      LoginPage.setPageType(thisApp);
    } else {
      WBView.alert(thisApp.alertCtrl, 'Not Allowed', 'This Email/Username and password is not allowed to login.');
      thisApp.auth.logout();
    }
  }

  /**
   * Call the default page to call on successful login
   *
   * @param thisApp
   */
  static setPageType(thisApp) {
    // emit to sync data
    WBSocket.emitter.emitEvent('sync_application');

    // set the main page or back to previous page (modal)
    if (thisApp.params.get('return_page') == 'modal') {
      thisApp.viewCtrl.dismiss();
    } else if (thisApp.params.get('return_page') == 'page') {
      thisApp.nav.pop();
    } else {
      thisApp.nav.setRoot(DrawerPage);
    }
  }

  /**
   * Register
   */
  goToRegister() {
    if (this.params.get('return_page') == 'modal') {
      this.viewCtrl.dismiss();

      this.params.get('nav').push(RegisterPage, {
        return_page: 'page'
      });
    } else {
      this.nav.push(RegisterPage);
    }
  }

  /**
   * Forgot password
   */
  goToReset() {
    this.nav.push(ForgotPage);
  }

  /**
   * Close the modal
   */
  closeModal() {
    this.viewCtrl.dismiss();
  }

}
