/**
 * @author Archie, Disono (webmonsph@gmail.com)
 * @git https://github.com/disono/Ionic-Framework-Template
 * @copyright Webmons Development Studio. (webmons.com), 2016-2017
 * @license Apache, 2.0 https://github.com/disono/Ionic-Framework-Template/blob/master/LICENSE
 */

import {Component} from "@angular/core";
import {NavController, NavParams, ViewController} from "ionic-angular";
import {ECommerceProductCategories} from "../../../providers/ecommerce/product/category";
import {WBHelper} from "../../../lib/helper";

@Component({
  templateUrl: 'filter.modal.html'
})
export class ECommerceProductFilterModal {
  filter = this.params.get('filter');
  categories = [];

  constructor(public nav: NavController, public viewCtrl: ViewController, public params: NavParams, public category: ECommerceProductCategories) {
    WBHelper.log('Filter Data: ' + params.get('filter'));

    if (!this.filter.product_category_id) {
      this.filter.product_category_id = '';
    }

    this.fetchCategories();
  }

  /**
   * Product categories
   */
  fetchCategories() {
    let thisApp = this;
    this.category.index().subscribe(function (response) {
      thisApp.categories = response.data;
    }, function (error) {
      WBHelper.error('Subscribe Error: ' + error);
    });
  }

  /**
   * Apply the filter and search
   */
  search() {
    WBHelper.log('Searching...');

    this.viewCtrl.dismiss(this.filter);
  }

  /**
   * On toggle change
   *
   * @param type
   * @param value
   */
  onChangeToggle(type, value) {
    if (type == 'sale') {
      if (value) {
        this.filter.is_sale = 1;
      } else {
        this.filter.is_sale = 0;
      }
    }

    if (type == 'latest') {
      if (value) {
        this.filter.is_latest = 1;
      } else {
        this.filter.is_latest = 0;
      }
    }
  }

  /**
   * Close the modal
   */
  dismiss() {
    WBHelper.log('Modal filter cancelled...');

    this.viewCtrl.dismiss();
  }

}
