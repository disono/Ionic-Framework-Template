import {Page, NavController, AlertController, LoadingController} from "ionic-angular";
import {FormBuilder, Validators} from "@angular/common";
import {LoginPage} from "../login/login";
import {Auth} from "../../providers/auth/auth";

/**
 * @author Archie Disono on 2016-05-08.
 * @url http://webmons.com
 * @license Apache 2.0
 */
@Page({
  templateUrl: 'build/pages/register/register.html',
  providers: [
    Auth
  ]
})
export class RegisterPage {
  private formInputs: any;

  constructor(private nav: NavController, public fb: FormBuilder, public auth: Auth,
              public loadingCtrl: LoadingController, public alertCtrl: AlertController) {
    var thisApp = this;
    thisApp.nav = nav;
    thisApp.auth = auth;

    // form values
    thisApp.formInputs = fb.group({
      first_name: ["", Validators.required],
      last_name: ["", Validators.required],
      username: ["", Validators.required],
      phone: ["", Validators.required],
      email: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

  doRegister(event) {
    var thisApp = this;
    var value = thisApp.formInputs.value;
    event.preventDefault();

    // check for values
    if (!value.email || !value.password) {
      thisApp.doAlert('Required Inputs', 'Please fill all the required fields.');
      return;
    }

    // register
    let loading = this.loadingCtrl.create({
      content: 'Creating profile...'
    });
    loading.present();

    thisApp.auth.register({
      parameters: value
    }).subscribe(function (res) {
      loading.dismiss();

      setTimeout(function () {
        alert('Please check your email to verify your registration.');
        thisApp.nav.setRoot(LoginPage);
      }, 300);
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
