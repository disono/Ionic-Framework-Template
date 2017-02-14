import {Component} from "@angular/core";
import {Platform, LoadingController, AlertController} from "ionic-angular";
import {StatusBar, Splashscreen} from "ionic-native";
import {AuthProvider} from "../providers/auth-provider";
import {WBConfig} from "../lib/config";
import {WBView} from "../lib/views";
import {LoginPage} from "../pages/authentication/login";
import {DrawerPage} from "../pages/drawer/drawer";
import {WBSocket} from "../lib/socket";
import {WBHelper} from "../lib/helper";

declare let FCMPlugin;

@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav>`
})
export class MyApp {
  rootPage: any;

  constructor(public platform: Platform, public auth: AuthProvider,
              public loadingCtrl: LoadingController, public alertCtrl: AlertController) {
    this.initializeApp();
  }

  /**
   * Initialize the app
   */
  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();

      let thisApp = this;

      // check if user is authenticated
      if (thisApp.auth.check()) {
        // drawer menus
        thisApp.rootPage = DrawerPage;
      } else {
        this.rootPage = LoginPage;
      }

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

    if (!thisApp.auth.check()) {
      return;
    }

    // save the new authenticated user (Sync data)
    let loading = WBView.loading(thisApp.loadingCtrl, 'Syncing...');

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
  }

  /**
   * Initialized required data
   */
  initializeData() {
    let thisApp = this;

    // store the FCM token
    if (WBConfig.enableFCM) {
      FCMPlugin.getToken(
        function (token) {
          // send the token to server
          thisApp.auth.fcm_token(thisApp.auth.user().id, token);
        },
        function (err) {
          WBView.alert(thisApp.alertCtrl, 'FCM Error', 'Error retrieving token: ' + err);
        }
      );
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
    thisApp.socketReceiver();
  }

  /**
   * Waiting for socket
   */
  socketReceiver() {
    let thisApp = this;
    let session = thisApp.auth.user();

    WBSocket.connect(function () {
      // on connected

      // register session
      thisApp.sentLocation();

      // messenger
      WBSocket.on('message_session_' + session.id, function (data) {
        if (!WBConfig.private_message_on_view) {
          WBHelper.notify('New Message (' + data.from_full_name + ')', data.limit_message);
        } else {
          WBSocket.emitter.emitEvent('msg_received', [data]);
        }
      });
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
   * Sent the current location as session registration
   */
  sentLocation() {
    let session = this.auth.user();
    session.lat = WBConfig.lat;
    session.lng = WBConfig.lng;
    WBSocket.emit('register_session', session);
  }
}
