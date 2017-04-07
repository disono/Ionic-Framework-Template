"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
var core_1 = require("@angular/core");
var views_1 = require("../../../lib/views");
var helper_1 = require("../../../lib/helper");
var content_1 = require("../cart/content");
/**
 * @author Archie Disono
 * @url https://github.com/disono/Ionic-Framework-Template
 * @license Apache 2.0
 */
var ECommerceProductShowPage = (function () {
  function ECommerceProductShowPage(nav, params, auth, cart, product, loadingCtrl, alertCtrl) {
    this.nav = nav;
    this.params = params;
    this.auth = auth;
    this.cart = cart;
    this.product = product;
    this.loadingCtrl = loadingCtrl;
    this.alertCtrl = alertCtrl;
    this.title = 'Item';
    this.details = null;
    console.log('Product ID: ' + params.get('id'));
    this.fetch(params.get('id'));
  }

  /**
   * Fetch the details on server
   *
   * @param id
   */
  ECommerceProductShowPage.prototype.fetch = function (id) {
    var thisApp = this;
    var loading = views_1.WBView.loading(thisApp.loadingCtrl, 'Loading');
    thisApp.product.show(id).subscribe(function (response) {
      loading.dismiss();
      thisApp.details = response.data;
      thisApp.title = thisApp.details.name;
    }, function (error) {
      loading.dismiss();
      // close the page
      thisApp.nav.pop();
    });
  };
  /**
   * Add to cart
   *
   * @param product_id
   */
  ECommerceProductShowPage.prototype.addToCart = function (product_id) {
    var thisApp = this;
    if (thisApp.auth.check()) {
      thisApp.cart.add(product_id).subscribe(function (response) {
        helper_1.WBHelper.showToast('Your item is successfully added to cart.');
      }, function (error) {
        console.error('Subscribe Error: ' + error);
      });
    }
    else {
      views_1.WBView.alert(thisApp.alertCtrl, 'Login', 'Please login to add this item to cart.');
    }
  };
  /**
   * Cart list
   */
  ECommerceProductShowPage.prototype.cartList = function () {
    this.nav.push(content_1.ECommerceCartContentPage);
  };
  ECommerceProductShowPage = __decorate([
    core_1.Component({
      templateUrl: 'product.show.html'
    })
  ], ECommerceProductShowPage);
  return ECommerceProductShowPage;
}());
exports.ECommerceProductShowPage = ECommerceProductShowPage;
