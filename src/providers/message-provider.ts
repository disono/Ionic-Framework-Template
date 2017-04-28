import {Injectable} from "@angular/core";
import {APDProvider} from "./apd-provider";
import {WBHelper} from "../lib/helper";

/**
 * @author Archie Disono on 2016-05-08.
 * @url https://github.com/disono/Ionic-Framework-Template
 * @license Apache 2.0
 */
@Injectable()
export class MessageProvider {

  constructor(public appProvider: APDProvider) {
    WBHelper.log('Message Provider Called.');
  }

  /**
   * Inbox
   *
   * @returns {any}
   */
  inbox(page) {
    return this.appProvider.get('message/inbox', {
      page: page
    }, function (res) {
      WBHelper.log('Message-inbox: ' + res);
    });
  }

  /**
   * Reading messages from
   *
   * @param from_id
   * @param page
   * @returns {any}
   */
  reading(from_id, page) {
    return this.appProvider.get('message/reading/' + from_id, {
      page: page
    }, function (res) {
      WBHelper.log('Message-reading: ' + res);
    });
  }

  /**
   * Group messages
   *
   * @param group_id
   * @returns {any}
   */
  group(group_id) {
    return this.appProvider.get('message/group/' + group_id, null, function (res) {
      WBHelper.log('Message-group: ' + res);
    });
  }

  /**
   * Send message and upload files
   *
   * @param to_id
   * @param parameters
   * @param successCallback
   * @param errorCallback
   */
  send(to_id, parameters, successCallback, errorCallback) {
    this.appProvider.upload('message/send/' + to_id, parameters, function (res) {
      // success
      successCallback(res);
    }, function (res) {
      // errors
      errorCallback(res);
    });
  }

}
