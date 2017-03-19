import {Component} from "@angular/core";
import {NavController, AlertController, LoadingController, App, NavParams, ViewController} from "ionic-angular";
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
      thisApp._checkRole(response);
    }, function (e) {
      loading.dismiss();

      WBView.alert(thisApp.alertCtrl, 'Invalid', e);
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

        thisApp._checkRole(data);
      }
    }, 300);
  }

  /**
   * Check role
   *
   * @param response
   * @private
   */
  _checkRole(response) {
    let thisApp = this;

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
      this.params.get('nav').setRoot(RegisterPage);
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
