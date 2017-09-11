/**
 * @author Archie, Disono (webmonsph@gmail.com)
 * @git https://github.com/disono/Ionic-Framework-Template
 * @copyright Webmons Development Studio. (webmons.com), 2016-2017
 * @license Apache, 2.0 https://github.com/disono/Ionic-Framework-Template/blob/master/LICENSE
 */

import {Injectable} from "@angular/core";
import {APDProvider} from "../../apd-provider";
import {WBHelper} from "../../../lib/helper";

@Injectable()
export class ECommerceCart {

  constructor(public appProvider: APDProvider) {
    WBHelper.log('ECommerce Cart Called.');
  }

  /**
   * Product categories
   *
   * @returns {any}
   */
  content() {
    return this.appProvider.get('e-commerce/cart', null, function (res) {
      WBHelper.log('Product content: ' + res);
    });
  }

  /**
   * Add item to cart
   *
   * @param product_id
   * @returns {any}
   */
  add(product_id) {
    return this.appProvider.get('e-commerce/cart/add/' + product_id, null, function (res) {
      WBHelper.log('Product add: ' + res);
    });
  }

  /**
   * Update quantity
   *
   * @param id
   * @param quantity
   * @returns {any}
   */
  update(id, quantity) {
    return this.appProvider.get('e-commerce/cart/update/' + id + '/' + quantity, null, function (res) {
      WBHelper.log('Product update: ' + res);
    });
  }

  /**
   * Delete item on cart
   *
   * @param id
   * @returns {any}
   */
  destroy(id) {
    return this.appProvider.get('e-commerce/cart/destroy/' + id, null, function (res) {
      WBHelper.log('Product add: ' + res);
    });
  }

  /**
   * Clear items on cart
   *
   * @returns {any}
   */
  clear() {
    return this.appProvider.get('e-commerce/cart/clear', null, function (res) {
      WBHelper.log('Product clear: ' + res);
    });
  }

  /**
   * Apply voucher code on cart
   *
   * @param code
   * @returns {any}
   */
  voucher(code) {
    return this.appProvider.post('e-commerce/cart/voucher/' + code, null, function (res) {
      WBHelper.log('Product clear: ' + res);
    });
  }

  /**
   * Remove voucher code
   *
   * @returns {any}
   */
  removeVoucher() {
    return this.appProvider.get('e-commerce/cart/voucher/remove', null, function (res) {
      WBHelper.log('Product clear: ' + res);
    });
  }

  /**
   * Place your order
   *
   * @param parameters
   * @returns {any}
   */
  place(parameters) {
    return this.appProvider.post('e-commerce/place', parameters, function (res) {
      WBHelper.log('Product place: ' + res);
    });
  }

}
