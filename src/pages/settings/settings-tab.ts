import {Component} from "@angular/core";
import {GeneralPage} from "./general";
import {SecurityPage} from "./security";

/**
 * @author Archie Disono
 * @url https://github.com/disono/Ionic-Framework-Template
 * @license Apache 2.0
 */

@Component({
  templateUrl: 'settings-tab.html'
})
export class SettingsTabPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  generalRoot: any = GeneralPage;
  securityRoot: any = SecurityPage;

  constructor() {

  }
}
