import {Injectable} from "@angular/core";
import {APDProvider} from "./apd-provider";
import {WBHelper} from "../lib/helper";

/**
 * @author Archie Disono on 2016-05-08.
 * @url https://github.com/disono/Ionic-Framework-Template
 * @license Apache 2.0
 */
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
