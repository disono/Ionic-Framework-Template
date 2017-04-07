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
var drawer_1 = require("../drawer/drawer");
var register_1 = require("./register");
var forgot_1 = require("./forgot");
var socket_1 = require("../../lib/socket");
/**
 * @description Login
 * @file login.ts
 *
 * @author Archie Disono
 * @url https://github.com/disono/Ionic-Framework-Template
 * @license Apache 2.0
 */
var LoginPage = (function () {
  function LoginPage(nav, alertCtrl, loadingCtrl, auth) {
    this.nav = nav;
    this.alertCtrl = alertCtrl;
    this.loadingCtrl = loadingCtrl;
    this.auth = auth;
    this.init();
  }

  /**
   * Initialize
   */
  LoginPage.prototype.init = function () {
    this.inputs = {
      email: '',
      password: ''
    };
  };
  /**
   * Login
   *
   * @param $event
   * @param inputs
   */
  LoginPage.prototype.doLogin = function ($event, inputs) {
    $event.preventDefault();
    var thisApp = this;
    // check for values
    if (!inputs.email || !inputs.password) {
      views_1.WBView.alert(thisApp.alertCtrl, 'Required Inputs', 'Email and password is required.');
      return;
    }
    // show loading
    var loading = views_1.WBView.loading(thisApp.loadingCtrl, 'Authenticating');
    // login
    thisApp.auth.login(inputs).subscribe(function (res) {
      loading.dismiss();
      // data
      var data = res.data;
      // show the main menu
      if (data.role == 'client') {
        thisApp.init();
        // emit to sync data
        socket_1.WBSocket.emitter.emitEvent('sync_application');
        // set the main page
        thisApp.nav.setRoot(drawer_1.DrawerPage);
      }
      else {
        views_1.WBView.alert(thisApp.alertCtrl, 'Not Allowed', 'This Email/Username and password is not allowed to login.');
        thisApp.auth.logout();
      }
    }, function (e) {
      loading.dismiss();
      views_1.WBView.alert(thisApp.alertCtrl, 'Invalid', e);
    });
  };
  /**
   * Register
   */
  LoginPage.prototype.goToRegister = function () {
    this.nav.push(register_1.RegisterPage);
  };
  /**
   * Forgot password
   */
  LoginPage.prototype.goToReset = function () {
    this.nav.push(forgot_1.ForgotPage);
  };
  LoginPage = __decorate([
    core_1.Component({
      templateUrl: 'login.html'
    })
  ], LoginPage);
  return LoginPage;
}());
exports.LoginPage = LoginPage;
