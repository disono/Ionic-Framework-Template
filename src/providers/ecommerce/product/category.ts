import {Injectable} from "@angular/core";
import {AppProvider} from "../../app-provider";

/**
 * @author Archie Disono on 2016-05-08.
 * @url https://github.com/disono/Ionic-Framework-Template
 * @license Apache 2.0
 */
@Injectable()
export class ECommerceProductCategories {

  constructor(public appProvider: AppProvider) {
    console.log('ECommerce Product Category Called.');
  }

  /**
   * Product categories
   *
   * @returns {any}
   */
  index() {
    return this.appProvider.get('e-commerce/product/category', null, function (res) {
      console.debug('Product-categories: ' + res);
    });
  }

}
