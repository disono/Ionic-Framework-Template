import {NavController, AlertController, LoadingController} from "ionic-angular";
import {FormBuilder, Validators} from "@angular/common";
import {Component} from "@angular/core";
import {Auth} from "../../providers/auth/auth";
import {WBHELPER} from "./../../lib/helpers";

@Component({
  templateUrl: 'build/pages/settings/security.html',
  providers: [
    Auth
  ]
})
export class SecurityPage {
  formInputs: any;
  inputs: any;

  constructor(private nav: NavController, public fb: FormBuilder, public auth: Auth,
              public loadingCtrl: LoadingController, public alertCtrl: AlertController) {
    var thisApp = this;
    thisApp.nav = nav;
    thisApp.auth = auth;
    var user = thisApp.auth.user();

    // form values
    this.inputs = user;
    thisApp.formInputs = fb.group({
      email: [user.email, Validators.required],
      current_password: ['', Validators.required],
      password: ['', Validators.required],
      authenticated_id: [user.id]
    });
  }

  doSave(event) {
    var thisApp = this;
    var value = thisApp.formInputs.value;
    event.preventDefault();

    // check for values
    if (!value.current_password || !value.password || !value.email) {
      thisApp.doAlert('Required Inputs', 'Please fill all the required fields.');
      return;
    }

    // save changes
    let loading = this.loadingCtrl.create({
      content: 'Updating security...'
    });
    loading.present();

    thisApp.auth.security({
      parameters: value
    }).subscribe(function (res) {
      loading.dismiss();

      // save
      res = res.data;
      WBHELPER.setItem('user', res, true);
    }, function (e) {
      loading.dismiss();
    });
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
