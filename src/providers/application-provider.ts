/**
 * @author Archie, Disono (webmonsph@gmail.com)
 * @url https://github.com/disono/Ionic-Framework-Template
 * @copyright Webmons Development Studio. (webmons.com), 2016-2017
 * @license Apache, 2.0 https://github.com/disono/Ionic-Framework-Template/blob/master/LICENSE
 */

import {Injectable} from "@angular/core";
import {APDProvider} from "./apd-provider";
import {WBHelper} from "../lib/helper";

@Injectable()
export class ApplicationProvider {

  constructor(public appProvider: APDProvider) {
    WBHelper.log('Application Settings Provider Provider Called.');
  }

  /**
   * UserProvider
   * Save the data to authenticated user
   *
   * @param id
   * @returns {any}
   */
  index() {
    return this.appProvider.get('application', null, function (res) {
      WBHelper.log('ApplicationProvider-index: ' + res);
    });
  }

}
