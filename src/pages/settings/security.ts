import {Component} from "@angular/core";
import {NavController, AlertController, LoadingController, App} from "ionic-angular";
import {WBView} from "../../lib/views";
import {WBHELPER} from "../../lib/helper";
import {Auth} from "../../providers/auth";

/**
 * @author Archie Disono
 * @url https://github.com/disono/Ionic-Framework-Template
 * @license Apache 2.0
 */

@Component({
  selector: 'page-security',
  templateUrl: 'security.html'
})
export class SecurityPage {
  inputs: any;

  constructor(public nav: NavController, public alertCtrl: AlertController, public loadingCtrl: LoadingController,
              public auth: Auth, public app: App) {
    this.init();
  }

  /**
   * Initialize
   */
  init() {
    let user = this.auth.user();

    // inputs
    this.inputs = {
      email: user.email,
      current_password: '',
      password: '',

      authenticated_id: user.id
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
    if (!inputs.current_password || !inputs.password || !inputs.email) {
      WBView.alert(thisApp.alertCtrl, 'Required Inputs', 'Please check all the required fields.');
      return;
    }

    // show loading
    let loading = WBView.loading(thisApp.loadingCtrl, 'Updating security...');

    // update security
    thisApp.auth.security({
      parameters: inputs
    }).subscribe(function (res) {
      loading.dismiss();

      // save
      res = res.data;
      WBHELPER.setItem('user', res, true);
    }, function (e) {
      loading.dismiss();
    });
  }

}
