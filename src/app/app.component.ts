import {Component} from "@angular/core";
import {AlertController, LoadingController, Platform} from "ionic-angular";
import {StatusBar} from "@ionic-native/status-bar";
import {SplashScreen} from "@ionic-native/splash-screen";
import {AuthProvider} from "../providers/auth-provider";
import {WBConfig} from "../lib/config";
import {WBView} from "../lib/views";
import {DrawerPage} from "../pages/drawer/drawer";
import {WBSocket} from "../lib/socket";
import {WBHelper} from "../lib/helper";

declare let FCMPlugin;

@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav>`
})
export class MyApp {
  rootPage: any;

  constructor(public platform: Platform, public authProvider: AuthProvider,
              public loadingCtrl: LoadingController, public alertCtrl: AlertController,
              public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();
  }

  /**
   * Initialize the app
   */
  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      let thisApp = this;

      // check if user is authenticated
      // drawer menus
      thisApp.rootPage = DrawerPage;

      // run the application data
      thisApp.run();

      // event listener for syncing application
      WBSocket.emitter.addListener('sync_application', function () {
        thisApp.run();
      });
    });
  }

  /**
   * Run the application
   */
  run() {
    let thisApp = this;

    if (!thisApp.authProvider.check()) {
      return;
    }

    // save the new authenticated user (Sync data)
    let loading = WBView.loading(thisApp.loadingCtrl, 'Syncing...');

    // sync any data on server
    thisApp.authProvider.sync().subscribe(function (res) {
      loading.dismiss();

      // run the application
      thisApp.initializeData(function () {
        thisApp.syncDone();
      });
    }, function (error) {
      loading.dismiss();

      // run the application
      thisApp.initializeData(function () {
        thisApp.syncDone();
      });
    });
  }

  /**
   * sync done
   */
  syncDone() {
    WBSocket.emitter.emitEvent('sync_done');
    WBConfig.initial_loaded = true;
  }

  /**
   * Initialized required data
   */
  initializeData(callback) {
    let thisApp = this;

    // store the FCM token
    if (WBConfig.enableFCM) {
      FCMPlugin.getToken(
        function (token) {
          // send the token to server
          thisApp.authProvider.fcm_token(thisApp.authProvider.user().id, token).subscribe(function (response) {
            callback();
          });
        },
        function (err) {
          callback();

          WBView.alert(thisApp.alertCtrl, 'FCM Error', 'Error retrieving token: ' + err);
        }
      );
    } else {
      callback();
    }

    // watch user's position (really)
    if (WBConfig.watchPosition) {
      WBHelper.watchPosition(function (position) {
        // register session
        thisApp.sentLocation();
      }, function (error) {

      });
    }

    // web sockets
    thisApp.initSocket();
  }

  /**
   * Waiting for socket
   */
  initSocket() {
    let thisApp = this;
    let session = thisApp.authProvider.user();

    if (!WBConfig.enable_web_socket) {
      return;
    }

    WBSocket.connect(function () {
      // on connected

      // register session
      thisApp.sentLocation();

      // web socket receiver
      thisApp.webSocketReceiver(session);
    }, function () {
      // events
    }, function () {
      // disconnect
      WBSocket.emit('destroy_session', {
        token_key: session.token_key
      });
    });
  }

  /**
   * Received data from web socket
   *
   * @param session
   */
  webSocketReceiver(session) {
    // messenger
    WBSocket.on('message_session_' + session.id, function (data) {
      if (!WBConfig.private_message_on_view) {
        WBHelper.notify('New Message (' + data.from_full_name + ')', data.limit_message);
      } else {
        WBSocket.emitter.emitEvent('msg_received', [data]);
      }
    });

    // notification to
    WBSocket.on('notification_' + session.id, function (data) {
      // notify
      WBHelper.notify(data.name, data.content);
    });

    // notification channel
    WBSocket.on('notification_channel_' + session.role, function (data) {
      // notify
      WBHelper.notify(data.name, data.content);
    });
  }

  /**
   * Sent the current location as session registration
   */
  sentLocation() {
    let session = this.authProvider.user();
    session.lat = WBConfig.lat;
    session.lng = WBConfig.lng;
    WBSocket.emit('register_session', session);
  }
}
