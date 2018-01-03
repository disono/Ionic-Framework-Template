/**
 * @author Archie, Disono (webmonsph@gmail.com)
 * @url https://github.com/disono/Ionic-Framework-Template
 * @copyright Webmons Development Studio. (webmons.com), 2016-2017
 * @license Apache, 2.0 https://github.com/disono/Ionic-Framework-Template/blob/master/LICENSE
 */

import {Component} from "@angular/core";
import {ActionSheetController, LoadingController, ModalController, NavController} from "ionic-angular";
import {ECommerceProduct} from "../../../providers/ecommerce/product/product";
import {AuthProvider} from "../../../providers/auth-provider";
import {ECommerceCart} from "../../../providers/ecommerce/cart/cart";
import {ECommerceProductShowPage} from "../product/product.show";
import {WBHelper} from "../../../lib/helper";
import {ECommerceCartCheckoutPage} from "./checkout";
import {ECommerceCartItemQuantityModal} from "./update.quantity.modal";
import {WBView} from "../../../lib/views";

@Component({
  templateUrl: 'content.html'
})
export class ECommerceCartContentPage {
  data_list: any;
  cart_details: null;
  init_loading: boolean;

  is_refreshing: boolean;
  is_fetching: boolean;

  refresher: any;

  constructor(public nav: NavController, public product: ECommerceProduct, public auth: AuthProvider, public cart: ECommerceCart,
              public actionSheetCtrl: ActionSheetController, public modalCtrl: ModalController, public loadingCtrl: LoadingController) {
    this.init();

    this.fetchData();
    this.is_refreshing = true;
  }

  init() {
    this.init_loading = true;
    this.refresher = null;
    this.is_fetching = false;

    this.data_list = [];
  }

  /**
   * Pull refresh
   *
   * @param refresher
   */
  doRefresh(refresher) {
    this.refresher = refresher;

    this.fetchData();
    this.is_refreshing = true;
  }

  /**
   * Fetch the data to server
   */
  fetchData() {
    let thisApp = this;

    // the application is still fetch data to server
    if (thisApp.is_refreshing || thisApp.is_fetching) {
      return;
    }

    // fetch data to server
    thisApp.is_fetching = true;

    thisApp.cart.content().subscribe(function (res) {
      let data = res.data;
      thisApp.cart_details = res.data;

      // new data
      thisApp.data_list = data.item;

      // development
      WBHelper.log('Data: ' + JSON.stringify(data.item));

      thisApp.completeFetch();
    }, function (error) {
      thisApp.completeFetch();
    });
  }

  /**
   * Fetch completed
   */
  completeFetch() {
    this.init_loading = false;
    this.is_fetching = false;
    this.is_refreshing = false;

    if (this.refresher) {
      this.refresher.complete();
    }
  }

  /**
   * Remove to cart
   *
   * @param product_id
   */
  removeToCart(product_id) {
    let thisApp = this;

    thisApp.actionSheetCtrl.create({
      title: 'Are you sure to delete this item to cart?',
      buttons: [
        {
          text: 'YES delete this item on my cart.',
          role: 'destructive',
          handler: () => {
            let loading = WBView.loading(thisApp.loadingCtrl, 'Removing item on cart...');

            thisApp.cart.destroy(product_id).subscribe(function (response) {
              loading.dismiss();
              WBHelper.showToast('Your item is successfully remove to cart.');

              // refresh
              thisApp.fetchData();
            }, function (error) {
              loading.dismiss();
              WBHelper.error('Subscribe Error: ' + error);
            });
          }
        }, {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            WBHelper.log('Cancel clicked');
          }
        }
      ]
    }).present();
  }

  /**
   * Update the quantity
   *
   * @param product_id
   */
  updateQuantity(product_id) {
    let thisApp = this;
    WBHelper.log('Update Quantity Modal');

    let modal = this.modalCtrl.create(ECommerceCartItemQuantityModal, {
      id: product_id
    });

    modal.onDidDismiss(data => {
      if (data) {
        WBHelper.log(data);

        thisApp.fetchData();
        this.is_refreshing = true;
      }
    });

    modal.present();
  }

  /**
   * Clear items on cart
   */
  clearCart() {
    let thisApp = this;

    thisApp.actionSheetCtrl.create({
      title: 'Are you sure to clear your cart?',
      buttons: [
        {
          text: 'YES clear and delete ALL items on my cart.',
          role: 'destructive',
          handler: () => {
            let loading = WBView.loading(thisApp.loadingCtrl, 'Removing all items on cart...');

            thisApp.cart.clear().subscribe(function (response) {
              loading.dismiss();
              WBHelper.showToast('Your cart is successfully cleared.');

              // refresh
              thisApp.fetchData();
            }, function (error) {
              loading.dismiss();
              WBHelper.error('Subscribe Error: ' + error);
            });
          }
        }, {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            WBHelper.log('Cancel clicked');
          }
        }
      ]
    }).present();
  }

  /**
   * Show product details
   *
   * @param id
   */
  showProduct(id) {
    WBHelper.log('Product: ' + id);

    this.nav.push(ECommerceProductShowPage, {
      id: id
    });
  }

  /**
   * Proceed to checkout
   */
  checkout() {
    this.nav.push(ECommerceCartCheckoutPage);
  }

}
