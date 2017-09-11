/**
 * @author Archie, Disono (webmonsph@gmail.com)
 * @git https://github.com/disono/Ionic-Framework-Template
 * @copyright Webmons Development Studio. (webmons.com), 2016-2017
 * @license Apache, 2.0 https://github.com/disono/Ionic-Framework-Template/blob/master/LICENSE
 */

import {Component, NgModule} from "@angular/core";
import {NavController, NavParams, ViewController} from "ionic-angular";
import {UserProvider} from "../../providers/user-provider";
import {AuthProvider} from "../../providers/auth-provider";
import {WBHelper} from "../../lib/helper";
import {IonicImageLoader} from "ionic-image-loader";

@NgModule({
  imports: [
    IonicImageLoader
  ]
})
@Component({
  templateUrl: 'user.list.html'
})
export class UserListPage {
  data_list: any;
  init_loading: boolean;

  page: number;

  is_refreshing: boolean;
  is_fetching: boolean;

  refresher: any;
  infiniteScroll: any;

  constructor(public nav: NavController, public params: NavParams, public auth: AuthProvider,
              public viewCtrl: ViewController, public user: UserProvider) {
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

    thisApp.user.index({
      page: thisApp.page,
      role: (thisApp.auth.user().role == 'client') ? 'tel_agent' : ''
    }).subscribe(function (res) {
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
   * Selected User ID
   *
   * @param id
   */
  selectedUser(id) {
    let thisApp = this;

    if (thisApp.params.get('return_page') == 'modal') {
      thisApp.viewCtrl.dismiss({
        user_id: id
      });
    } else if (thisApp.params.get('return_page') == 'page') {
      // do something else

      thisApp.nav.pop();
    } else {
      // do something else
    }
  }

  /**
   * Close the modal
   */
  closeModal() {
    this.viewCtrl.dismiss();
  }

}
