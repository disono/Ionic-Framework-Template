import {Component} from "@angular/core";
import {NavController, AlertController, LoadingController, App} from "ionic-angular";
import {WBView} from "../../lib/views";
import {AuthProvider} from "../../providers/auth-provider";
import {DrawerPage} from "../drawer/drawer";
import {WBSocket} from "../../lib/socket";

declare let moment;
declare let jQ;

/**
 * @author Archie Disono
 * @url https://github.com/disono/Ionic-Framework-Template
 * @license Apache 2.0
 */

@Component({
  templateUrl: 'general.html'
})
export class GeneralPage {
  inputs: any;
  files: any;

  constructor(public nav: NavController, public alertCtrl: AlertController, public loadingCtrl: LoadingController,
              public auth: AuthProvider, public app: App) {
    this.init();
  }

  /**
   * Initialize
   */
  init() {
    let thisApp = this;
    thisApp.authInputs();

    // save the new authenticated user (Sync data)
    let loading = WBView.loading(thisApp.loadingCtrl, 'Syncing...');
    thisApp.auth.sync().subscribe(function (res) {
      loading.dismiss();

      // reinitialize inputs
      thisApp.authInputs();

      // file on change
      jQ(document).off().on('change', '#file', function () {
        thisApp.setFiles(this);
      });
    }, function (error) {
      loading.dismiss();

      WBView.alert(thisApp.alertCtrl, 'Error Syncing', error);
    });
  }

  /**
   * Authenticated inputs
   */
  authInputs() {
    let thisApp = this;
    // authenticated user
    let user = this.auth.user();

    // inputs
    thisApp.inputs = {
      first_name: user.first_name,
      last_name: user.last_name,
      phone: user.phone,
      address: user.address,
      email: user.email,

      birthday: new Date(user.birthday).toISOString(),
      gender: ((user.gender) ? user.gender : 'Male'),
      about: user.about,

      avatar: user.avatar
    };

    // files / avatar
    thisApp.files = null;
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
    if (!inputs.first_name || !inputs.last_name || !inputs.phone || !inputs.email || !inputs.gender) {
      WBView.alert(thisApp.alertCtrl, 'Required Inputs', 'Please check all the required fields.');
      return;
    }

    // format birthday
    if (inputs.birthday) {
      inputs.birthday = moment(new Date(inputs.birthday)).format('MMMM DD YYYY');
    }

    // show loading
    let loading = WBView.loading(thisApp.loadingCtrl, 'Updating profile...');

    // update the profile
    thisApp.auth.update({
      inputs: inputs,
      files: thisApp.files
    }, function (res) {
      setTimeout(function () {
        thisApp.authInputs();
      }, 100);

      loading.dismiss();
    }, function (errors) {
      // errors
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
      this.files = {image: input.files[0]};
    }
  }

  /**
   * Logout
   */
  logout() {
    this.auth.logout();
    this.app.getRootNav().setRoot(DrawerPage);
  }

}
