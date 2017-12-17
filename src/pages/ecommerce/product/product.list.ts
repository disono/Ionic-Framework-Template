/**
 * @author Archie, Disono (webmonsph@gmail.com)
 * @url https://github.com/disono/Ionic-Framework-Template
 * @copyright Webmons Development Studio. (webmons.com), 2016-2017
 * @license Apache, 2.0 https://github.com/disono/Ionic-Framework-Template/blob/master/LICENSE
 */

import {Component, NgModule} from "@angular/core";
import {ModalController, NavController} from "ionic-angular";
import {ECommerceProduct} from "../../../providers/ecommerce/product/product";
import {AuthProvider} from "../../../providers/auth-provider";
import {ECommerceCart} from "../../../providers/ecommerce/cart/cart";
import {WBHelper} from "../../../lib/helper";
import {ECommerceProductShowPage} from "./product.show";
import {ECommerceProductFilterModal} from "./filter.modal";
import {LoginPage} from "../../authentication/login";
import {ECommerceCartContentPage} from "../cart/content";
import {IonicImageLoader} from "ionic-image-loader";

@NgModule({
  imports: [
    IonicImageLoader
  ]
})
@Component({
  templateUrl: 'product.list.html'
})
export class ECommerceProductListPage {
  rowNumGrid = 0;
  data_list = [];
  init_loading = true;

  is_refreshing = false;
  is_fetching = false;

  refresher = null;
  infiniteScroll = null;

  filter = {
    search: null,

    min_srp: null,
    max_srp: null,

    product_category_id: null,

    is_sale: null,
    is_latest: null,
    is_featured: null,

    page: 1
  };

  constructor(public nav: NavController, public product: ECommerceProduct, public authProvider: AuthProvider, public cart: ECommerceCart,
              public modalCtrl: ModalController) {

  }

  ionViewDidLoad() {
    let thisApp = this;

    thisApp.init();
  }

  init() {
    this.init_loading = true;
    this.refresher = null;
    this.infiniteScroll = null;
    this.is_fetching = false;

    this.data_list = [];
    this.filter.page = 1;

    // fetch data
    this.fetchData();
    this.is_refreshing = true;
  }

  /**
   * Pull refresh
   *
   * @param refresher
   */
  doRefresh(refresher) {
    this.refresher = refresher;
    this.filter.page = 1;

    this.fetchData();
    this.is_refreshing = true;
  }

  /**
   * Infinite scroll
   *
   * @param infiniteScroll
   */
  doInfinite(infiniteScroll) {
    this.infiniteScroll = infiniteScroll;

    this.fetchData();
  }

  /**
   * Fetch the data to server
   */
  fetchData() {
    let thisApp = this;

    // the application is still fetch data to server
    if (thisApp.is_refreshing || thisApp.is_fetching) {
      return;
    }

    // fetch data to server
    thisApp.is_fetching = true;

    thisApp.product.index(thisApp.filter).subscribe(function (res) {
      // reset data if refreshing
      if (thisApp.is_refreshing) {
        thisApp.rowNumGrid = 0;
        thisApp.data_list = [];
      }

      // format data
      thisApp.formatListDataToGrid(res.data);

      // development
      WBHelper.log('Page: ' + thisApp.filter.page + ' Data: ' + JSON.stringify(res.data));

      // update the page
      if (res.data.length) {
        thisApp.filter.page++;
      }

      thisApp.completeFetch();
    }, function (error) {
      thisApp.completeFetch();
    });
  }

  /**
   * Format data list to grid
   *
   * @param data
   */
  formatListDataToGrid(data) {
    let thisApp = this;

    // counter to iterate over the rows in the grid
    let iterator = (data.length == 1) ? 1 : 2;

    // iterate data
    for (let i = 0; i < data.length; i += iterator) {
      // declare two elements per row
      let innerIterator = (data[i] && data[i + 1]) ? 2 : 1;
      thisApp.data_list[thisApp.rowNumGrid] = Array(innerIterator);

      // check dat exists
      if (data[i]) {
        // insert data
        thisApp.data_list[thisApp.rowNumGrid][0] = data[i];
      }

      // repeat for the second data
      if (data[i + 1]) {
        thisApp.data_list[thisApp.rowNumGrid][1] = data[i + 1]
      }

      // go on to the next row
      thisApp.rowNumGrid++;
    }
  }

  /**
   * Fetch completed
   */
  completeFetch() {
    this.init_loading = false;
    this.is_fetching = false;
    this.is_refreshing = false;

    if (this.refresher) {
      this.refresher.complete();
    }

    if (this.infiniteScroll) {
      this.infiniteScroll.complete();
    }
  }

  /**
   * Search products open the modals for filters
   */
  searchProducts() {
    let thisApp = this;
    WBHelper.log('Search Products.');

    let modal = this.modalCtrl.create(ECommerceProductFilterModal, {
      filter: thisApp.filter
    });

    modal.onDidDismiss(data => {
      if (data) {
        WBHelper.log(data);
        thisApp.filter.page = 1;
        thisApp.filter = data;

        thisApp.fetchData();
        this.is_refreshing = true;
      }
    });

    modal.present();
  }

  /**
   * Add to cart
   *
   * @param product_id
   */
  addToCart(product_id) {
    let thisApp = this;

    if (thisApp.authProvider.check()) {
      thisApp.storeToCart(product_id);
    } else {
      // show the login page (modal)
      let loginModal = thisApp.modalCtrl.create(LoginPage, {
        return_page: 'modal',
        nav: thisApp.nav
      });

      loginModal.onDidDismiss(data => {
        thisApp.storeToCart(product_id);
      });

      loginModal.present();
    }
  }

  /**
   * Store to cart the item
   *
   * @param product_id
   */
  storeToCart(product_id) {
    let thisApp = this;

    thisApp.cart.add(product_id).subscribe(function (response) {
      WBHelper.showToast('Your item is successfully added to cart.');

      thisApp.nav.setRoot(ECommerceCartContentPage);
    }, function (error) {
      WBHelper.error('Subscribe Error: ' + error);
    });
  }

  /**
   * Show product details
   *
   * @param id
   */
  showProduct(id) {
    WBHelper.log('Product: ' + id);

    this.nav.push(ECommerceProductShowPage, {
      id: id
    });
  }

  /**
   * String limit
   *
   * @param str
   * @returns {string}
   */
  stringLimit(str) {
    return (str.length > 14) ? str.substring(0, 14) + '...' : str;
  }
}
