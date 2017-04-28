import {Injectable} from "@angular/core";
import {APDProvider} from "../../apd-provider";
import {WBHelper} from "../../../lib/helper";

/**
 * @author Archie Disono on 2016-05-08.
 * @url https://github.com/disono/Ionic-Framework-Template
 * @license Apache 2.0
 */
@Injectable()
export class ECommerceProduct {

  constructor(public appProvider: APDProvider) {
    WBHelper.log('ECommerce Product Called.');
  }

  /**
   * Product categories
   *
   * @returns {any}
   */
  index(parameters) {
    return this.appProvider.get('e-commerce/product', parameters, function (res) {
      WBHelper.log('Product: ' + res);
    });
  }

  /**
   * Get product details
   *
   * @param id
   * @returns {any}
   */
  show(id) {
    return this.appProvider.get('e-commerce/product/show/' + id, null, function (res) {
      WBHelper.log('Product show: ' + res);
    });
  }

}
