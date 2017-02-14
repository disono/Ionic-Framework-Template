import {NgModule, ErrorHandler} from "@angular/core";
import {IonicApp, IonicModule, IonicErrorHandler} from "ionic-angular";
import {MyApp} from "./app.component";
import {LoginPage} from "../pages/authentication/login";
import {RegisterPage} from "../pages/authentication/register";
import {ForgotPage} from "../pages/authentication/forgot";
import {DrawerPage} from "../pages/drawer/drawer";
import {HomePage} from "../pages/home/home";
import {SettingsTabPage} from "../pages/settings/settings-tab";
import {GeneralPage} from "../pages/settings/general";
import {SecurityPage} from "../pages/settings/security";
import {AboutPage} from "../pages/about/about";
import {ContactPage} from "../pages/contact/contact";
import {APDProvider} from "../providers/apd-provider";
import {ApplicationProvider} from "../providers/application-provider";
import {AuthProvider} from "../providers/auth-provider";
import {UserProvider} from "../providers/user-provider";
import {MessageProvider} from "../providers/message-provider";
import {ECommerceProductCategories} from "../providers/ecommerce/product/category";
import {ECommerceCart} from "../providers/ecommerce/cart/cart";
import {ECommerceProductCategoryPage} from "../pages/ecommerce/product/category";
import {ECommerceProduct} from "../providers/ecommerce/product/product";
import {ECommerceProductListPage} from "../pages/ecommerce/product/product.list";
import {ECommerceProductShowPage} from "../pages/ecommerce/product/product.show";
import {ECommerceCartContentPage} from "../pages/ecommerce/cart/content";
import {ECommerceCartCheckoutPage} from "../pages/ecommerce/cart/checkout";
import {ECommerceProductFilterModal} from "../pages/ecommerce/product/filter.modal";
import {ECommerceCartSuccessPage} from "../pages/ecommerce/cart/success";
import {ECommerceCartItemQuantityModal} from "../pages/ecommerce/cart/update.quantity.modal";
import {ECommerceOrder} from "../providers/ecommerce/order/order";
import {ECommerceOrderListPage} from "../pages/ecommerce/order/order.list";
import {ECommerceOrderDetailsPage} from "../pages/ecommerce/order/order.details";
import {InboxPage} from "../pages/message/inbox";
import {ReadingInboxPage} from "../pages/message/reading.inbox";

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
    ReadingInboxPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
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

    // ECommerce Components
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
    ReadingInboxPage
  ],
  providers: [
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
