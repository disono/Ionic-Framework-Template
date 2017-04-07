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
var product_show_1 = require("./product.show");
var filter_modal_1 = require("./filter.modal");
/**
 * @author Archie Disono
 * @url https://github.com/disono/Ionic-Framework-Template
 * @license Apache 2.0
 */
var ECommerceProductListPage = (function () {
  function ECommerceProductListPage(nav, product, auth, cart, alertCtrl, modalCtrl) {
    this.nav = nav;
    this.product = product;
    this.auth = auth;
    this.cart = cart;
    this.alertCtrl = alertCtrl;
    this.modalCtrl = modalCtrl;
    this.rowNumGrid = 0;
    this.filter = {
      search: null,
      min_srp: null,
      max_srp: null,
      product_category_id: null,
      is_sale: null,
      is_latest: null,
      is_featured: null,
      page: 1
    };
    this.init();
    this.fetchData();
    this.is_refreshing = true;
  }

  ECommerceProductListPage.prototype.init = function () {
    this.init_loading = true;
    this.refresher = null;
    this.is_fetching = false;
    this.infiniteScroll = null;
    this.data_list = [];
    this.page = 1;
  };
  /**
   * Pull refresh
   *
   * @param refresher
   */
  ECommerceProductListPage.prototype.doRefresh = function (refresher) {
    this.refresher = refresher;
    this.page = 1;
    this.fetchData();
    this.is_refreshing = true;
  };
  /**
   * Infinite scroll
   *
   * @param infiniteScroll
   */
  ECommerceProductListPage.prototype.doInfinite = function (infiniteScroll) {
    this.infiniteScroll = infiniteScroll;
    this.fetchData();
  };
  /**
   * Fetch the data to server
   */
  ECommerceProductListPage.prototype.fetchData = function () {
    var thisApp = this;
    // the application is still fetch data to server
    if (thisApp.is_refreshing || thisApp.is_fetching) {
      return;
    }
    // fetch data to server
    thisApp.is_fetching = true;
    thisApp.filter.page = thisApp.page;
    thisApp.product.index(thisApp.filter).subscribe(function (res) {
      // reset data if refreshing
      if (thisApp.is_refreshing) {
        thisApp.rowNumGrid = 0;
        thisApp.data_list = [];
      }
      // format data
      thisApp.formatListDataToGrid(res.data);
      // development
      console.debug('Page: ' + thisApp.page + ' Data: ' + JSON.stringify(res.data));
      // update the page
      if (res.data.length) {
        thisApp.page++;
      }
      thisApp.completeFetch();
    }, function (error) {
      thisApp.completeFetch();
    });
  };
  /**
   * Format data list to grid
   *
   * @param data
   */
  ECommerceProductListPage.prototype.formatListDataToGrid = function (data) {
    var thisApp = this;
    // counter to iterate over the rows in the grid
    var iterator = (data.length == 1) ? 1 : 2;
    // iterate data
    for (var i = 0; i < data.length; i += iterator) {
      // declare two elements per row
      var innerIterator = (data[i] && data[i + 1]) ? 2 : 1;
      thisApp.data_list[thisApp.rowNumGrid] = Array(innerIterator);
      // check dat exists
      if (data[i]) {
        // insert data
        thisApp.data_list[thisApp.rowNumGrid][0] = data[i];
      }
      // repeat for the second data
      if (data[i + 1]) {
        thisApp.data_list[thisApp.rowNumGrid][1] = data[i + 1];
      }
      // go on to the next row
      thisApp.rowNumGrid++;
    }
  };
  /**
   * Fetch completed
   */
  ECommerceProductListPage.prototype.completeFetch = function () {
    this.init_loading = false;
    this.is_fetching = false;
    this.is_refreshing = false;
    if (this.refresher) {
      this.refresher.complete();
    }
    if (this.infiniteScroll) {
      this.infiniteScroll.complete();
    }
  };
  /**
   * Search products open the modals for filters
   */
  ECommerceProductListPage.prototype.searchProducts = function () {
    var _this = this;
    var thisApp = this;
    console.log('Search Products.');
    var modal = this.modalCtrl.create(filter_modal_1.ECommerceProductFilterModal, {
      filter: thisApp.filter
    });
    modal.onDidDismiss(function (data) {
      if (data) {
        console.log(data);
        thisApp.page = 1;
        thisApp.filter = data;
        thisApp.fetchData();
        _this.is_refreshing = true;
      }
    });
    modal.present();
  };
  /**
   * Add to cart
   *
   * @param product_id
   */
  ECommerceProductListPage.prototype.addToCart = function (product_id) {
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
   * Show product details
   *
   * @param id
   */
  ECommerceProductListPage.prototype.showProduct = function (id) {
    console.log('Product: ' + id);
    this.nav.push(product_show_1.ECommerceProductShowPage, {
      id: id
    });
  };
  ECommerceProductListPage = __decorate([
    core_1.Component({
      templateUrl: 'product.list.html'
    })
  ], ECommerceProductListPage);
  return ECommerceProductListPage;
}());
exports.ECommerceProductListPage = ECommerceProductListPage;
