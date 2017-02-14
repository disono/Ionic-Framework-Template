"use strict";
/**
 * @description SocketIO helpers
 * @file socket.ts
 *
 * @author Archie Disono
 * @url https://github.com/disono/Ionic-Framework-Template
 * @license Apache 2.0
 */
var config_1 = require("./config");
var helper_1 = require("./helper");
var _WBSocket = (function () {
  return {
    socket: null,
    emitter: new EventEmitter(),
    /**
     * Connect
     */
    connect: function (connectCallback, eventCallback, disconnectCallback) {
      this.socket = io.connect(config_1.WBConfig.socket_uri());
      // on connect
      this.socket.on('connect', function () {
        console.log('SocketIO is Connected!');
        connectCallback();
      });
      // event
      this.socket.on('event', function (data) {
        console.log('SocketIO Event Received!');
        eventCallback();
      });
      // on disconnect
      this.socket.on('disconnect', function () {
        console.log('SocketIO Disconnected!');
        disconnectCallback();
      });
    },
    /**
     * Emit data
     *
     * @param name
     * @param data
     */
    emit: function (name, data) {
      if (!this.socket) {
        this.connect();
        return;
      }
      this.socket.emit(name, data);
    },
    /**
     * On event received
     *
     * @param name
     * @param callback
     */
    on: function (name, callback) {
      if (!this.socket) {
        this.connect();
        return;
      }
      this.socket.on(name, function (data) {
        callback(data);
      });
    },
    /**
     * Disconnect
     */
    disconnect: function () {
      if (!this.socket) {
        return;
      }
      // authenticated user
      var auth = this.auth();
      // sent delete destroy session using token key
      if (auth) {
        this.emit('destroy_session', {
          token_key: auth.token_key
        });
      }
      this.socket.disconnect();
      this.socket = null;
    },
    /**
     * Off listener
     * note that socket.off, socket.removeListener, socket.removeAllListeners, socket.removeEventListener are synonyms.
     *
     * @param name
     */
    off: function (name) {
      if (!this.socket) {
        return;
      }
      // to un-subscribe all listeners of an event
      this.socket.off(name);
    },
    /**
     * Authenticated user
     *
     * @returns {string}
     */
    auth: function () {
      return helper_1.WBHelper.getItem('user', true);
    }
  };
}());
exports.WBSocket = _WBSocket;
