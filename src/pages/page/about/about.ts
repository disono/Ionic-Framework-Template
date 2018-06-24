/**
 * @author          Archie, Disono (webmonsph@gmail.com)
 * @link            https://webmons.com
 * @copyright       Webmons Development Studio. (webmons.com), 2018
 * @license         Apache, 2.0 https://github.com/disono/Ionic-Framework-Template/blob/master/LICENSE
 */

import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {PageProvider} from "../../../providers/page";

@Component({
  templateUrl: 'about.html'
})
export class AboutPage {
  page = null;

  constructor(public navCtrl: NavController, private pageProvider: PageProvider) {

  }

  ionViewDidEnter() {
    this.fetch();
  }

  fetch() {
    let thisApp = this;
    thisApp.pageProvider.show('about')
      .subscribe(function (response) {
        thisApp.page = response.data;
      }, function (e) {

      });
  }
}
