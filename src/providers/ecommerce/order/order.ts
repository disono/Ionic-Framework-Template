import {Injectable} from "@angular/core";
import {AppProvider} from "../../app-provider";

/**
 * @author Archie Disono on 2016-05-08.
 * @url https://github.com/disono/Ionic-Framework-Template
 * @license Apache 2.0
 */
@Injectable()
export class ECommerceOrder {

  constructor(public appProvider: AppProvider) {
    console.log('ECommerce Orders Called.');
  }

  /**
   * Orders
   *
   * @returns {any}
   */
  index(page) {
    return this.appProvider.get('e-commerce/order', {
      page: page
    }, function (res) {
      console.debug('Order-index: ' + res);
    });
  }

  /**
   * Show ordered items
   *
   * @param id
   * @returns {any}
   */
  show(id) {
    return this.appProvider.get('e-commerce/order/show/' + id, null, function (res) {
      console.debug('Order-show: ' + res);
    });
  }

}
