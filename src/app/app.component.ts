import {Component} from "@angular/core";
import {Platform} from "ionic-angular";
import {StatusBar, Splashscreen} from "ionic-native";
import {DrawerPage} from "../pages/drawer/drawer";
import {LoginPage} from "../pages/authentication/login";
import {Auth} from "../providers/auth";
import {WBCONFIG} from "../lib/config";

declare let FCMPlugin;

@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav>`
})
export class MyApp {
  rootPage: any;

  constructor(platform: Platform, public auth: Auth) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();

      let thisApp = this;

      // check if user is authenticated
      if (thisApp.auth.check()) {
        thisApp.rootPage = DrawerPage;

        // store the FCM token
        if (WBCONFIG.enableFCM) {
          FCMPlugin.getToken(
            function (token) {
              // send the token to server
              thisApp.auth.fcm_token(thisApp.auth.user().id, token);
            },
            function (err) {
              alert('error retrieving token: ' + err);
            }
          );
        }
      } else {
        this.rootPage = LoginPage;
      }
    });
  }
}
