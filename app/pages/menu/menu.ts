import {Page} from "ionic-angular";
import {TabsPage} from "../settings/tab";
import {HomePage} from "../home/home";
import {ViewChild} from "@angular/core";
import {Nav} from 'ionic-angular';

/*
  Generated class for the MenuPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/menu/menu.html',
})
export class MenuPage {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;
  pages: Array<{title: string, component: any}>;

  constructor() {
    this.pages = [
      {title: 'Dashboard', component: HomePage},
      {title: 'Settings', component: TabsPage}
    ];
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
