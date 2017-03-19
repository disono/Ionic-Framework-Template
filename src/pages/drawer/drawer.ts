import {ViewChild, Component} from "@angular/core";
import {Nav, ModalController, AlertController} from "ionic-angular";
import {AboutPage} from "../about/about";
import {ContactPage} from "../contact/contact";
import {SettingsTabPage} from "../settings/settings-tab";
import {ECommerceProductListPage} from "../ecommerce/product/product.list";
import {ECommerceCartContentPage} from "../ecommerce/cart/content";
import {ECommerceOrderListPage} from "../ecommerce/order/order.list";
import {InboxPage} from "../message/inbox";
import {LoginPage} from "../authentication/login";
import {AuthProvider} from "../../providers/auth-provider";
import {WBSocket} from "../../lib/socket";

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

  rootPage: any = ECommerceProductListPage;
  pages: Array<{title: string, component: any}>;

  constructor(public auth: AuthProvider, public modalCtrl: ModalController, public alertCtrl: AlertController) {
    let thisApp = this;

    WBSocket.emitter.addListener('sync_application', function () {
      thisApp.setMenus();
    });
  }

  ionViewDidEnter() {
    this.setMenus();
  }

  setMenus() {
    let pages = [];

    if (this.auth.check()) {
      pages.push({title: 'My Cart', component: ECommerceCartContentPage});
      pages.push({title: 'My Orders', component: ECommerceOrderListPage});

      // messenger
      pages.push({title: 'Messages', component: InboxPage});
    } else {
      pages.push({title: 'Login', component: LoginPage});
    }

    // e-commerce
    pages.push({title: 'Products', component: ECommerceProductListPage});

    pages.push({title: 'Contact', component: ContactPage});
    pages.push({title: 'About', component: AboutPage});

    // logout button
    if (this.auth.check()) {
      pages.push({title: 'Logout', component: null});
    }

    this.pages = pages;
  }

  openPage(page) {
    let thisApp = this;

    if (page.title == 'Login') {
      // show the login page (modal)
      let loginModal = thisApp.modalCtrl.create(LoginPage, {
        return_page: 'modal',
        nav: thisApp.nav
      });

      loginModal.onDidDismiss(data => {
        if (data) {
          thisApp.setMenus();
        }
      });

      loginModal.present();
      return;
    } else if (page.title == 'Logout') {
      thisApp.logout();
      return;
    }

    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  /**
   * Profile settings
   */
  profile() {
    this.nav.setRoot(SettingsTabPage);
  }

  /**
   * Logout
   */
  logout() {
    let thisApp = this;

    thisApp.alertCtrl.create({
      title: 'Confirm Logout?',
      message: 'Do you agree to logout?',
      buttons: [
        {
          text: 'Logout',
          handler: () => {
            thisApp.auth.logout();

            // use this.app.getRootNav() for default navigation
            thisApp.nav.setRoot(DrawerPage);

            // let's set the menu after the page loads
            thisApp.setMenus()
          }
        },
        {
          text: 'No',
          handler: () => {
            // do nothing
          }
        }
      ]
    }).present();
  }
}
