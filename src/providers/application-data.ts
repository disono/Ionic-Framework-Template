import {Injectable} from "@angular/core";
import {AppProvider} from "./app-provider";

/**
 * @author Archie Disono on 2016-05-08.
 * @url https://github.com/disono/Ionic-Framework-Template
 * @license Apache 2.0
 */
@Injectable()
export class ApplicationData {

  constructor(public appProvider: AppProvider) {
    console.log('ApplicationData Provider Called.');
  }

  /**
   * User
   * Save the data to authenticated user
   *
   * @param id
   * @returns {any}
   */
  index() {
    return this.appProvider.get('application', null, function (res) {
      console.debug('ApplicationData-index: ' + res);
    });
  }

}
