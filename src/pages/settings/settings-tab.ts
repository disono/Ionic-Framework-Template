/**
 * @author Archie, Disono (webmonsph@gmail.com)
 * @git https://github.com/disono/Ionic-Framework-Template
 * @copyright Webmons Development Studio. (webmons.com), 2016-2017
 * @license Apache, 2.0 https://github.com/disono/Ionic-Framework-Template/blob/master/LICENSE
 */

import {Component} from "@angular/core";
import {GeneralPage} from "./general";
import {SecurityPage} from "./security";

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
