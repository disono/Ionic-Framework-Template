import {Page, NavController, LoadingController, AlertController} from "ionic-angular";
import {FormBuilder, Validators} from "@angular/common";
import {LoginPage} from "../login/login";
import {Auth} from "../../providers/auth/auth";

/**
 * @author Archie Disono on 2016-05-08.
 * @url http://webmons.com
 * @license Apache 2.0
 */
@Page({
  templateUrl: 'build/pages/forgot/forgot.html',
  providers: [
    Auth
  ]
})
export class ForgotPage {
  formInputs: any;

  constructor(private nav: NavController, public fb: FormBuilder, public auth: Auth,
              public loadingCtrl: LoadingController, public alertCtrl: AlertController) {
    var thisApp = this;
    thisApp.nav = nav;
    thisApp.auth = auth;

    // form values
    thisApp.formInputs = fb.group({
      email: ["", Validators.required]
    });
  }

  doReset(event) {
    var thisApp = this;
    var value = thisApp.formInputs.value;

    // check for values
    if (!value.email) {
      thisApp.doAlert('Required Inputs', 'Please fill all the required fields.');
      return;
    }

    // register
    let loading = this.loadingCtrl.create({
      content: 'Sending request...'
    });
    loading.present();

    thisApp.auth.forgot({
      parameters: value
    }).subscribe(function (res) {
      loading.dismiss();
      thisApp.nav.setRoot(LoginPage);
    }, function (e) {
      loading.dismiss();
    });
  }

  goToLogin() {
    this.nav.push(LoginPage);
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
