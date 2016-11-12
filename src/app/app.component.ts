import {Component} from "@angular/core";
import {Platform} from "ionic-angular";
import {StatusBar, Splashscreen} from "ionic-native";
import {DrawerPage} from "../pages/drawer/drawer";
import {LoginPage} from "../pages/authentication/login";
import {Auth} from "../providers/auth";

@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>'
})
export class MyApp {
  private rootPage: any;

  constructor(platform: Platform, public auth: Auth) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();

      // check if user is authenticated
      if (this.auth.check()) {
        this.rootPage = DrawerPage;
      } else {
        this.rootPage = LoginPage;
      }
    });
  }
}
