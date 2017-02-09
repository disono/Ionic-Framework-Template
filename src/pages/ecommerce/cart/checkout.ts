import {Component} from "@angular/core";
import {NavController, LoadingController} from "ionic-angular";
import {Auth} from "../../../providers/auth";
import {ECommerceCart} from "../../../providers/ecommerce/cart/cart";
import {ApplicationData} from "../../../providers/application-data";
import {ECommerceCartSuccessPage} from "./success";
import {WBView} from "../../../lib/views";

/**
 * @author Archie Disono
 * @url https://github.com/disono/Ionic-Framework-Template
 * @license Apache 2.0
 */

@Component({
  templateUrl: 'checkout.html'
})
export class ECommerceCartCheckoutPage {
  user = this.auth.user();
  inputs = {
    full_name: this.user.full_name,
    phone: this.user.phone,
    email: this.user.email,

    payment_type_id: '',

    billing_address: ((this.user.address && this.user.address != null) ? this.user.address : ''),
    shipping_address: ((this.user.address && this.user.address != null) ? this.user.address : '')
  };

  cart_details = null;
  payment_types = [];
  voucher_code = null;
  payment_type_details = null;

  constructor(public nav: NavController, public auth: Auth, public cart: ECommerceCart, public applicationData: ApplicationData,
              public loadingCtrl: LoadingController) {
    this.fetchData();
  }

  /**
   * Load all data time at a time
   */
  fetchData() {
    let thisApp = this;

    thisApp.cartDetails(function () {
      thisApp.paymentTypes(function () {
        // done loading
      });
    });
  }

  /**
   * Cart details
   */
  cartDetails(callback) {
    let thisApp = this;

    thisApp.cart.content().subscribe(function (res) {
      thisApp.cart_details = res.data;

      callback();
    }, function (error) {
      thisApp.nav.pop();
    });
  }

  /**
   * Payment types
   */
  paymentTypes(callback) {
    let thisApp = this;

    thisApp.applicationData.index().subscribe(function (response) {
      let data = response.data;

      thisApp.payment_types = data.payment_types;
      callback();
    }, function (error) {
      console.error('Subscribe Error: ' + error);
    });
  }

  /**
   * Payment type description
   *
   * @param $event
   * @param id
   */
  paymentTypeSelected($event, id) {
    for (let i = 0; i < this.payment_types.length; i++) {
      if (id == this.payment_types[i].id) {
        this.payment_type_details = this.payment_types[i].description;
        return;
      }
    }

    this.payment_type_details = null;
  }

  /**
   * Apply voucher
   */
  voucherApply() {
    let thisApp = this;

    if (thisApp.voucher_code) {
      console.log('Voucher Code: ' + thisApp.voucher_code);
      let loading = WBView.loading(thisApp.loadingCtrl, 'Applying Voucher...');

      thisApp.cart.voucher(thisApp.voucher_code).subscribe(function (response) {
        loading.dismiss();

        thisApp.fetchData();
      }, function (error) {
        loading.dismiss();

        console.error('Subscribe Error: ' + error);
      });
    }
  }

  /**
   * Remove the current voucher or discount
   */
  removeVoucher() {
    let thisApp = this;

    if (thisApp.voucher_code) {
      console.log('Voucher Remove Code: ' + thisApp.voucher_code);
      let loading = WBView.loading(thisApp.loadingCtrl, 'Removing Voucher...');

      thisApp.cart.removeVoucher().subscribe(function (response) {
        loading.dismiss();

        thisApp.fetchData();
      }, function (error) {
        loading.dismiss();

        console.error('Subscribe Error: ' + error);
      });
    }
  }

  /**
   * Proceed to place your order
   */
  placeOrder() {
    let thisApp = this;

    let loading = WBView.loading(thisApp.loadingCtrl, 'Placing your order...');
    thisApp.cart.place(thisApp.inputs).subscribe(function (response) {
      loading.dismiss();

      thisApp.fetchData();
      thisApp.nav.setRoot(ECommerceCartSuccessPage);
    }, function (error) {
      loading.dismiss();

      console.error('Subscribe Error: ' + error);
    });
  }

}
