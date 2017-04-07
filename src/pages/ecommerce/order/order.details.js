"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
var core_1 = require("@angular/core");
/**
 * @author Archie Disono
 * @url https://github.com/disono/Ionic-Framework-Template
 * @license Apache 2.0
 */
var ECommerceOrderDetailsPage = (function () {
  function ECommerceOrderDetailsPage(nav, order, params) {
    this.nav = nav;
    this.order = order;
    this.params = params;
    this.init();
    this.fetchData();
    this.is_refreshing = true;
  }

  ECommerceOrderDetailsPage.prototype.init = function () {
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
  ECommerceOrderDetailsPage.prototype.doRefresh = function (refresher) {
    this.refresher = refresher;
    this.fetchData();
    this.is_refreshing = true;
  };
  /**
   * Fetch the data to server
   */
  ECommerceOrderDetailsPage.prototype.fetchData = function () {
    var thisApp = this;
    // the application is still fetch data to server
    if (thisApp.is_refreshing || thisApp.is_fetching) {
      return;
    }
    // fetch data to server
    thisApp.is_fetching = true;
    thisApp.order.show(thisApp.params.get('id')).subscribe(function (res) {
      var data = res.data;
      thisApp.data_list = res.data;
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
  ECommerceOrderDetailsPage.prototype.completeFetch = function () {
    this.init_loading = false;
    this.is_fetching = false;
    this.is_refreshing = false;
    if (this.refresher) {
      this.refresher.complete();
    }
  };
  ECommerceOrderDetailsPage = __decorate([
    core_1.Component({
      templateUrl: 'order.details.html'
    })
  ], ECommerceOrderDetailsPage);
  return ECommerceOrderDetailsPage;
}());
exports.ECommerceOrderDetailsPage = ECommerceOrderDetailsPage;
