"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
var core_1 = require("@angular/core");
var login_1 = require("./login");
var views_1 = require("../../lib/views");
/**
 * @author Archie Disono
 * @url https://github.com/disono/Ionic-Framework-Template
 * @license Apache 2.0
 */
var ForgotPage = (function () {
  function ForgotPage(nav, alertCtrl, loadingCtrl, auth) {
    this.nav = nav;
    this.alertCtrl = alertCtrl;
    this.loadingCtrl = loadingCtrl;
    this.auth = auth;
    this.init();
  }

  /**
   * Initialize
   */
  ForgotPage.prototype.init = function () {
    this.inputs = {
      email: ''
    };
  };
  /**
   * Do reset
   *
   * @param $event
   * @param inputs
   */
  ForgotPage.prototype.doReset = function ($event, inputs) {
    $event.preventDefault();
    var thisApp = this;
    // check for values
    if (!inputs.email) {
      views_1.WBView.alert(thisApp.alertCtrl, 'Required Inputs', 'Email is required.');
      return;
    }
    // show loading
    var loading = views_1.WBView.loading(thisApp.loadingCtrl, 'Send request...');
    // send to server
    thisApp.auth.forgot(inputs).subscribe(function (res) {
      loading.dismiss();
      thisApp.nav.setRoot(login_1.LoginPage);
    }, function (e) {
      loading.dismiss();
    });
  };
  ForgotPage = __decorate([
    core_1.Component({
      templateUrl: 'forgot.html'
    })
  ], ForgotPage);
  return ForgotPage;
}());
exports.ForgotPage = ForgotPage;
