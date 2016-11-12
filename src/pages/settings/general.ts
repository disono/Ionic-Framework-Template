import {Component} from "@angular/core";
import {NavController, AlertController, LoadingController, App} from "ionic-angular";
import {WBView} from "../../lib/views";
import {Auth} from "../../providers/auth";
import {LoginPage} from "../authentication/login";
import * as jQ from "jquery";

/**
 * @author Archie Disono
 * @url https://github.com/disono/Ionic-Framework-Template
 * @license Apache 2.0
 */

@Component({
  selector: 'page-general',
  templateUrl: 'general.html'
})
export class GeneralPage {
  private inputs: any;

  constructor(public nav: NavController, public alertCtrl: AlertController, public loadingCtrl: LoadingController,
              public auth: Auth, public app: App) {
    this.init();
  }

  /**
   * Initialize
   */
  init() {
    var user = this.auth.user();

    // inputs
    this.inputs = {
      first_name: user.first_name,
      last_name: user.last_name,
      phone: user.phone,
      address: user.address,
      email: user.email,

      image: null,
      avatar: user.avatar,

      authenticated_id: user.id
    };
  }

  /**
   * Save the changes
   *
   * @param $event
   * @param inputs
   */
  doSave($event, inputs) {
    $event.preventDefault();
    var thisApp = this;

    // check for values
    if (!inputs.first_name || !inputs.last_name || !inputs.phone || !inputs.email) {
      WBView.alert(thisApp.alertCtrl, 'Required Inputs', 'Please check all the required fields.');
      return;
    }

    // show loading
    let loading = WBView.loading(thisApp.loadingCtrl, 'Updating profile...');

    // update the profile
    thisApp.auth.update({
      parameters: inputs
    }, function (xhr) {
      if (xhr.success) {
        thisApp.inputs = xhr.data;
      }

      loading.dismiss();
    });
  }

  /**
   * Open the dialog for images
   */
  openFileDialog() {
    jQ('#file').off().click();
  }

  /**
   * Set the image file on change
   *
   * @param input
   */
  setFiles(input) {
    if (input.files && input.files[0]) {
      this.inputs.image = input;
    }
  }

  /**
   * Logout
   */
  logout() {
    this.auth.logout();
    this.app.getRootNav().setRoot(LoginPage);
  }

}
