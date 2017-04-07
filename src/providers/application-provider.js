"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
var core_1 = require("@angular/core");
/**
 * @author Archie Disono on 2016-05-08.
 * @url https://github.com/disono/Ionic-Framework-Template
 * @license Apache 2.0
 */
var ApplicationProvider = (function () {
  function ApplicationProvider(appProvider) {
    this.appProvider = appProvider;
    console.log('Application Settings Provider Provider Called.');
  }

  /**
   * UserProvider
   * Save the data to authenticated user
   *
   * @param id
   * @returns {any}
   */
  ApplicationProvider.prototype.index = function () {
    return this.appProvider.get('application', null, function (res) {
      console.debug('ApplicationProvider-index: ' + res);
    });
  };
  ApplicationProvider = __decorate([
    core_1.Injectable()
  ], ApplicationProvider);
  return ApplicationProvider;
}());
exports.ApplicationProvider = ApplicationProvider;
