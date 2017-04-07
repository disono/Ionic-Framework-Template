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
/**
 * @author Archie Disono
 * @url https://github.com/disono/Ionic-Framework-Template
 * @license Apache 2.0
 */
var SecurityPage = (function () {
  function SecurityPage(nav, alertCtrl, loadingCtrl, auth, app) {
    this.nav = nav;
    this.alertCtrl = alertCtrl;
    this.loadingCtrl = loadingCtrl;
    this.auth = auth;
    this.app = app;
    this.init();
  }

  /**
   * Initialize
   */
  SecurityPage.prototype.init = function () {
    var user = this.auth.user();
    // inputs
    this.inputs = {
      email: user.email,
      current_password: '',
      password: '',
      password_confirmation: ''
    };
  };
  /**
   * Save the changes
   *
   * @param $event
   * @param inputs
   */
  SecurityPage.prototype.doSave = function ($event, inputs) {
    $event.preventDefault();
    var thisApp = this;
    // check for values
    if (!inputs.current_password || !inputs.password || !inputs.email) {
      views_1.WBView.alert(thisApp.alertCtrl, 'Required Inputs', 'Please check all the required fields.');
      return;
    }
    // show loading
    var loading = views_1.WBView.loading(thisApp.loadingCtrl, 'Updating security...');
    // update security
    thisApp.auth.security(inputs).subscribe(function (res) {
      loading.dismiss();
    }, function (e) {
      loading.dismiss();
    });
  };
  SecurityPage = __decorate([
    core_1.Component({
      templateUrl: 'security.html'
    })
  ], SecurityPage);
  return SecurityPage;
}());
exports.SecurityPage = SecurityPage;
