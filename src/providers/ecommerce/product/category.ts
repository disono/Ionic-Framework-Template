/**
 * @author Archie, Disono (webmonsph@gmail.com)
 * @url https://github.com/disono/Ionic-Framework-Template
 * @copyright Webmons Development Studio. (webmons.com), 2016-2017
 * @license Apache, 2.0 https://github.com/disono/Ionic-Framework-Template/blob/master/LICENSE
 */

import {Injectable} from "@angular/core";
import {APDProvider} from "../../apd-provider";
import {WBHelper} from "../../../lib/helper";

@Injectable()
export class ECommerceProductCategories {

  constructor(public appProvider: APDProvider) {
    WBHelper.log('ECommerce Product Category Called.');
  }

  /**
   * Product categories
   *
   * @returns {any}
   */
  index() {
    return this.appProvider.get('e-commerce/product/category', null, function (res) {
      WBHelper.log('Product-categories: ' + res);
    });
  }

}
