import {Injectable} from "@angular/core";
import {APDProvider} from "./apd-provider";

/**
 * @author Archie Disono on 2016-05-08.
 * @url https://github.com/disono/Ionic-Framework-Template
 * @license Apache 2.0
 */
@Injectable()
export class ApplicationProvider {

  constructor(public appProvider: APDProvider) {
    console.log('Application Settings Provider Provider Called.');
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
      console.debug('ApplicationProvider-index: ' + res);
    });
  }

}
