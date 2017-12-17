/**
 * @author Archie, Disono (webmonsph@gmail.com)
 * @url https://github.com/disono/Ionic-Framework-Template
 * @copyright Webmons Development Studio. (webmons.com), 2016-2017
 * @license Apache, 2.0 https://github.com/disono/Ionic-Framework-Template/blob/master/LICENSE
 */

import {Component} from "@angular/core";
import {NavController} from "ionic-angular";
import {ECommerceProductListPage} from "../product/product.list";

@Component({
  templateUrl: 'success.html'
})
export class ECommerceCartSuccessPage {

  constructor(public nav: NavController) {

  }

  productList() {
    this.nav.setRoot(ECommerceProductListPage)
  }

}
