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
import {FCM} from '@ionic-native/fcm';
import {WBHelper} from "../libraries/helper";

@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav>`
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;

  constructor(private platform: Platform, private statusBar: StatusBar, private splashScreen: SplashScreen,
              private authProvider: AuthProvider, private loadingCtrl: LoadingController, private fcm: FCM) {
    this.initializeApp();
  }

  initializeApp() {
    let thisApp = this;
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      thisApp.statusBar.styleDefault();
      thisApp.splashScreen.hide();
      thisApp.defaultPage();
    });
  }

  private defaultPage() {
    // check if authenticated
    if (this.authProvider.user()) {
      this.sync();
    } else {
      this.rootPage = LoginPage;
    }
  }

  private sync() {
    let thisApp = this;
    let loader = WBViews.loading(this.loadingCtrl, 'Syncing...');
    this.authProvider.sync()
      .subscribe(function (response) {
        if (thisApp.authProvider.user().is_email_verified === 1) {
          if (response.data.setting.fcm.value === 'enabled') {
            thisApp.FCM(response, function () {
              loader.dismiss();
              thisApp.rootPage = DrawerMenu;
            });
            return;
          }

          loader.dismiss();
          thisApp.rootPage = DrawerMenu;
        } else {
          loader.dismiss();
          thisApp.rootPage = VerifyPage;
        }
      }, function (e) {
        loader.dismiss();
        thisApp.rootPage = DrawerMenu;
      });
  }

  private FCM(response, callback) {
    let thisApp = this;

    // subscribe to topic
    if (response.data.setting) {
      response.data.setting.fcm_topics.value.forEach(function (value, index) {
        if (value) {
          thisApp.fcm.subscribeToTopic(value);
        }
      });
    }

    // send the token to server
    thisApp.fcm.getToken().then(token => {
      thisApp.sendToken(thisApp, token, callback);
    }, function (e) {
      WBHelper.showToast('Get Error: ' + e);
      callback();
    });

    // received a notification
    thisApp.fcm.onNotification().subscribe(data => {

    }, function (e) {
      WBHelper.showToast('Msg Error: ' + e);
    });
  }

  private sendToken(thisApp, token, callback) {
    thisApp.authProvider.token(token)
      .subscribe(function () {
        callback();
      }, function (e) {
        callback();
      });
  }
}
