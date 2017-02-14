import {Injectable} from "@angular/core";
import {APDProvider} from "../../apd-provider";

/**
 * @author Archie Disono on 2016-05-08.
 * @url https://github.com/disono/Ionic-Framework-Template
 * @license Apache 2.0
 */
@Injectable()
export class ECommerceCart {

  constructor(public appProvider: APDProvider) {
    console.log('ECommerce Cart Called.');
  }

  /**
   * Product categories
   *
   * @returns {any}
   */
  content() {
    return this.appProvider.get('e-commerce/cart', null, function (res) {
      console.debug('Product content: ' + res);
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
      console.debug('Product add: ' + res);
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
      console.debug('Product update: ' + res);
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
      console.debug('Product add: ' + res);
    });
  }

  /**
   * Clear items on cart
   *
   * @returns {any}
   */
  clear() {
    return this.appProvider.get('e-commerce/cart/clear', null, function (res) {
      console.debug('Product clear: ' + res);
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
      console.debug('Product clear: ' + res);
    });
  }

  /**
   * Remove voucher code
   *
   * @returns {any}
   */
  removeVoucher() {
    return this.appProvider.get('e-commerce/cart/voucher/remove', null, function (res) {
      console.debug('Product clear: ' + res);
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
      console.debug('Product place: ' + res);
    });
  }

}
