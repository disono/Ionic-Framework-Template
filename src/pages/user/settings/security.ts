/**
 * @author          Archie, Disono (webmonsph@gmail.com)
 * @link            https://webmons.com
 * @copyright       Webmons Development Studio. (webmons.com), 2018
 * @license         Apache, 2.0 https://github.com/disono/Ionic-Framework-Template/blob/master/LICENSE
 */

import {Component} from '@angular/core';
import {LoadingController, NavController} from 'ionic-angular';
import {AuthProvider} from "../../../providers/auth";
import {WBHelper} from "../../../libraries/helper";
import {WBViews} from "../../../libraries/views";
import {UserProvider} from "../../../providers/user";

@Component({
  templateUrl: 'security.html'
})
export class SecuritySettingsPage {
  inputs: any;

  constructor(public navCtrl: NavController, private authProvider: AuthProvider, private userProvider: UserProvider,
              private loadingCtrl: LoadingController) {
    this.init();
  }

  /**
   * Initialize
   */
  init() {
    let user = this.authProvider.user();

    // inputs
    this.inputs = {
      email: user.email,
      current_password: '',
      password: '',
      password_confirmation: ''
    }
  }

  /**
   * Save the changes
   *
   * @param $event
   * @param inputs
   */
  doSave($event, inputs) {
    $event.preventDefault();
    let thisApp = this;

    // check for values
    if (!inputs.current_password || !inputs.email) {
      WBHelper.alert({
        title: 'Required Inputs',
        desc: 'Please check all the required fields.'
      });

      return;
    }

    // show loading
    let loading = WBViews.loading(thisApp.loadingCtrl, 'Updating security...');

    // update security
    thisApp.userProvider.updateSecurity(inputs)
      .subscribe(function (res) {
        loading.dismiss();
      }, function (e) {
        loading.dismiss();
      });
  }

}
