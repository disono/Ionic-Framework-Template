"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
var core_1 = require("@angular/core");
var product_show_1 = require("../product/product.show");
var helper_1 = require("../../../lib/helper");
var checkout_1 = require("./checkout");
var update_quantity_modal_1 = require("./update.quantity.modal");
/**
 * @author Archie Disono
 * @url https://github.com/disono/Ionic-Framework-Template
 * @license Apache 2.0
 */
var ECommerceCartContentPage = (function () {
  function ECommerceCartContentPage(nav, product, auth, cart, actionSheetCtrl, modalCtrl) {
    this.nav = nav;
    this.product = product;
    this.auth = auth;
    this.cart = cart;
    this.actionSheetCtrl = actionSheetCtrl;
    this.modalCtrl = modalCtrl;
    this.init();
    this.fetchData();
    this.is_refreshing = true;
  }

  ECommerceCartContentPage.prototype.init = function () {
    this.init_loading = true;
    this.refresher = null;
    this.is_fetching = false;
    this.data_list = [];
  };
  /**
   * Pull refresh
   *
   * @param refresher
   */
  ECommerceCartContentPage.prototype.doRefresh = function (refresher) {
    this.refresher = refresher;
    this.fetchData();
    this.is_refreshing = true;
  };
  /**
   * Fetch the data to server
   */
  ECommerceCartContentPage.prototype.fetchData = function () {
    var thisApp = this;
    // the application is still fetch data to server
    if (thisApp.is_refreshing || thisApp.is_fetching) {
      return;
    }
    // fetch data to server
    thisApp.is_fetching = true;
    thisApp.cart.content().subscribe(function (res) {
      var data = res.data;
      thisApp.cart_details = res.data;
      // new data
      thisApp.data_list = data.item;
      // development
      console.debug('Data: ' + JSON.stringify(data.item));
      thisApp.completeFetch();
    }, function (error) {
      thisApp.completeFetch();
    });
  };
  /**
   * Fetch completed
   */
  ECommerceCartContentPage.prototype.completeFetch = function () {
    this.init_loading = false;
    this.is_fetching = false;
    this.is_refreshing = false;
    if (this.refresher) {
      this.refresher.complete();
    }
  };
  /**
   * Remove to cart
   *
   * @param product_id
   */
  ECommerceCartContentPage.prototype.removeToCart = function (product_id) {
    var thisApp = this;
    thisApp.actionSheetCtrl.create({
      title: 'Are you sure to delete this item to cart?',
      buttons: [
        {
          text: 'YES delete this item on my cart.',
          role: 'destructive',
          handler: function () {
            thisApp.cart.destroy(product_id).subscribe(function (response) {
              helper_1.WBHelper.showToast('Your item is successfully remove to cart.');
              // refresh
              thisApp.fetchData();
            });
          }
        }, {
          text: 'Cancel',
          role: 'cancel',
          handler: function () {
            console.log('Cancel clicked');
          }
        }
      ]
    }).present();
  };
  /**
   * Update the quantity
   *
   * @param product_id
   */
  ECommerceCartContentPage.prototype.updateQuantity = function (product_id) {
    var _this = this;
    var thisApp = this;
    console.log('Update Quantity Modal');
    var modal = this.modalCtrl.create(update_quantity_modal_1.ECommerceCartItemQuantityModal, {
      id: product_id
    });
    modal.onDidDismiss(function (data) {
      if (data) {
        console.log(data);
        thisApp.fetchData();
        _this.is_refreshing = true;
      }
    });
    modal.present();
  };
  /**
   * Clear items on cart
   */
  ECommerceCartContentPage.prototype.clearCart = function () {
    var thisApp = this;
    thisApp.actionSheetCtrl.create({
      title: 'Are you sure to clear your cart?',
      buttons: [
        {
          text: 'YES clear and delete ALL items on my cart.',
          role: 'destructive',
          handler: function () {
            thisApp.cart.clear().subscribe(function (response) {
              helper_1.WBHelper.showToast('Your cart is successfully cleared.');
              // refresh
              thisApp.fetchData();
            });
          }
        }, {
          text: 'Cancel',
          role: 'cancel',
          handler: function () {
            console.log('Cancel clicked');
          }
        }
      ]
    }).present();
  };
  /**
   * Show product details
   *
   * @param id
   */
  ECommerceCartContentPage.prototype.showProduct = function (id) {
    console.log('Product: ' + id);
    this.nav.push(product_show_1.ECommerceProductShowPage, {
      id: id
    });
  };
  /**
   * Proceed to checkout
   */
  ECommerceCartContentPage.prototype.checkout = function () {
    this.nav.push(checkout_1.ECommerceCartCheckoutPage);
  };
  ECommerceCartContentPage = __decorate([
    core_1.Component({
      templateUrl: 'content.html'
    })
  ], ECommerceCartContentPage);
  return ECommerceCartContentPage;
}());
exports.ECommerceCartContentPage = ECommerceCartContentPage;
