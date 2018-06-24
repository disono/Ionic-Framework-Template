/**
 * @author          Archie, Disono (webmonsph@gmail.com)
 * @link            https://webmons.com
 * @copyright       Webmons Development Studio. (webmons.com), 2018
 * @license         Apache, 2.0 https://github.com/disono/Ionic-Framework-Template/blob/master/LICENSE
 */

import {Component, ViewChild} from '@angular/core';
import {Nav} from 'ionic-angular';
import {HomePage} from "../../home/home";
import {AuthProvider} from "../../../providers/auth";
import {LoginPage} from "../../authentication/login/login";
import {AboutPage} from "../../page/about/about";
import {PrivacyPage} from "../../page/privacy/privacy";
import {TermsPage} from "../../page/terms/terms";
import {SettingsTabPage} from "../../user/settings/settings.tab";

@Component({
  templateUrl: 'drawer.html'
})
export class DrawerMenu {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = HomePage;
  me = this.authProvider.user();

  pages: Array<{ title: string, component: any }>;

  constructor(private authProvider: AuthProvider) {

  }

  ionViewDidEnter() {
    this.createMenu();
  }

  createMenu() {
    // used for an example of ngFor and navigation
    this.pages = [
      {title: 'Home', component: HomePage},

      // Pages
      {title: 'About', component: AboutPage},
      {title: 'Privacy', component: PrivacyPage},
      {title: 'Terms & Condition', component: TermsPage},

      {title: 'Logout', component: null}
    ];
  }

  openPage(page) {
    let thisApp = this;

    if (page.title === 'Logout') {
      this.authProvider.logout()
        .subscribe(function (response) {
          thisApp.nav.setRoot(LoginPage);
        }, function (e) {

        });
      return;
    }

    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  openSettings() {
    this.nav.setRoot(SettingsTabPage);
  }
}
