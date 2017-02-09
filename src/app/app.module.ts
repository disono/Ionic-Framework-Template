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
import {AppProvider} from "../providers/app-provider";
import {ApplicationData} from "../providers/application-data";
import {Auth} from "../providers/auth";
import {User} from "../providers/user";
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
    ECommerceOrderDetailsPage
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
    ECommerceOrderDetailsPage
  ],
  providers: [
    AppProvider,
    ApplicationData,
    Auth,
    User,

    // ECommerce Providers
    ECommerceProductCategories,
    ECommerceProduct,
    ECommerceCart,
    ECommerceOrder,

    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})

export class AppModule {

}
