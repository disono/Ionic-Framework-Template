import {NavController, AlertController, LoadingController, App} from "ionic-angular";
import {FormBuilder, Validators} from "@angular/common";
import {Component} from "@angular/core";
import {Auth} from "../../providers/auth/auth";
import {LoginPage} from "../login/login";
import * as jQ from "jquery";

/**
 * @author Archie Disono on 2016-05-08.
 * @url http://webmons.com
 * @license Apache 2.0
 */

/*
 Generated class for the SettingsPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  templateUrl: 'build/pages/settings/settings.html',
  providers: [
    Auth
  ]
})
export class SettingsPage {
  formInputs: any;
  inputs: any;
  image: any;

  constructor(private nav: NavController, public fb: FormBuilder, public auth: Auth,
              public loadingCtrl: LoadingController, public alertCtrl: AlertController, private app: App) {
    var thisApp = this;
    thisApp.nav = nav;
    thisApp.auth = auth;
    var user = thisApp.auth.user();

    // form values
    this.inputs = user;
    thisApp.formInputs = fb.group({
      first_name: [user.first_name, Validators.required],
      last_name: [user.last_name, Validators.required],
      phone: [user.phone, Validators.required],
      address: [user.address, Validators.required],
      email: [user.email, Validators.required],
      image: [''],
      id: [user.id],
      authenticated_id: [user.id]
    });

    jQ(document).off().on('change', '#file', function () {
      thisApp.setFiles(this);
    });
  }

  doSave(event) {
    var thisApp = this;
    var value = thisApp.formInputs.value;
    event.preventDefault();

    // check for values
    if (!value.first_name || !value.last_name || !value.phone || !value.email) {
      thisApp.doAlert('Required Inputs', 'Please fill all the required fields.');
      return;
    }

    // save changes
    let loading = this.loadingCtrl.create({
      content: 'Updating profile...'
    });
    loading.present();

    if (this.image) {
      value.image = this.image;
    }

    thisApp.auth.update({
      parameters: value
    }, function (xhr) {
      loading.dismiss();
    });
  }

  openFileDialog() {
    jQ('#file').off().click();
  }

  setFiles(input) {
    if (input.files && input.files[0]) {
      this.image = input;
    }
  }

  logout() {
    this.auth.logout();
    this.app.getRootNav().setRoot(LoginPage);
  }

  doAlert(title, message) {
    let alert = this.alertCtrl.create({
      title: title,
      message: message,
      buttons: ['Ok']
    });
    alert.present();
  }
}
