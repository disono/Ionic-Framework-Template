import {Component} from "@angular/core";
import {NavController} from "ionic-angular";
import {ECommerceProductListPage} from "../product/product.list";

/**
 * @author Archie Disono
 * @url https://github.com/disono/Ionic-Framework-Template
 * @license Apache 2.0
 */

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
