/**
 * @author          Archie, Disono (webmonsph@gmail.com)
 * @link            https://webmons.com
 * @copyright       Webmons Development Studio. (webmons.com), 2018
 * @license         Apache, 2.0 https://github.com/disono/Ionic-Framework-Template/blob/master/LICENSE
 */

import {Component} from "@angular/core";
import {LoadingController} from 'ionic-angular';
import {GeneralSettingsPage} from "./general";
import {SecuritySettingsPage} from "./security";
import {AuthProvider} from "../../../providers/auth";
import {WBViews} from "../../../libraries/views";

@Component({
  templateUrl: 'settings.tab.html'
})
export class SettingsTabPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  generalRoot: any = GeneralSettingsPage;
  securityRoot: any = SecuritySettingsPage;

  constructor(private authProvider: AuthProvider, private loadingCtrl: LoadingController) {

  }

  ionViewDidEnter() {
    this.sync();
  }

  sync() {
    let thisApp = this;
    let loader = WBViews.loading(this.loadingCtrl, 'Syncing...');
    thisApp.authProvider.sync()
      .subscribe(function (response) {
        loader.dismiss();
      }, function (e) {
        loader.dismiss();
      });
  }
}
