import {Component} from "@angular/core";
import {NavController, NavParams, ViewController, LoadingController} from "ionic-angular";
import {ECommerceProduct} from "../../../providers/ecommerce/product/product";
import {AuthProvider} from "../../../providers/auth-provider";
import {ECommerceCart} from "../../../providers/ecommerce/cart/cart";
import {WBView} from "../../../lib/views";

/**
 * @author Archie Disono
 * @url https://github.com/disono/Ionic-Framework-Template
 * @license Apache 2.0
 */

@Component({
  templateUrl: 'update.quantity.modal.html'
})
export class ECommerceCartItemQuantityModal {
  quantity: null;

  constructor(public nav: NavController, public product: ECommerceProduct, public auth: AuthProvider, public cart: ECommerceCart,
              public params: NavParams, public viewCtrl: ViewController, public loadingCtrl: LoadingController) {

  }

  /**
   * Update the quantity
   */
  update() {
    let thisApp = this;

    if (thisApp.quantity) {
      let loading = WBView.loading(thisApp.loadingCtrl, 'Updating Item Quantity...');

      thisApp.cart.update(thisApp.params.get('id'), thisApp.quantity).subscribe(function (response) {
        loading.dismiss();

        thisApp.viewCtrl.dismiss(true);
      }, function (error) {
        loading.dismiss();

        thisApp.dismiss();
      });
    }
  }

  /**
   * Close the modal
   */
  dismiss() {
    console.log('Modal filter cancelled...');

    this.viewCtrl.dismiss();
  }

}
