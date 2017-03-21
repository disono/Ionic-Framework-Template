import {Component} from "@angular/core";
import {NavController, AlertController, LoadingController, NavParams} from "ionic-angular";
import {AuthProvider} from "../../providers/auth-provider";
import {WBView} from "../../lib/views";
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
              public auth: AuthProvider, public params: NavParams) {
    WBConfig.thisApp = this;

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
  doFacebook() {
    let thisApp = this;

    // show loading
    let loading = WBView.loading(thisApp.loadingCtrl, 'Creating profile...');

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

      // emit to sync data
      WBSocket.emitter.emitEvent('sync_application');

      // set the main page
      if (thisApp.params.get('return_page')) {
        WBConfig.thisApp.nav.pop();
      } else {
        thisApp.nav.setRoot(DrawerPage);
      }
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
