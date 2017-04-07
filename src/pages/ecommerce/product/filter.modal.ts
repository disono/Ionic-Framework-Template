import {Component} from "@angular/core";
import {NavController, NavParams, ViewController} from "ionic-angular";
import {ECommerceProductCategories} from "../../../providers/ecommerce/product/category";

/**
 * @author Archie Disono
 * @url https://github.com/disono/Ionic-Framework-Template
 * @license Apache 2.0
 */

@Component({
  templateUrl: 'filter.modal.html'
})
export class ECommerceProductFilterModal {
  filter = this.params.get('filter');
  categories = [];

  constructor(public nav: NavController, public viewCtrl: ViewController, public params: NavParams, public category: ECommerceProductCategories) {
    console.log('Filter Data: ' + params.get('filter'));

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
      console.error('Subscribe Error: ' + error);
    });
  }

  /**
   * Apply the filter and search
   */
  search() {
    console.log('Searching...');

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
    console.log('Modal filter cancelled...');

    this.viewCtrl.dismiss();
  }

}
