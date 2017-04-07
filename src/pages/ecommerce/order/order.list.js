"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
var core_1 = require("@angular/core");
var order_details_1 = require("./order.details");
/**
 * @author Archie Disono
 * @url https://github.com/disono/Ionic-Framework-Template
 * @license Apache 2.0
 */
var ECommerceOrderListPage = (function () {
  function ECommerceOrderListPage(nav, order) {
    this.nav = nav;
    this.order = order;
    this.init();
    this.fetchData();
    this.is_refreshing = true;
  }

  ECommerceOrderListPage.prototype.init = function () {
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
  ECommerceOrderListPage.prototype.doRefresh = function (refresher) {
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
  ECommerceOrderListPage.prototype.doInfinite = function (infiniteScroll) {
    this.infiniteScroll = infiniteScroll;
    this.fetchData();
  };
  /**
   * Fetch the data to server
   */
  ECommerceOrderListPage.prototype.fetchData = function () {
    var thisApp = this;
    // the application is still fetch data to server
    if (thisApp.is_refreshing || thisApp.is_fetching) {
      return;
    }
    // fetch data to server
    thisApp.is_fetching = true;
    thisApp.order.index(thisApp.page).subscribe(function (res) {
      // reset data if refreshing
      if (thisApp.is_refreshing) {
        thisApp.data_list = [];
      }
      // format data
      for (var i = 0; i < res.data.length; i++) {
        thisApp.data_list.push(res.data[i]);
      }
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
   * Fetch completed
   */
  ECommerceOrderListPage.prototype.completeFetch = function () {
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
   * Show ordered items
   *
   * @param id
   */
  ECommerceOrderListPage.prototype.itemSelected = function (id) {
    this.nav.push(order_details_1.ECommerceOrderDetailsPage, {
      id: id
    });
  };
  ECommerceOrderListPage = __decorate([
    core_1.Component({
      templateUrl: 'order.list.html'
    })
  ], ECommerceOrderListPage);
  return ECommerceOrderListPage;
}());
exports.ECommerceOrderListPage = ECommerceOrderListPage;
