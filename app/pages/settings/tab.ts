import {Component} from "@angular/core";
import {SettingsPage} from "../settings/settings";
import {SecurityPage} from "../settings/security";

@Component({
  templateUrl: 'build/pages/settings/tab.html'
})
export class TabsPage {
  private tabGeneral: any;
  private tabSecurity: any;

  constructor() {
    // this tells the tabs component which Pages
    // should be each tab's root Page
    this.tabGeneral = SettingsPage;
    this.tabSecurity = SecurityPage;
  }
}
