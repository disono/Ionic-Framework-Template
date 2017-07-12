import {ErrorHandler, NgModule} from "@angular/core";
import {HttpModule} from "@angular/http";
import {BrowserModule} from "@angular/platform-browser";
import {IonicApp, IonicErrorHandler, IonicModule} from "ionic-angular";
import {MyApp} from "./app.component";

import {MessageProvider} from "../providers/message-provider";
import {ECommerceOrder} from "../providers/ecommerce/order/order";
import {ECommerceCart} from "../providers/ecommerce/cart/cart";
import {ECommerceProduct} from "../providers/ecommerce/product/product";
import {ECommerceProductCategories} from "../providers/ecommerce/product/category";
import {UserProvider} from "../providers/user-provider";
import {ApplicationProvider} from "../providers/application-provider";
import {AuthProvider} from "../providers/auth-provider";
import {APDProvider} from "../providers/apd-provider";

import {AboutPage} from "../pages/about/about";
import {ContactPage} from "../pages/contact/contact";
import {HomePage} from "../pages/home/home";
import {UserListPage} from "../pages/user/user.list";
import {ReadingInboxPage} from "../pages/message/reading.inbox";
import {InboxPage} from "../pages/message/inbox";
import {ECommerceOrderDetailsPage} from "../pages/ecommerce/order/order.details";
import {ECommerceOrderListPage} from "../pages/ecommerce/order/order.list";
import {ECommerceCartItemQuantityModal} from "../pages/ecommerce/cart/update.quantity.modal";
import {ECommerceCartSuccessPage} from "../pages/ecommerce/cart/success";
import {ECommerceCartCheckoutPage} from "../pages/ecommerce/cart/checkout";
import {ECommerceCartContentPage} from "../pages/ecommerce/cart/content";
import {ECommerceProductFilterModal} from "../pages/ecommerce/product/filter.modal";
import {ECommerceProductShowPage} from "../pages/ecommerce/product/product.show";
import {ECommerceProductListPage} from "../pages/ecommerce/product/product.list";
import {ECommerceProductCategoryPage} from "../pages/ecommerce/product/category";
import {DrawerPage} from "../pages/drawer/drawer";
import {SecurityPage} from "../pages/settings/security";
import {GeneralPage} from "../pages/settings/general";
import {SettingsTabPage} from "../pages/settings/settings-tab";
import {ForgotPage} from "../pages/authentication/forgot";
import {RegisterPage} from "../pages/authentication/register";
import {LoginPage} from "../pages/authentication/login";

import {IonicImageLoader} from "ionic-image-loader";

import {StatusBar} from "@ionic-native/status-bar";
import {SplashScreen} from "@ionic-native/splash-screen";

@NgModule({
  declarations: [
    MyApp,

    LoginPage,
    RegisterPage,
    ForgotPage,

    SettingsTabPage,
    GeneralPage,
    SecurityPage,

    DrawerPage,

    HomePage,
    AboutPage,
    ContactPage,

    // ECommerce Declarations
    ECommerceProductCategoryPage,
    ECommerceProductListPage,
    ECommerceProductShowPage,
    ECommerceProductFilterModal,
    ECommerceCartContentPage,
    ECommerceCartCheckoutPage,
    ECommerceCartSuccessPage,
    ECommerceCartItemQuantityModal,
    ECommerceOrderListPage,
    ECommerceOrderDetailsPage,

    // Messenger
    InboxPage,
    ReadingInboxPage,

    // User
    UserListPage
  ],
  imports: [
    BrowserModule,
    HttpModule,

    IonicModule.forRoot(MyApp),
    IonicImageLoader.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,

    LoginPage,
    RegisterPage,
    ForgotPage,

    SettingsTabPage,
    GeneralPage,
    SecurityPage,

    DrawerPage,

    HomePage,
    AboutPage,
    ContactPage,

    // ECommerce Declarations
    ECommerceProductCategoryPage,
    ECommerceProductListPage,
    ECommerceProductShowPage,
    ECommerceProductFilterModal,
    ECommerceCartContentPage,
    ECommerceCartCheckoutPage,
    ECommerceCartSuccessPage,
    ECommerceCartItemQuantityModal,
    ECommerceOrderListPage,
    ECommerceOrderDetailsPage,

    // Messenger
    InboxPage,
    ReadingInboxPage,

    // User
    UserListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,

    APDProvider,
    ApplicationProvider,
    AuthProvider,
    UserProvider,

    // ECommerce Providers
    ECommerceProductCategories,
    ECommerceProduct,
    ECommerceCart,
    ECommerceOrder,

    // Messenger
    MessageProvider,

    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {
}
