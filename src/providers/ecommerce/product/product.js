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
var ECommerceProduct = (function () {
  function ECommerceProduct(appProvider) {
    this.appProvider = appProvider;
    console.log('ECommerce Product Called.');
  }

  /**
   * Product categories
   *
   * @returns {any}
   */
  ECommerceProduct.prototype.index = function (parameters) {
    return this.appProvider.get('e-commerce/product', parameters, function (res) {
      console.debug('Product: ' + res);
    });
  };
  /**
   * Get product details
   *
   * @param id
   * @returns {any}
   */
  ECommerceProduct.prototype.show = function (id) {
    return this.appProvider.get('e-commerce/product/show/' + id, null, function (res) {
      console.debug('Product show: ' + res);
    });
  };
  ECommerceProduct = __decorate([
    core_1.Injectable()
  ], ECommerceProduct);
  return ECommerceProduct;
}());
exports.ECommerceProduct = ECommerceProduct;
