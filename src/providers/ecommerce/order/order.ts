import {Injectable} from "@angular/core";
import {APDProvider} from "../../apd-provider";
import {WBHelper} from "../../../lib/helper";

/**
 * @author Archie Disono on 2016-05-08.
 * @url https://github.com/disono/Ionic-Framework-Template
 * @license Apache 2.0
 */
@Injectable()
export class ECommerceOrder {

  constructor(public appProvider: APDProvider) {
    WBHelper.log('ECommerce Orders Called.');
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
      WBHelper.log('Order-index: ' + res);
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
      WBHelper.log('Order-show: ' + res);
    });
  }

}
