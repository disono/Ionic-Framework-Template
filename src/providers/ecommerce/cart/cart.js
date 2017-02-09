"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
var core_1 = require("@angular/core");
/**
 * @author Archie Disono on 2016-05-08.
 * @url https://github.com/disono/Ionic-Framework-Template
 * @license Apache 2.0
 */
var ECommerceCart = (function () {
  function ECommerceCart(appProvider) {
    this.appProvider = appProvider;
    console.log('ECommerce Cart Called.');
  }

  /**
   * Product categories
   *
   * @returns {any}
   */
  ECommerceCart.prototype.content = function () {
    return this.appProvider.get('ecommerce/cart', null, function (res) {
      console.debug('Product content: ' + res);
    });
  };
  /**
   * Add item to cart
   *
   * @param product_id
   * @returns {any}
   */
  ECommerceCart.prototype.add = function (product_id) {
    return this.appProvider.get('ecommerce/cart/add/' + product_id, null, function (res) {
      console.debug('Product add: ' + res);
    });
  };
  /**
   * Update quantity
   *
   * @param id
   * @param quantity
   * @returns {any}
   */
  ECommerceCart.prototype.update = function (id, quantity) {
    return this.appProvider.get('ecommerce/cart/update/' + id + '/' + quantity, null, function (res) {
      console.debug('Product update: ' + res);
    });
  };
  /**
   * Delete item on cart
   *
   * @param id
   * @returns {any}
   */
  ECommerceCart.prototype.destroy = function (id) {
    return this.appProvider.get('ecommerce/cart/destroy/' + id, null, function (res) {
      console.debug('Product add: ' + res);
    });
  };
  /**
   * Clear items on cart
   *
   * @returns {any}
   */
  ECommerceCart.prototype.clear = function () {
    return this.appProvider.get('ecommerce/cart/clear', null, function (res) {
      console.debug('Product clear: ' + res);
    });
  };
  /**
   * Apply voucher code on cart
   *
   * @param code
   * @returns {any}
   */
  ECommerceCart.prototype.voucher = function (code) {
    return this.appProvider.post('ecommerce/cart/voucher/' + code, null, function (res) {
      console.debug('Product clear: ' + res);
    });
  };
  /**
   * Remove voucher code
   *
   * @returns {any}
   */
  ECommerceCart.prototype.removeVoucher = function () {
    return this.appProvider.get('ecommerce/cart/voucher/remove', null, function (res) {
      console.debug('Product clear: ' + res);
    });
  };
  /**
   * Place your order
   *
   * @param parameters
   * @returns {any}
   */
  ECommerceCart.prototype.place = function (parameters) {
    return this.appProvider.post('ecommerce/place', parameters, function (res) {
      console.debug('Product place: ' + res);
    });
  };
  ECommerceCart = __decorate([
    core_1.Injectable()
  ], ECommerceCart);
  return ECommerceCart;
}());
exports.ECommerceCart = ECommerceCart;
