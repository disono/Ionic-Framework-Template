import {Injectable} from "@angular/core";
import {AppProvider} from "./app-provider";

/**
 * @author Archie Disono on 2016-05-08.
 * @url https://github.com/disono/Ionic-Framework-Template
 * @license Apache 2.0
 */
@Injectable()
export class User {

  constructor(public appProvider: AppProvider) {
    console.log('User Provider Called.');
  }

  /**
   * User
   * Save the data to authenticated user
   *
   * @param id
   * @returns {any}
   */
  show(id) {
    return this.appProvider.get('user/' + id, null, function (res) {
      console.debug('User-show: ' + res);
    });
  }

}
