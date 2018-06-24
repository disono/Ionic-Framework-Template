/**
 * @author          Archie, Disono (webmonsph@gmail.com)
 * @link            https://webmons.com
 * @copyright       Webmons Development Studio. (webmons.com), 2018
 * @license         Apache, 2.0 https://github.com/disono/Ionic-Framework-Template/blob/master/LICENSE
 */

import {Component} from '@angular/core';
import {LoadingController, NavController} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthProvider} from "../../../providers/auth";
import {WBViews} from "../../../libraries/views";
import {WBHelper} from "../../../libraries/helper";
import {LoginPage} from "../login/login";

@Component({
  templateUrl: 'forgot.html'
})
export class RecoverPage {
  private inputs: FormGroup;
  private submitAttempt: boolean = false;

  constructor(public navCtrl: NavController, private formBuilder: FormBuilder,
              private loadingCtrl: LoadingController, private authProvider: AuthProvider) {
    this.formInputs();
  }

  formInputs() {
    this.inputs = this.formBuilder.group({
      email: ['', Validators.required],
    });
  }

  doRecover() {
    this.submitAttempt = true;

    if (!this.inputs.valid) {
      return;
    }

    let thisApp = this;
    let loader = WBViews.loading(this.loadingCtrl, 'Submitting...');
    this.authProvider
      .passwordForgot(this.inputs.value)
      .subscribe(function (response) {
        loader.dismiss();
        thisApp.navCtrl.setRoot(LoginPage);
      }, function (e) {
        loader.dismiss();
        WBHelper.alert({
          title: 'Validation Errors',
          desc: WBHelper.getErrors(e)
        });
      });
  }

  cancel() {
    this.navCtrl.pop();
  }
}
