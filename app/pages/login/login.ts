import {Page, NavController, LoadingController, AlertController} from "ionic-angular";
import {FormBuilder, Validators} from "@angular/common";
import {MenuPage} from "../menu/menu";
import {RegisterPage} from "../register/register";
import {ForgotPage} from "../forgot/forgot";
import {Auth} from "../../providers/auth/auth";
import {WBHELPER} from "./../../lib/helpers";

/**
 * @author Archie Disono on 2016-05-08.
 * @url http://webmons.com
 * @license Apache 2.0
 */
@Page({
  templateUrl: 'build/pages/login/login.html',
  providers: [
    Auth
  ]
})
export class LoginPage {
  private formInputs: any;

  constructor(private nav: NavController, public alertCtrl: AlertController,
              public loadingCtrl: LoadingController, public auth: Auth, public fb: FormBuilder) {
    var thisApp = this;
    thisApp.nav = nav;
    thisApp.auth = auth;

    // form values
    thisApp.formInputs = fb.group({
      email: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

  doLogin(event) {
    var thisApp = this;
    var value = thisApp.formInputs.value;
    event.preventDefault();

    // check for values
    if (!value.email || !value.password) {
      thisApp.doAlert('Required Inputs', 'User and password is required.');
      return;
    }

    // login
    let loading = this.loadingCtrl.create({
      content: 'Authenticating...'
    });
    loading.present();

    thisApp.auth.login({
      parameters: value
    }).subscribe(function (res) {
      loading.dismiss();

      // save
      res = res.data;
      WBHELPER.setItem('user', res, true);

      if (res.role == 'client') {
        thisApp.nav.setRoot(MenuPage);
      }
    }, function (e) {
      loading.dismiss();
      setTimeout(function () {
        thisApp.doAlert('Error', 'Invalid email or password.');
      }, 300);
    });
  }

  goToRegister() {
    this.nav.push(RegisterPage);
  }

  goToReset() {
    this.nav.push(ForgotPage);
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
