/**
 * @author Archie, Disono (webmonsph@gmail.com)
 * @git https://github.com/disono/Ionic-Framework-Template
 * @copyright Webmons Development Studio. (webmons.com), 2016-2017
 * @license Apache, 2.0 https://github.com/disono/Ionic-Framework-Template/blob/master/LICENSE
 */

import {Component, NgModule} from "@angular/core";
import {ModalController, NavController} from "ionic-angular";
import {MessageProvider} from "../../providers/message-provider";
import {ReadingInboxPage} from "./reading.inbox";
import {UserListPage} from "../user/user.list";
import {WBHelper} from "../../lib/helper";
import {IonicImageLoader} from "ionic-image-loader";

@NgModule({
  imports: [
    IonicImageLoader
  ]
})
@Component({
  templateUrl: 'inbox.html'
})
export class InboxPage {
  data_list: any;
  init_loading: boolean;

  page: number;

  is_refreshing: boolean;
  is_fetching: boolean;

  refresher: any;
  infiniteScroll: any;

  constructor(public nav: NavController, public messageProvider: MessageProvider, public modalCtrl: ModalController) {
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

    thisApp.messageProvider.inbox(thisApp.page).subscribe(function (res) {
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
   * Reading message
   *
   * @param from_id
   */
  readingMessage(from_id) {
    this.nav.push(ReadingInboxPage, {
      from_id: from_id
    })
  }

  /**
   * Search user page
   */
  searchUser() {
    let thisApp = this;

    let searchListModal = thisApp.modalCtrl.create(UserListPage, {
      return_page: 'modal',
      nav: thisApp.nav
    });

    searchListModal.onDidDismiss(data => {
      if (data) {
        // list of messages
        thisApp.readingMessage(data.user_id);
      }
    });

    searchListModal.present();
  }
}
