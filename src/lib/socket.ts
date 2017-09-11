/**
 * @author Archie, Disono (webmonsph@gmail.com)
 * @git https://github.com/disono/Ionic-Framework-Template
 * @copyright Webmons Development Studio. (webmons.com), 2016-2017
 * @license Apache, 2.0 https://github.com/disono/Ionic-Framework-Template/blob/master/LICENSE
 */

import {WBConfig} from "./config";
import {WBHelper} from "./helper";

declare let io;
declare let EventEmitter;

let _WBSocket = (function () {
  return {
    socket: null,
    emitter: new EventEmitter(),

    /**
     * Connect
     */
    connect: function (connectCallback, eventCallback, disconnectCallback) {
      this.socket = io.connect(WBConfig.socket_uri());

      // on connect
      this.socket.on('connect', function () {
        WBHelper.log('SocketIO is Connected!');
        connectCallback();
      });

      // event
      this.socket.on('event', function (data) {
        WBHelper.log('SocketIO Event Received!');
        eventCallback();
      });

      // on disconnect
      this.socket.on('disconnect', function () {
        WBHelper.log('SocketIO Disconnected!');
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
        if (!data) {
          return;
        }

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
      let auth = this.auth();

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
      return WBHelper.getItem('user', true);
    }
  };
}());

export let WBSocket = _WBSocket;
