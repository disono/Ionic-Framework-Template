import {HomePage} from "../home/home";
import {ViewChild, Component} from "@angular/core";
import {Nav} from "ionic-angular";
import {AboutPage} from "../about/about";
import {ContactPage} from "../contact/contact";
import {SettingsTabPage} from "../settings/settings-tab";

/**
 * @author Archie Disono
 * @url https://github.com/disono/Ionic-Framework-Template
 * @license Apache 2.0
 */

@Component({
  templateUrl: 'drawer.html',
})
export class DrawerPage {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;
  pages: Array<{title: string, component: any}>;

  constructor() {
    this.pages = [
      {title: 'Dashboard', component: HomePage},
      {title: 'Settings', component: SettingsTabPage},
      {title: 'Contact', component: ContactPage},
      {title: 'About', component: AboutPage}
    ];
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
