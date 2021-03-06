import {Component, ElementRef, QueryList, ViewChildren} from '@angular/core';
import {Router} from '@angular/router';
import {
    ActionSheetController,
    AlertController,
    Events,
    IonRouterOutlet,
    LoadingController,
    MenuController,
    ModalController,
    NavController,
    PickerController,
    Platform,
    PopoverController
} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {ListenerHelper} from "./disono/listener";
import {AuthService} from "./services/auth/auth.service";
import {FCM} from "@ionic-native/fcm/ngx";
import {NavigatorHelper} from "./disono/navigator";
import {Configurations} from "../environments/config";
import {ViewHelper} from "./disono/view";
import {StorageHelper} from "./disono/storage";
import {SocketHelper} from "./socket/socket";

declare let cordova;

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html'
})
export class AppComponent {
    public showMenu = false;
    @ViewChildren(IonRouterOutlet) routerOutlets: QueryList<IonRouterOutlet>;
    private pageRoutes = [];
    private listenerHelper = new ListenerHelper();
    private isPause = false;

    private sck = null;

    constructor(
        private router: Router,
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private events: Events,
        private navCtrl: NavController,
        private menuCtrl: MenuController,
        private actionSheetCtrl: ActionSheetController,
        private popOverCtrl: PopoverController,
        private modalCtrl: ModalController,
        private alertCtrl: AlertController,
        private pickerCtrl: PickerController,
        private loadingCtrl: LoadingController,
        private element: ElementRef<HTMLElement>,
        public authService: AuthService,
        private viewHelper: ViewHelper,
        private fcm: FCM,
        private navigatorHelper: NavigatorHelper,
        private config: Configurations,
        private storageHelper: StorageHelper,
        private socketHelper: SocketHelper
    ) {

    }

    ngOnInit() {
        this.initializeApp();
    }

    ionViewDidEnter() {

    }

    private initializeApp() {
        let self = this;

        self.platform.ready().then(() => {
            self.statusBar.styleDefault();
            self.splashScreen.hide();
            self.listenerHelper.onBackButton(self);

            self.subscribeToEvents();
        });
    }

    private init() {
        let self = this;

        if (self.authService.user()) {
            self.viewHelper.loadingPresent('Syncing...').then(() => {
                // sync
                self.sync();
            });
        }
    }

    private sync() {
        let self = this;
        self.authService.sync().subscribe((response) => {
            self.viewHelper.loadingDismiss().then(() => {
                // set the default page (Dashboard)
                self.setDefaultPage(response);
            });
        }, (e) => {
            self.viewHelper.loadingDismiss().then(() => {
                self.navigatorHelper.confirm({
                    btnOk: 'Retry,Logout',
                    title: 'Failed',
                    desc: 'Syncing failed: ' + e,
                    callback: i => {
                        if (i === 1) {
                            self.init();
                        } else {
                            self.isShowMenu(false);
                            self.logout();
                        }
                    }
                });
            });
        });
    }

    private setDefaultPage(response) {
        let self = this;

        if (!response.data.setting) {
            return;
        }

        self.storageHelper.set('settings', response.data.setting, true);

        if (response.data.setting.socketIO.value === 'enabled') {
            self.initSocket(response);
        }

        if (response.data.setting.fcm.value === 'enabled') {
            self.initFireBase(response, () => {

            });
        }
    }

    private initFireBase(response, callback) {
        let self = this;

        if (self.config.browser === true) {
            return;
        }

        // get a token from FCM server
        self.fcm.getToken().then(token => {
            // send token to server
            self.authService.storeFCMToken(token).subscribe(() => {
                // subscribe to topic
                response.data.setting.fcmTopics.value.forEach(value => {
                    if (value) {
                        self.fcm.subscribeToTopic(value).then(() => {

                        });
                    }
                });

                // received a notification
                self.fcm.onNotification().subscribe(data => {

                }, e => {
                    self.navigatorHelper.toast('FCM Error(Notification): ' + e);
                });

                callback();
            }, e => {
                callback();
            });
        }, e => {
            self.navigatorHelper.toast('FCM Error(Token): ' + e);
            callback();
        });
    }

    private initSocket(response) {
        let self = this;
        let me = self.authService.user();

        response.data.setting.socketIOTopics.value.push(me.token.token);
        self.sck = self.socketHelper.init(response.data.setting.socketIOTopics.value);

        self.sck.fetchEvents().forEach((name) => {
            self.events.subscribe('sckSubscriber_' + name, data => {
                if (self.config.browser) {
                    self.navigatorHelper.log('sckSubscriber_' + name + ':' + data);
                    return;
                }

                if (self.isInBackground()) {
                    cordova.plugins.notification.local.schedule({
                        title: data.title,
                        text: data.content
                    });
                }
            });
        });
    }

    private initMenuRoutes() {
        this.pageRoutes = [
            {url: '/dashboard', icon: 'home', title: 'Home', click: null},
            {url: '/user/settings/general', icon: 'cog', title: 'Settings', click: null},
            {url: '/page/about', icon: 'information', title: 'About', click: null},
            {url: '/page/terms_and_condition', icon: 'ios-paper', title: 'Terms', click: null},
            {url: '/page/privacy', icon: 'ios-unlock', title: 'Privacy', click: null},
            {url: null, icon: 'log-out', title: 'Logout', click: 'logout'}
        ];
    }

    private subscribeToEvents() {
        let self = this;

        self.events.subscribe('onLogout', () => {
            self.logout();
        });

        self.events.subscribe('onSync', () => {
            self.init();
            self.initMenuRoutes();
        });

        self.events.subscribe('eventShowMenu', (isShow) => {
            self.isShowMenu(isShow);
            self.init();
            self.initMenuRoutes();
        });

        if (!self.config.browser) {
            document.addEventListener("resume", self.onResume, false);
            document.addEventListener("pause", self.onPause, false);
            cordova.plugins.backgroundMode.enable();
        }
    }

    private onResume() {
        this.isPause = false;
    }

    private onPause() {
        this.isPause = true;
    }

    private isInBackground() {
        return this.isPause && cordova.plugins.backgroundMode.isActive();
    }

    private clickAction(action) {
        if (action === 'logout') {
            this.logout();
        }
    }

    private isShowMenu(isShow) {
        let self = this;
        self.showMenu = isShow;
        self.menuCtrl.enable(isShow, 'MenuDrawerMain').then(() => {
        });
    }

    private logout() {
        let self = this;

        // disable background service
        if (!self.config.browser) {
            cordova.plugins.backgroundMode.disable();
        }

        // disconnect to socket
        if (self.sck) {
            self.sck.destroyConnection();
        }

        // sent logout to server
        self.authService.logout().subscribe(response => {
            self.navigateRoute('/auth/login');
        }, e => {
            self.navigateRoute('/auth/login');
        });
    }

    private navigateRoute(path) {
        let self = this;
        this.navCtrl.navigateRoot(path).then(() => {
            self.isShowMenu(false);
        });
    }

}
