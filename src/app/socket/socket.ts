import io from 'socket.io-client';
import {Configurations} from "../../environments/config";
import {StorageHelper} from "../disono/storage";
import {SecurityHelper} from "../disono/security";
import {NavigatorHelper} from "../disono/navigator";
import {Events} from '@ionic/angular';
import {Injectable} from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class SocketHelper {
    private storageHelper = new StorageHelper();
    private securityHelper = new SecurityHelper();
    private navigatorHelper = new NavigatorHelper();
    private config = new Configurations();

    private me = null;
    private token = null;
    private socket = null;
    private options = null;
    private intervalTimer = null;
    private isConnected = null;
    private publishEvents = [];

    private maxReconnect = 10;
    private reconnectionThreshold = 0;

    constructor(public events: Events) {

    }

    init(events = []) {
        this.me = this.storageHelper.fetch('user', true);

        if (!this.isConnected) {
            let soc = this.connect();
            soc.onConnect();
            soc.onDisconnect();
            soc.onConnectionError();
            soc.setEvents(events);
            soc.subscribeEvents();
        }

        return this;
    }

    connect() {
        this.reCreateBearer();
        this.socket = io(this.config.socketURI, this.options);

        return this;
    }

    onConnect() {
        let self = this;

        self.socket.on('connect', function () {
            self.navigatorHelper.log('onConnect: ' + self.socket.id);
            self.isConnected = self.socket.id;
            self.storageHelper.set('onSocketConnect', self.isConnected);
            self.clearReconnection();
        });
    }

    isOnline() {
        return this.storageHelper.fetch('onSocketConnect');
    }

    onDisconnect() {
        let self = this;

        self.socket.on('disconnect', function () {
            self.navigatorHelper.log('onDisconnect');

            self.destroyConnection();
            self.reconnect();
        });
    }

    onConnectionError() {
        let self = this;

        self.socket.on('connect_error', function (e) {
            self.navigatorHelper.log('onConnectionError: ' + e);
            self.reCreateBearer();
        });
    }

    destroyConnection() {
        if (this.socket) {
            this.isConnected = null;
            this.storageHelper.remove('onSocketConnect');
            this.socket.disconnect();
            this.socket.close();
            this.navigatorHelper.log('destroyConnection');
        }
    }

    onSubscribe(name, callback) {
        this.navigatorHelper.log(this.appName() + '_' + name);
        this.socket.on(this.appName() + '_' + name, callback);
    }

    publish(to, data) {
        this.socket.emit(this.appName() + '_onServerSubscribe', {to: to, data: data});
    }

    fetchEvents() {
        return this.publishEvents;
    }

    addEvents(name) {
        this.publishEvents.push(name);
    }

    private setEvents(name) {
        if (!name) {
            return;
        }

        if (Array.isArray(name)) {
            for (let i = 0; i < name.length; i++) {
                this.publishEvents.push(name[i]);
            }
        } else {
            this.publishEvents.push(name);
        }
    }

    private subscribeEvents() {
        let self = this;
        self.publishEvents.forEach((name) => {
            self.onSubscribe(name, data => {
                self.navigatorHelper.log('Publishing (' + name + ')...');
                self.events.publish('sckSubscriber_' + name, data);
            });
        });
    }

    private reconnect() {
        let self = this;

        self.intervalTimer = setInterval(() => {
            self.navigatorHelper.log('Started Reconnection...');
            if (self.clearReconnection()) {
                return;
            }

            self.navigatorHelper.log('Reconnecting...');
            self.destroyConnection();
            self.init();
        }, 3000);
    }

    private clearReconnection() {
        this.reconnectionThreshold++;

        if (!this.me || this.isConnected || (this.maxReconnect > 0 && this.reconnectionThreshold >= this.maxReconnect)) {
            if (this.intervalTimer) {
                this.reconnectionThreshold = 0;
                clearInterval(this.intervalTimer);
            }

            return true;
        }

        return false;
    }

    private createOptions() {
        return {
            transportOptions: {
                polling: {
                    extraHeaders: {
                        'authorization': 'Bearer ' + this.token,
                        'source': 'mobile',
                        'app-name': this.appName(),
                        'tkey': this.me ? String(this.me.token.key) : null,
                        'uid': this.me ? String(this.me.id) : null
                    }
                }
            }
        };
    }

    private reCreateBearer() {
        this.token = this.securityHelper.token(1);
        this.options = this.createOptions();
    }

    private appName() {
        let settings = this.storageHelper.fetch('settings', true);
        return settings ? settings.socketIOAppName.value : '';
    }
}