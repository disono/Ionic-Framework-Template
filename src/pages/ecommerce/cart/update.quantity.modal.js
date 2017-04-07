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
/**
 * @author Archie Disono
 * @url https://github.com/disono/Ionic-Framework-Template
 * @license Apache 2.0
 */
var ECommerceCartItemQuantityModal = (function () {
  function ECommerceCartItemQuantityModal(nav, product, auth, cart, params, viewCtrl, loadingCtrl) {
    this.nav = nav;
    this.product = product;
    this.auth = auth;
    this.cart = cart;
    this.params = params;
    this.viewCtrl = viewCtrl;
    this.loadingCtrl = loadingCtrl;
  }

  /**
   * Update the quantity
   */
  ECommerceCartItemQuantityModal.prototype.update = function () {
    var thisApp = this;
    if (thisApp.quantity) {
      var loading_1 = views_1.WBView.loading(thisApp.loadingCtrl, 'Updating Item Quantity...');
      thisApp.cart.update(thisApp.params.get('id'), thisApp.quantity).subscribe(function (response) {
        loading_1.dismiss();
        thisApp.viewCtrl.dismiss(true);
      }, function (error) {
        loading_1.dismiss();
        thisApp.dismiss();
      });
    }
  };
  /**
   * Close the modal
   */
  ECommerceCartItemQuantityModal.prototype.dismiss = function () {
    console.log('Modal filter cancelled...');
    this.viewCtrl.dismiss();
  };
  ECommerceCartItemQuantityModal = __decorate([
    core_1.Component({
      templateUrl: 'update.quantity.modal.html'
    })
  ], ECommerceCartItemQuantityModal);
  return ECommerceCartItemQuantityModal;
}());
exports.ECommerceCartItemQuantityModal = ECommerceCartItemQuantityModal;
