"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
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
var ECommerceProductFilterModal = (function () {
  function ECommerceProductFilterModal(nav, viewCtrl, params, category) {
    this.nav = nav;
    this.viewCtrl = viewCtrl;
    this.params = params;
    this.category = category;
    this.filter = this.params.get('filter');
    this.categories = [];
    console.log('Filter Data: ' + params.get('filter'));
    if (!this.filter.product_category_id) {
      this.filter.product_category_id = '';
    }
    this.fetchCategories();
  }

  /**
   * Product categories
   */
  ECommerceProductFilterModal.prototype.fetchCategories = function () {
    var thisApp = this;
    this.category.index().subscribe(function (response) {
      thisApp.categories = response.data;
    }, function (error) {
      console.error('Subscribe Error: ' + error);
    });
  };
  /**
   * Apply the filter and search
   */
  ECommerceProductFilterModal.prototype.search = function () {
    console.log('Searching...');
    this.viewCtrl.dismiss(this.filter);
  };
  /**
   * On toggle change
   *
   * @param type
   * @param value
   */
  ECommerceProductFilterModal.prototype.onChangeToggle = function (type, value) {
    if (type == 'sale') {
      if (value) {
        this.filter.is_sale = 1;
      }
      else {
        this.filter.is_sale = 0;
      }
    }
    if (type == 'latest') {
      if (value) {
        this.filter.is_latest = 1;
      }
      else {
        this.filter.is_latest = 0;
      }
    }
  };
  /**
   * Close the modal
   */
  ECommerceProductFilterModal.prototype.dismiss = function () {
    console.log('Modal filter cancelled...');
    this.viewCtrl.dismiss();
  };
  ECommerceProductFilterModal = __decorate([
    core_1.Component({
      templateUrl: 'filter.modal.html'
    })
  ], ECommerceProductFilterModal);
  return ECommerceProductFilterModal;
}());
exports.ECommerceProductFilterModal = ECommerceProductFilterModal;
