"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
var core_1 = require("@angular/core");
var general_1 = require("./general");
var security_1 = require("./security");
/**
 * @author Archie Disono
 * @url https://github.com/disono/Ionic-Framework-Template
 * @license Apache 2.0
 */
var SettingsTabPage = (function () {
  function SettingsTabPage() {
    // this tells the tabs component which Pages
    // should be each tab's root Page
    this.generalRoot = general_1.GeneralPage;
    this.securityRoot = security_1.SecurityPage;
  }

  SettingsTabPage = __decorate([
    core_1.Component({
      templateUrl: 'settings-tab.html'
    })
  ], SettingsTabPage);
  return SettingsTabPage;
}());
exports.SettingsTabPage = SettingsTabPage;
