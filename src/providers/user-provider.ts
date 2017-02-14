import {Injectable} from "@angular/core";
import {APDProvider} from "./apd-provider";

/**
 * @author Archie Disono on 2016-05-08.
 * @url https://github.com/disono/Ionic-Framework-Template
 * @license Apache 2.0
 */
@Injectable()
export class UserProvider {

  constructor(public appProvider: APDProvider) {
    console.log('UserProvider Provider Called.');
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
      console.debug('UserProvider-show: ' + res);
    });
  }

}
