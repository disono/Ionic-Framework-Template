/**
 * @author Archie, Disono (webmonsph@gmail.com)
 * @git https://github.com/disono/Ionic-Framework-Template
 * @copyright Webmons Development Studio. (webmons.com), 2016-2017
 * @license Apache, 2.0 https://github.com/disono/Ionic-Framework-Template/blob/master/LICENSE
 */

import {Component} from "@angular/core";
import {AlertController, LoadingController, NavController} from "ionic-angular";
import {AuthProvider} from "../../../providers/auth-provider";
import {ECommerceCart} from "../../../providers/ecommerce/cart/cart";
import {ApplicationProvider} from "../../../providers/application-provider";
import {ECommerceCartSuccessPage} from "./success";
import {WBView} from "../../../lib/views";
import {WBConfig} from "../../../lib/config";
import {WBHelper} from "../../../lib/helper";

declare let cordova;

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
    shipping_address: ((this.user.address && this.user.address != null) ? this.user.address : ''),

    // card mode
    card_first_name: this.user.first_name,
    card_last_name: this.user.last_name,
    card_type: 'visa',
    card_number: '',
    card_exp_month: '',
    card_exp_yr: '',
    card_cvv: '',
  };

  cart_details = null;
  payment_types = [];
  voucher_code = null;
  payment_type_details = null;

  is_card_mode = false;

  constructor(public nav: NavController, public auth: AuthProvider, public cart: ECommerceCart, public applicationData: ApplicationProvider,
              public loadingCtrl: LoadingController, public alertCtrl: AlertController) {
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
      WBHelper.error('Subscribe Error: ' + error);
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
        let name = this.payment_types[i].name.toLowerCase();

        // is mode of payment using card
        if (name == 'credit card' || name == 'debit card' || name == 'credit-card' || name == 'debit-card') {
          this.is_card_mode = true;
        }

        return;
      }
    }

    this.is_card_mode = false;
    this.payment_type_details = null;
  }

  /**
   * Apply voucher
   */
  voucherApply() {
    let thisApp = this;

    if (thisApp.voucher_code) {
      WBHelper.log('Voucher Code: ' + thisApp.voucher_code);
      let loading = WBView.loading(thisApp.loadingCtrl, 'Applying Voucher...');

      thisApp.cart.voucher(thisApp.voucher_code).subscribe(function (response) {
        loading.dismiss();

        thisApp.fetchData();
      }, function (error) {
        loading.dismiss();

        WBHelper.error('Subscribe Error: ' + error);
      });
    }
  }

  /**
   * Remove the current voucher or discount
   */
  removeVoucher() {
    let thisApp = this;

    if (thisApp.voucher_code) {
      WBHelper.log('Voucher Remove Code: ' + thisApp.voucher_code);
      let loading = WBView.loading(thisApp.loadingCtrl, 'Removing Voucher...');

      thisApp.cart.removeVoucher().subscribe(function (response) {
        loading.dismiss();

        thisApp.fetchData();
      }, function (error) {
        loading.dismiss();

        WBHelper.error('Subscribe Error: ' + error);
      });
    }
  }

  /**
   * Proceed to place your order
   */
  placeOrder() {
    let thisApp = this;

    // check if on card mode
    // check if all details of card if applied
    // do not continue if the fields is not field-up
    if (thisApp.is_card_mode) {
      if (!thisApp.inputs.card_first_name || !thisApp.inputs.card_last_name || !thisApp.inputs.card_type || !thisApp.inputs.card_number || !thisApp.inputs.card_exp_month || !thisApp.inputs.card_exp_yr || !thisApp.inputs.card_cvv) {
        WBView.alert(thisApp.alertCtrl, 'Required Fields', 'Please fill all the required fields for you card payment');
        return;
      }
    }

    let loading = WBView.loading(thisApp.loadingCtrl, 'Placing your order...');
    thisApp.cart.place(thisApp.inputs).subscribe(function (response) {
      loading.dismiss();

      // process the response
      thisApp.processOrderResponse(thisApp, response);
    }, function (error) {
      loading.dismiss();

      WBHelper.error('Subscribe Error: ' + error);
    });
  }

  /**
   * Order response
   *
   * @param thisApp
   * @param response
   */
  processOrderResponse(thisApp, response) {
    if (response.data.id) {
      thisApp.paymentProcessingDone();
    } else if (response.data.redirect) {
      // let's use browser (InAppBrowser) to process our payment's
      let inAppBrowserRef = cordova.InAppBrowser.open(response.data.redirect, '_blank', 'location=no,zoom=no');

      // something is done loading (url)
      inAppBrowserRef.addEventListener('loadstop', function (event) {
        // the only default payment processor is IGS for now
        let card_processor = 'IGS';
        let target_url = WBConfig.dev_domain + '/e-commerce/payment-processor/redirect/' + card_processor;
        let event_url = event.url.substring(0, event.url.indexOf('?'));

        if (event_url == target_url) {
          setTimeout(function () {
            inAppBrowserRef.close();

            thisApp.paymentProcessingDone();
          }, 5000);
        }
      });

      // the browser closed
      inAppBrowserRef.addEventListener('exit', function (event) {
        thisApp.paymentProcessingDone();
      });
    } else {
      // just process the success page
      thisApp.paymentProcessingDone();
    }
  }

  /**
   * Payment done
   */
  paymentProcessingDone() {
    let thisApp = this;

    thisApp.fetchData();
    thisApp.nav.setRoot(ECommerceCartSuccessPage);
  }

}
