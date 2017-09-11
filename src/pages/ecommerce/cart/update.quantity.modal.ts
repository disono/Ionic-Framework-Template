/**
 * @author Archie, Disono (webmonsph@gmail.com)
 * @git https://github.com/disono/Ionic-Framework-Template
 * @copyright Webmons Development Studio. (webmons.com), 2016-2017
 * @license Apache, 2.0 https://github.com/disono/Ionic-Framework-Template/blob/master/LICENSE
 */

import {Component} from "@angular/core";
import {LoadingController, NavController, NavParams, ViewController} from "ionic-angular";
import {ECommerceProduct} from "../../../providers/ecommerce/product/product";
import {AuthProvider} from "../../../providers/auth-provider";
import {ECommerceCart} from "../../../providers/ecommerce/cart/cart";
import {WBView} from "../../../lib/views";
import {WBHelper} from "../../../lib/helper";

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
    WBHelper.log('Modal filter cancelled...');

    this.viewCtrl.dismiss();
  }

}
