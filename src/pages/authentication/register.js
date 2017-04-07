"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
var core_1 = require("@angular/core");
var views_1 = require("../../lib/views");
var login_1 = require("./login");
/**
 * @author Archie Disono
 * @url https://github.com/disono/Ionic-Framework-Template
 * @license Apache 2.0
 */
var RegisterPage = (function () {
  function RegisterPage(nav, alertCtrl, loadingCtrl, auth) {
    this.nav = nav;
    this.alertCtrl = alertCtrl;
    this.loadingCtrl = loadingCtrl;
    this.auth = auth;
    this.init();
  }

  /**
   * Initialize
   */
  RegisterPage.prototype.init = function () {
    this.inputs = {
      first_name: '',
      last_name: '',
      phone: '',
      email: '',
      username: '',
      password: ''
    };
  };
  /**
   * Do register
   *
   * @param $event
   * @param inputs
   */
  RegisterPage.prototype.doRegister = function ($event, inputs) {
    $event.preventDefault();
    var thisApp = this;
    // check for values
    if (!inputs.email || !inputs.password) {
      views_1.WBView.alert(thisApp.alertCtrl, 'Required Inputs', 'Email is required.');
      return;
    }
    // show loading
    var loading = views_1.WBView.loading(thisApp.loadingCtrl, 'Creating profile...');
    // register
    thisApp.auth.register(inputs).subscribe(function (res) {
      loading.dismiss();
      views_1.WBView.alert(thisApp.alertCtrl, 'Registration successful', 'Please check your email to verify your registration.');
      thisApp.nav.setRoot(login_1.LoginPage);
    }, function (e) {
      loading.dismiss();
    });
  };
  RegisterPage = __decorate([
    core_1.Component({
      templateUrl: 'register.html'
    })
  ], RegisterPage);
  return RegisterPage;
}());
exports.RegisterPage = RegisterPage;
