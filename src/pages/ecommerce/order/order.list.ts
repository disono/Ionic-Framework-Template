/**
 * @author Archie, Disono (webmonsph@gmail.com)
 * @url https://github.com/disono/Ionic-Framework-Template
 * @copyright Webmons Development Studio. (webmons.com), 2016-2017
 * @license Apache, 2.0 https://github.com/disono/Ionic-Framework-Template/blob/master/LICENSE
 */

import {Component} from "@angular/core";
import {NavController} from "ionic-angular";
import {ECommerceOrder} from "../../../providers/ecommerce/order/order";
import {ECommerceOrderDetailsPage} from "./order.details";
import {WBHelper} from "../../../lib/helper";

@Component({
  templateUrl: 'order.list.html'
})
export class ECommerceOrderListPage {
  data_list: any;
  init_loading: boolean;

  page: number;

  is_refreshing: boolean;
  is_fetching: boolean;

  refresher: any;
  infiniteScroll: any;

  constructor(public nav: NavController, public order: ECommerceOrder) {
    this.init();

    this.fetchData();
    this.is_refreshing = true;
  }

  init() {
    this.init_loading = true;
    this.refresher = null;
    this.is_fetching = false;
    this.infiniteScroll = null;

    this.data_list = [];
    this.page = 1;
  }

  /**
   * Pull refresh
   *
   * @param refresher
   */
  doRefresh(refresher) {
    this.refresher = refresher;
    this.page = 1;

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

    thisApp.order.index(thisApp.page).subscribe(function (res) {
      // reset data if refreshing
      if (thisApp.is_refreshing) {
        thisApp.data_list = [];
      }

      // format data
      for (let i = 0; i < res.data.length; i++) {
        thisApp.data_list.push(res.data[i]);
      }

      // development
      WBHelper.log('Page: ' + thisApp.page + ' Data: ' + JSON.stringify(res.data));

      // update the page
      if (res.data.length) {
        thisApp.page++;
      }

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

    if (this.infiniteScroll) {
      this.infiniteScroll.complete();
    }
  }

  /**
   * Show ordered items
   *
   * @param id
   */
  itemSelected(id) {
    this.nav.push(ECommerceOrderDetailsPage, {
      id: id
    })
  }

}
