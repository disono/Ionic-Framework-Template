import {Component} from "@angular/core";
import {NavController, NavParams, LoadingController, AlertController} from "ionic-angular";
import {ECommerceProduct} from "../../../providers/ecommerce/product/product";
import {WBView} from "../../../lib/views";
import {WBHelper} from "../../../lib/helper";
import {AuthProvider} from "../../../providers/auth-provider";
import {ECommerceCart} from "../../../providers/ecommerce/cart/cart";
import {ECommerceCartContentPage} from "../cart/content";

/**
 * @author Archie Disono
 * @url https://github.com/disono/Ionic-Framework-Template
 * @license Apache 2.0
 */

@Component({
  templateUrl: 'product.show.html'
})
export class ECommerceProductShowPage {
  title = 'Item';
  details = null;

  constructor(public nav: NavController, public params: NavParams, public auth: AuthProvider, public cart: ECommerceCart,
              public product: ECommerceProduct, public loadingCtrl: LoadingController, public alertCtrl: AlertController) {
    console.log('Product ID: ' + params.get('id'));

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
      thisApp.cart.add(product_id).subscribe(function (response) {
        WBHelper.showToast('Your item is successfully added to cart.');
      }, function (error) {
        console.error('Subscribe Error: ' + error);
      });
    } else {
      WBView.alert(thisApp.alertCtrl, 'Login', 'Please login to add this item to cart.');
    }
  }

  /**
   * Cart list
   */
  cartList() {
    this.nav.push(ECommerceCartContentPage);
  }
}
