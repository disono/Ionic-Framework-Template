"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
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
var MessageProvider = (function () {
  function MessageProvider(appProvider) {
    this.appProvider = appProvider;
    console.log('Message Provider Called.');
  }

  /**
   * Inbox
   *
   * @returns {any}
   */
  MessageProvider.prototype.inbox = function (page) {
    return this.appProvider.get('message/inbox', {
      page: page
    }, function (res) {
      console.debug('Message-inbox: ' + res);
    });
  };
  /**
   * Reading messages from
   *
   * @param from_id
   * @param page
   * @returns {any}
   */
  MessageProvider.prototype.reading = function (from_id, page) {
    return this.appProvider.get('message/reading/' + from_id, {
      page: page
    }, function (res) {
      console.debug('Message-reading: ' + res);
    });
  };
  /**
   * Group messages
   *
   * @param group_id
   * @returns {any}
   */
  MessageProvider.prototype.group = function (group_id) {
    return this.appProvider.get('message/group/' + group_id, null, function (res) {
      console.debug('Message-group: ' + res);
    });
  };
  /**
   * Send message and upload files
   *
   * @param to_id
   * @param parameters
   * @param successCallback
   * @param errorCallback
   */
  MessageProvider.prototype.send = function (to_id, parameters, successCallback, errorCallback) {
    this.appProvider.upload('message/send/' + to_id, parameters, function (res) {
      // success
      successCallback(res);
    }, function (res) {
      // errors
      errorCallback(res);
    });
  };
  MessageProvider = __decorate([
    core_1.Injectable()
  ], MessageProvider);
  return MessageProvider;
}());
exports.MessageProvider = MessageProvider;
