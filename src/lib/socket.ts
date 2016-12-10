/**
 * @description SocketIO helpers
 * @file socket.ts
 *
 * @author Archie Disono
 * @url https://github.com/disono/Ionic-Framework-Template
 * @license Apache 2.0
 */

import {WBConfig} from "./config";

declare let io;
declare let EventEmitter;

let _WBSocket = (function () {
  return {
    socket: null,
    emitter: new EventEmitter(),

    /**
     * Connect
     */
    connect: function () {
      this.socket = io.connect(WBConfig.socket_uri());
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
    }
  };
}());

export let WBSocket = _WBSocket;
