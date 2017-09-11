/**
 * @author Archie, Disono (webmonsph@gmail.com)
 * @git https://github.com/disono/Ionic-Framework-Template
 * @copyright Webmons Development Studio. (webmons.com), 2016-2017
 * @license Apache, 2.0 https://github.com/disono/Ionic-Framework-Template/blob/master/LICENSE
 */

import {Injectable} from "@angular/core";
import {APDProvider} from "./apd-provider";
import {WBHelper} from "../lib/helper";

@Injectable()
export class UserProvider {

  constructor(public appProvider: APDProvider) {
    WBHelper.log('UserProvider Provider Called.');
  }

  /**
   * User List
   *
   * @param params
   * @returns {any}
   */
  index(params) {
    return this.appProvider.get('users', params, function (res) {
      WBHelper.log('UserProvider-index: ' + res);
    });
  }

  /**
   * UserProvider
   * Save the data to authenticated user
   *
   * @param id
   * @returns {any}
   */
  show(id) {
    return this.appProvider.get('user/' + id, null, function (res) {
      WBHelper.log('UserProvider-show: ' + res);
    });
  }

}
