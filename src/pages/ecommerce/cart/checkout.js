"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
var core_1 = require("@angular/core");
var success_1 = require("./success");
var views_1 = require("../../../lib/views");
/**
 * @author Archie Disono
 * @url https://github.com/disono/Ionic-Framework-Template
 * @license Apache 2.0
 */
var ECommerceCartCheckoutPage = (function () {
  function ECommerceCartCheckoutPage(nav, auth, cart, applicationData, loadingCtrl) {
    this.nav = nav;
    this.auth = auth;
    this.cart = cart;
    this.applicationData = applicationData;
    this.loadingCtrl = loadingCtrl;
    this.user = this.auth.user();
    this.inputs = {
      full_name: this.user.full_name,
      phone: this.user.phone,
      email: this.user.email,
      payment_type_id: '',
      billing_address: ((this.user.address && this.user.address != null) ? this.user.address : ''),
      shipping_address: ((this.user.address && this.user.address != null) ? this.user.address : '')
    };
    this.cart_details = null;
    this.payment_types = [];
    this.voucher_code = null;
    this.payment_type_details = null;
    this.fetchData();
  }

  /**
   * Load all data time at a time
   */
  ECommerceCartCheckoutPage.prototype.fetchData = function () {
    var thisApp = this;
    thisApp.cartDetails(function () {
      thisApp.paymentTypes(function () {
        // done loading
      });
    });
  };
  /**
   * Cart details
   */
  ECommerceCartCheckoutPage.prototype.cartDetails = function (callback) {
    var thisApp = this;
    thisApp.cart.content().subscribe(function (res) {
      thisApp.cart_details = res.data;
      callback();
    }, function (error) {
      thisApp.nav.pop();
    });
  };
  /**
   * Payment types
   */
  ECommerceCartCheckoutPage.prototype.paymentTypes = function (callback) {
    var thisApp = this;
    thisApp.applicationData.index().subscribe(function (response) {
      var data = response.data;
      thisApp.payment_types = data.payment_types;
      callback();
    }, function (error) {
      console.error('Subscribe Error: ' + error);
    });
  };
  /**
   * Payment type description
   *
   * @param $event
   * @param id
   */
  ECommerceCartCheckoutPage.prototype.paymentTypeSelected = function ($event, id) {
    for (var i = 0; i < this.payment_types.length; i++) {
      if (id == this.payment_types[i].id) {
        this.payment_type_details = this.payment_types[i].description;
        return;
      }
    }
    this.payment_type_details = null;
  };
  /**
   * Apply voucher
   */
  ECommerceCartCheckoutPage.prototype.voucherApply = function () {
    var thisApp = this;
    if (thisApp.voucher_code) {
      console.log('Voucher Code: ' + thisApp.voucher_code);
      var loading_1 = views_1.WBView.loading(thisApp.loadingCtrl, 'Applying Voucher...');
      thisApp.cart.voucher(thisApp.voucher_code).subscribe(function (response) {
        loading_1.dismiss();
        thisApp.fetchData();
      }, function (error) {
        loading_1.dismiss();
        console.error('Subscribe Error: ' + error);
      });
    }
  };
  /**
   * Remove the current voucher or discount
   */
  ECommerceCartCheckoutPage.prototype.removeVoucher = function () {
    var thisApp = this;
    if (thisApp.voucher_code) {
      console.log('Voucher Remove Code: ' + thisApp.voucher_code);
      var loading_2 = views_1.WBView.loading(thisApp.loadingCtrl, 'Removing Voucher...');
      thisApp.cart.removeVoucher().subscribe(function (response) {
        loading_2.dismiss();
        thisApp.fetchData();
      }, function (error) {
        loading_2.dismiss();
        console.error('Subscribe Error: ' + error);
      });
    }
  };
  /**
   * Proceed to place your order
   */
  ECommerceCartCheckoutPage.prototype.placeOrder = function () {
    var thisApp = this;
    var loading = views_1.WBView.loading(thisApp.loadingCtrl, 'Placing your order...');
    thisApp.cart.place(thisApp.inputs).subscribe(function (response) {
      loading.dismiss();
      thisApp.fetchData();
      thisApp.nav.setRoot(success_1.ECommerceCartSuccessPage);
    }, function (error) {
      loading.dismiss();
      console.error('Subscribe Error: ' + error);
    });
  };
  ECommerceCartCheckoutPage = __decorate([
    core_1.Component({
      templateUrl: 'checkout.html'
    })
  ], ECommerceCartCheckoutPage);
  return ECommerceCartCheckoutPage;
}());
exports.ECommerceCartCheckoutPage = ECommerceCartCheckoutPage;
