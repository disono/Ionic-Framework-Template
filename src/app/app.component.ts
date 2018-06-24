/**
 * @author          Archie, Disono (webmonsph@gmail.com)
 * @link            https://webmons.com
 * @copyright       Webmons Development Studio. (webmons.com), 2018
 * @license         Apache, 2.0 https://github.com/disono/Ionic-Framework-Template/blob/master/LICENSE
 */

import {Component, ViewChild} from '@angular/core';
import {LoadingController, Nav, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {AuthProvider} from "../providers/auth";
import {DrawerMenu} from "../pages/menu/drawer/drawer";
import {LoginPage} from "../pages/authentication/login/login";
import {WBViews} from "../libraries/views";
import {VerifyPage} from "../pages/authentication/verify/verify";

@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav>`
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;

  constructor(private platform: Platform, private statusBar: StatusBar, private splashScreen: SplashScreen,
              private authProvider: AuthProvider, private loadingCtrl: LoadingController) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.defaultPage();
    });
  }

  defaultPage() {
    // check if authenticated
    if (this.authProvider.user()) {
      this.sync();
    } else {
      this.rootPage = LoginPage;
    }
  }

  sync() {
    let thisApp = this;
    let loader = WBViews.loading(this.loadingCtrl, 'Syncing...');
    this.authProvider.sync()
      .subscribe(function (response) {
        loader.dismiss();

        if (thisApp.authProvider.user().is_email_verified === 1) {
          thisApp.rootPage = DrawerMenu;
        } else {
          thisApp.rootPage = VerifyPage;
        }
      }, function (e) {
        loader.dismiss();
        thisApp.rootPage = DrawerMenu;
      });
  }
}
