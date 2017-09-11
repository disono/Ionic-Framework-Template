/**
 * @author Archie, Disono (webmonsph@gmail.com)
 * @git https://github.com/disono/Ionic-Framework-Template
 * @copyright Webmons Development Studio. (webmons.com), 2016-2017
 * @license Apache, 2.0 https://github.com/disono/Ionic-Framework-Template/blob/master/LICENSE
 */

import {Component, NgModule} from "@angular/core";
import {NavController, NavParams} from "ionic-angular";
import {ECommerceOrder} from "../../../providers/ecommerce/order/order";
import {WBHelper} from "../../../lib/helper";
import {IonicImageLoader} from "ionic-image-loader";

@NgModule({
  imports: [
    IonicImageLoader
  ]
})
@Component({
  templateUrl: 'order.details.html'
})
export class ECommerceOrderDetailsPage {
  data_list: any;
  init_loading: boolean;

  is_refreshing: boolean;
  is_fetching: boolean;

  refresher: any;

  constructor(public nav: NavController, public order: ECommerceOrder, public params: NavParams) {
    this.init();

    this.fetchData();
    this.is_refreshing = true;
  }

  init() {
    this.init_loading = true;
    this.refresher = null;
    this.is_fetching = false;

    this.data_list = [];
  }

  /**
   * Pull refresh
   *
   * @param refresher
   */
  doRefresh(refresher) {
    this.refresher = refresher;

    this.fetchData();
    this.is_refreshing = true;
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

    thisApp.order.show(thisApp.params.get('id')).subscribe(function (res) {
      let data = res.data;
      thisApp.data_list = res.data;

      // development
      WBHelper.log('Data: ' + JSON.stringify(data.item));

      thisApp.completeFetch();
    }, function (error) {
      thisApp.completeFetch();
    });
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
  }

}
