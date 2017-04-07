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
var login_1 = require("../authentication/login");
/**
 * @author Archie Disono
 * @url https://github.com/disono/Ionic-Framework-Template
 * @license Apache 2.0
 */
var GeneralPage = (function () {
  function GeneralPage(nav, alertCtrl, loadingCtrl, auth, app) {
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
  GeneralPage.prototype.init = function () {
    var thisApp = this;
    thisApp.authInputs();
    // save the new authenticated user (Sync data)
    var loading = views_1.WBView.loading(thisApp.loadingCtrl, 'Syncing...');
    thisApp.auth.sync().subscribe(function (res) {
      loading.dismiss();
      // reinitialize inputs
      thisApp.authInputs();
      // file on change
      jQ(document).off().on('change', '#file', function () {
        thisApp.setFiles(this);
      });
    }, function (error) {
      loading.dismiss();
      views_1.WBView.alert(thisApp.alertCtrl, 'Error Syncing', error);
    });
  };
  /**
   * Authenticated inputs
   */
  GeneralPage.prototype.authInputs = function () {
    var thisApp = this;
    // authenticated user
    var user = this.auth.user();
    // inputs
    thisApp.inputs = {
      first_name: user.first_name,
      last_name: user.last_name,
      phone: user.phone,
      address: user.address,
      email: user.email,
      birthday: new Date(user.birthday).toISOString(),
      gender: ((user.gender) ? user.gender : 'Male'),
      about: user.about,
      avatar: user.avatar
    };
    // files / avatar
    thisApp.files = null;
  };
  /**
   * Save the changes
   *
   * @param $event
   * @param inputs
   */
  GeneralPage.prototype.doSave = function ($event, inputs) {
    $event.preventDefault();
    var thisApp = this;
    // check for values
    if (!inputs.first_name || !inputs.last_name || !inputs.phone || !inputs.email || !inputs.gender) {
      views_1.WBView.alert(thisApp.alertCtrl, 'Required Inputs', 'Please check all the required fields.');
      return;
    }
    // format birthday
    if (inputs.birthday) {
      inputs.birthday = moment(new Date(inputs.birthday)).format('MMMM DD YYYY');
    }
    // show loading
    var loading = views_1.WBView.loading(thisApp.loadingCtrl, 'Updating profile...');
    // update the profile
    thisApp.auth.update({
      inputs: inputs,
      files: thisApp.files
    }, function (res) {
      setTimeout(function () {
        thisApp.authInputs();
      }, 100);
      loading.dismiss();
    }, function (errors) {
      // errors
      loading.dismiss();
    });
  };
  /**
   * Open the dialog for images
   */
  GeneralPage.prototype.openFileDialog = function () {
    jQ('#file').off().click();
  };
  /**
   * Set the image file on change
   *
   * @param input
   */
  GeneralPage.prototype.setFiles = function (input) {
    if (input.files && input.files[0]) {
      this.files = {image: input.files[0]};
    }
  };
  /**
   * Logout
   */
  GeneralPage.prototype.logout = function () {
    this.auth.logout();
    this.app.getRootNav().setRoot(login_1.LoginPage);
  };
  GeneralPage = __decorate([
    core_1.Component({
      templateUrl: 'general.html'
    })
  ], GeneralPage);
  return GeneralPage;
}());
exports.GeneralPage = GeneralPage;
