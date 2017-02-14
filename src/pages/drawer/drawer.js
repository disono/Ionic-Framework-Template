"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
var home_1 = require("../home/home");
var core_1 = require("@angular/core");
var ionic_angular_1 = require("ionic-angular");
var about_1 = require("../about/about");
var contact_1 = require("../contact/contact");
var settings_tab_1 = require("../settings/settings-tab");
var product_list_1 = require("../ecommerce/product/product.list");
var content_1 = require("../ecommerce/cart/content");
var order_list_1 = require("../ecommerce/order/order.list");
var inbox_1 = require("../message/inbox");
/**
 * @author Archie Disono
 * @url https://github.com/disono/Ionic-Framework-Template
 * @license Apache 2.0
 */
var DrawerPage = (function () {
  function DrawerPage() {
    this.rootPage = home_1.HomePage;
    this.pages = [
      {title: 'Dashboard', component: home_1.HomePage},
      {title: 'Profile Settings', component: settings_tab_1.SettingsTabPage},
      // e-commerce
      {title: 'Products', component: product_list_1.ECommerceProductListPage},
      {title: 'My Cart', component: content_1.ECommerceCartContentPage},
      {title: 'My Orders', component: order_list_1.ECommerceOrderListPage},
      // messenger
      {title: 'Inbox', component: inbox_1.InboxPage},
      {title: 'Contact', component: contact_1.ContactPage},
      {title: 'About', component: about_1.AboutPage}
    ];
  }

  DrawerPage.prototype.openPage = function (page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  };
  __decorate([
    core_1.ViewChild(ionic_angular_1.Nav)
  ], DrawerPage.prototype, "nav", void 0);
  DrawerPage = __decorate([
    core_1.Component({
      templateUrl: 'drawer.html',
    })
  ], DrawerPage);
  return DrawerPage;
}());
exports.DrawerPage = DrawerPage;
