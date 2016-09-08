/// <reference path="../typings/index.d.ts" />
import {Component} from "@angular/core";
import {Platform, ionicBootstrap} from "ionic-angular";
import {StatusBar} from "ionic-native";
import {LoginPage} from "./pages/login/login";
import {MenuPage} from "./pages/menu/menu";
import {Auth} from "./providers/auth/auth";

@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>',
  providers: [
    Auth
  ]
})
export class MyApp {
  private rootPage: any;

  constructor(private platform: Platform, public auth: Auth) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();

      if (this.auth.check()) {
        this.rootPage = MenuPage;
      } else {
        this.rootPage = LoginPage;
      }
    });
  }
}

ionicBootstrap(MyApp);
