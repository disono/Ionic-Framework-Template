"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
var core_1 = require("@angular/core");
var ionic_native_1 = require("ionic-native");
var config_1 = require("../lib/config");
var views_1 = require("../lib/views");
var login_1 = require("../pages/authentication/login");
var drawer_1 = require("../pages/drawer/drawer");
var socket_1 = require("../lib/socket");
var helper_1 = require("../lib/helper");
var MyApp = (function () {
  function MyApp(platform, auth, loadingCtrl, alertCtrl) {
    this.platform = platform;
    this.auth = auth;
    this.loadingCtrl = loadingCtrl;
    this.alertCtrl = alertCtrl;
    this.initializeApp();
  }

  /**
   * Initialize the app
   */
  MyApp.prototype.initializeApp = function () {
    var _this = this;
    this.platform.ready().then(function () {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      ionic_native_1.StatusBar.styleDefault();
      ionic_native_1.Splashscreen.hide();
      var thisApp = _this;
      // check if user is authenticated
      if (thisApp.auth.check()) {
        // drawer menus
        thisApp.rootPage = drawer_1.DrawerPage;
      }
      else {
        _this.rootPage = login_1.LoginPage;
      }
      // run the application data
      thisApp.run();
      // event listener for syncing application
      socket_1.WBSocket.emitter.addListener('sync_application', function () {
        thisApp.run();
      });
    });
  };
  /**
   * Run the application
   */
  MyApp.prototype.run = function () {
    var thisApp = this;
    if (!thisApp.auth.check()) {
      return;
    }
    // save the new authenticated user (Sync data)
    var loading = views_1.WBView.loading(thisApp.loadingCtrl, 'Syncing...');
    // sync any data on server
    thisApp.auth.sync().subscribe(function (res) {
      loading.dismiss();
      // run the application
      thisApp.initializeData();
    }, function (error) {
      loading.dismiss();
      // run the application
      thisApp.initializeData();
    });
  };
  /**
   * Initialized required data
   */
  MyApp.prototype.initializeData = function () {
    var thisApp = this;
    // store the FCM token
    if (config_1.WBConfig.enableFCM) {
      FCMPlugin.getToken(function (token) {
        // send the token to server
        thisApp.auth.fcm_token(thisApp.auth.user().id, token);
      }, function (err) {
        views_1.WBView.alert(thisApp.alertCtrl, 'FCM Error', 'Error retrieving token: ' + err);
      });
    }
    // watch user's position (really)
    if (config_1.WBConfig.watchPosition) {
      helper_1.WBHelper.watchPosition(function (position) {
        // register session
        thisApp.sentLocation();
      }, function (error) {
      });
    }
    // web sockets
    thisApp.socketReceiver();
  };
  /**
   * Waiting for socket
   */
  MyApp.prototype.socketReceiver = function () {
    var thisApp = this;
    var session = thisApp.auth.user();
    socket_1.WBSocket.connect(function () {
      // on connected
      // register session
      thisApp.sentLocation();
      // messenger
      socket_1.WBSocket.on('message_session_' + session.id, function (data) {
        if (!config_1.WBConfig.private_message_on_view) {
          helper_1.WBHelper.notify('New Message (' + data.from_full_name + ')', data.limit_message);
        }
        else {
          socket_1.WBSocket.emitter.emitEvent('msg_received', [data]);
        }
      });
    }, function () {
      // events
    }, function () {
      // disconnect
      socket_1.WBSocket.emit('destroy_session', {
        token_key: session.token_key
      });
    });
  };
  /**
   * Sent the current location as session registration
   */
  MyApp.prototype.sentLocation = function () {
    var session = this.auth.user();
    session.lat = config_1.WBConfig.lat;
    session.lng = config_1.WBConfig.lng;
    socket_1.WBSocket.emit('register_session', session);
  };
  MyApp = __decorate([
    core_1.Component({
      template: "<ion-nav [root]=\"rootPage\"></ion-nav>"
    })
  ], MyApp);
  return MyApp;
}());
exports.MyApp = MyApp;
