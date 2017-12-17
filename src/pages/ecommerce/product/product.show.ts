/**
 * @author Archie, Disono (webmonsph@gmail.com)
 * @url https://github.com/disono/Ionic-Framework-Template
 * @copyright Webmons Development Studio. (webmons.com), 2016-2017
 * @license Apache, 2.0 https://github.com/disono/Ionic-Framework-Template/blob/master/LICENSE
 */

import {Component, NgModule} from "@angular/core";
import {LoadingController, ModalController, NavController, NavParams} from "ionic-angular";
import {ECommerceProduct} from "../../../providers/ecommerce/product/product";
import {WBView} from "../../../lib/views";
import {WBHelper} from "../../../lib/helper";
import {AuthProvider} from "../../../providers/auth-provider";
import {ECommerceCart} from "../../../providers/ecommerce/cart/cart";
import {ECommerceCartContentPage} from "../cart/content";
import {LoginPage} from "../../authentication/login";
import {IonicImageLoader} from "ionic-image-loader";

@NgModule({
  imports: [
    IonicImageLoader
  ]
})
@Component({
  templateUrl: 'product.show.html'
})
export class ECommerceProductShowPage {
  title = 'Item';
  details = null;

  constructor(public nav: NavController, public params: NavParams, public auth: AuthProvider, public cart: ECommerceCart,
              public product: ECommerceProduct, public loadingCtrl: LoadingController, public modalCtrl: ModalController) {
    WBHelper.log('Product ID: ' + params.get('id'));

    this.fetch(params.get('id'));
  }

  /**
   * Fetch the details on server
   *
   * @param id
   */
  fetch(id) {
    let thisApp = this;

    let loading = WBView.loading(thisApp.loadingCtrl, 'Loading');
    thisApp.product.show(id).subscribe(function (response) {
      loading.dismiss();

      thisApp.details = response.data;
      thisApp.title = thisApp.details.name;
    }, function (error) {
      loading.dismiss();

      // close the page
      thisApp.nav.pop();
    });
  }

  /**
   * Add to cart
   *
   * @param product_id
   */
  addToCart(product_id) {
    let thisApp = this;

    if (thisApp.auth.check()) {
      thisApp.storeToCart(product_id);
    } else {
      // show the login page (modal)
      let loginModal = thisApp.modalCtrl.create(LoginPage, {
        return_page: 'modal',
        nav: thisApp.nav
      });

      loginModal.onDidDismiss(data => {
        thisApp.storeToCart(product_id);
      });

      loginModal.present();
    }
  }

  /**
   * Store to cart the item
   *
   * @param product_id
   */
  storeToCart(product_id) {
    let thisApp = this;
    thisApp.cart.add(product_id).subscribe(function (response) {
      WBHelper.showToast('Your item is successfully added to cart.');

      thisApp.nav.setRoot(ECommerceCartContentPage);
    }, function (error) {
      WBHelper.error('Subscribe Error: ' + error);
    });
  }

  /**
   * Cart list
   */
  cartList() {
    this.nav.setRoot(ECommerceCartContentPage);
  }
}
