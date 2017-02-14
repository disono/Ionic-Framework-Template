"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
var core_1 = require("@angular/core");
var ionic_angular_1 = require("ionic-angular");
var app_component_1 = require("./app.component");
var login_1 = require("../pages/authentication/login");
var register_1 = require("../pages/authentication/register");
var forgot_1 = require("../pages/authentication/forgot");
var drawer_1 = require("../pages/drawer/drawer");
var home_1 = require("../pages/home/home");
var settings_tab_1 = require("../pages/settings/settings-tab");
var general_1 = require("../pages/settings/general");
var security_1 = require("../pages/settings/security");
var about_1 = require("../pages/about/about");
var contact_1 = require("../pages/contact/contact");
var wb_provider_1 = require("../providers/wb-provider");
var application_provider_1 = require("../providers/application-provider");
var auth_provider_1 = require("../providers/auth-provider");
var user_provider_1 = require("../providers/user-provider");
var message_provider_1 = require("../providers/message-provider");
var category_1 = require("../providers/ecommerce/product/category");
var cart_1 = require("../providers/ecommerce/cart/cart");
var category_2 = require("../pages/ecommerce/product/category");
var product_1 = require("../providers/ecommerce/product/product");
var product_list_1 = require("../pages/ecommerce/product/product.list");
var product_show_1 = require("../pages/ecommerce/product/product.show");
var content_1 = require("../pages/ecommerce/cart/content");
var checkout_1 = require("../pages/ecommerce/cart/checkout");
var filter_modal_1 = require("../pages/ecommerce/product/filter.modal");
var success_1 = require("../pages/ecommerce/cart/success");
var update_quantity_modal_1 = require("../pages/ecommerce/cart/update.quantity.modal");
var order_1 = require("../providers/ecommerce/order/order");
var order_list_1 = require("../pages/ecommerce/order/order.list");
var order_details_1 = require("../pages/ecommerce/order/order.details");
var inbox_1 = require("../pages/message/inbox");
var reading_inbox_1 = require("../pages/message/reading.inbox");
var AppModule = (function () {
  function AppModule() {
  }

  AppModule = __decorate([
    core_1.NgModule({
      declarations: [
        app_component_1.MyApp,
        login_1.LoginPage,
        register_1.RegisterPage,
        forgot_1.ForgotPage,
        settings_tab_1.SettingsTabPage,
        general_1.GeneralPage,
        security_1.SecurityPage,
        drawer_1.DrawerPage,
        home_1.HomePage,
        about_1.AboutPage,
        contact_1.ContactPage,
        // ECommerce Declarations
        category_2.ECommerceProductCategoryPage,
        product_list_1.ECommerceProductListPage,
        product_show_1.ECommerceProductShowPage,
        filter_modal_1.ECommerceProductFilterModal,
        content_1.ECommerceCartContentPage,
        checkout_1.ECommerceCartCheckoutPage,
        success_1.ECommerceCartSuccessPage,
        update_quantity_modal_1.ECommerceCartItemQuantityModal,
        order_list_1.ECommerceOrderListPage,
        order_details_1.ECommerceOrderDetailsPage,
        // Messenger
        inbox_1.InboxPage,
        reading_inbox_1.ReadingInboxPage
      ],
      imports: [
        ionic_angular_1.IonicModule.forRoot(app_component_1.MyApp)
      ],
      bootstrap: [ionic_angular_1.IonicApp],
      entryComponents: [
        app_component_1.MyApp,
        login_1.LoginPage,
        register_1.RegisterPage,
        forgot_1.ForgotPage,
        settings_tab_1.SettingsTabPage,
        general_1.GeneralPage,
        security_1.SecurityPage,
        drawer_1.DrawerPage,
        home_1.HomePage,
        about_1.AboutPage,
        contact_1.ContactPage,
        // ECommerce Components
        category_2.ECommerceProductCategoryPage,
        product_list_1.ECommerceProductListPage,
        product_show_1.ECommerceProductShowPage,
        filter_modal_1.ECommerceProductFilterModal,
        content_1.ECommerceCartContentPage,
        checkout_1.ECommerceCartCheckoutPage,
        success_1.ECommerceCartSuccessPage,
        update_quantity_modal_1.ECommerceCartItemQuantityModal,
        order_list_1.ECommerceOrderListPage,
        order_details_1.ECommerceOrderDetailsPage,
        // Messenger
        inbox_1.InboxPage,
        reading_inbox_1.ReadingInboxPage
      ],
      providers: [
        wb_provider_1.WBProvider,
        application_provider_1.ApplicationProvider,
        auth_provider_1.AuthProvider,
        user_provider_1.UserProvider,
        // ECommerce Providers
        category_1.ECommerceProductCategories,
        product_1.ECommerceProduct,
        cart_1.ECommerceCart,
        order_1.ECommerceOrder,
        // Messenger
        message_provider_1.MessageProvider,
        {provide: core_1.ErrorHandler, useClass: ionic_angular_1.IonicErrorHandler}
      ]
    })
  ], AppModule);
  return AppModule;
}());
exports.AppModule = AppModule;
