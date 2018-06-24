webpackJsonp([0],{

/***/ 155:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WBConfig; });
/**
 * @author          Archie, Disono (webmonsph@gmail.com)
 * @link            https://webmons.com
 * @copyright       Webmons Development Studio. (webmons.com), 2018
 * @license         Apache, 2.0 https://github.com/disono/Ionic-Framework-Template/blob/master/LICENSE
 */
var _WBConfig = (function () {
    return {
        development: true,
        isBrowser: false,
        productionURI: 'https://domain/',
        developmentURI: 'http://192.168.1.58:40101/',
        url: function () {
            return ((_WBConfig.development) ? _WBConfig.developmentURI : _WBConfig.productionURI) + 'api/v1/';
        },
    };
}());
var WBConfig = _WBConfig;
//# sourceMappingURL=config.js.map

/***/ }),

/***/ 156:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WBSecurity; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__helper__ = __webpack_require__(23);
/**
 * @author          Archie, Disono (webmonsph@gmail.com)
 * @link            https://webmons.com
 * @copyright       Webmons Development Studio. (webmons.com), 2018
 * @license         Apache, 2.0 https://github.com/disono/Ionic-Framework-Template/blob/master/LICENSE
 */

var _WBSecurity = (function () {
    return {
        /**
         * Create JWT
         *
         * @param secret
         * @param id
         * @param current_time
         *
         * @returns {any}
         */
        jwt: function (secret, id, current_time) {
            var token = null;
            var current = moment(new Date(current_time)).toDate();
            if (!secret) {
                return null;
            }
            try {
                var header = {
                    "alg": "HS256",
                    "typ": "JWT"
                };
                var wordArrayHeader = CryptoJS.enc.Utf8.parse(JSON.stringify(header));
                var base64Header = CryptoJS.enc.Base64.stringify(wordArrayHeader);
                var dataIat = current;
                var dateNbf = current;
                var dataExp = current;
                var sub = id;
                var iat = Math.floor(dataIat.getTime() / 1000);
                var nbf = Math.floor(dateNbf.minusHours(1).getTime() / 1000);
                var exp = Math.floor(dataExp.addHours(2).getTime() / 1000);
                var jti = CryptoJS.MD5("jti." + sub + "." + iat);
                var payload = {
                    // This holds the identifier for the token (defaults to user id)
                    "sub": sub,
                    // When the token was issued (unix timestamp)
                    "iat": iat,
                    // The token expiry date (unix timestamp)
                    "exp": exp,
                    // The earliest point in time that the token can be used (unix timestamp)
                    "nbf": nbf,
                    // A unique identifier for the token (md5 of the sub and iat claims)
                    "jti": jti
                };
                var wordArrayPayload = CryptoJS.enc.Utf8.parse(JSON.stringify(payload));
                var base64Payload = CryptoJS.enc.Base64.stringify(wordArrayPayload);
                var signature = CryptoJS.HmacSHA256(base64Header + "." + base64Payload, secret);
                var base64Sign = CryptoJS.enc.Base64.stringify(signature);
                token = base64Header + "." + base64Payload + "." + base64Sign;
            }
            catch (e) {
                __WEBPACK_IMPORTED_MODULE_0__helper__["a" /* WBHelper */].error(e);
            }
            return token;
        },
        /**
         * JWT auth
         *
         * @returns {any}
         */
        jwtAuth: function () {
            var auth = __WEBPACK_IMPORTED_MODULE_0__helper__["a" /* WBHelper */].getItem('user', true);
            return (auth) ? _WBSecurity.jwt(auth.token.secret, auth.id, _WBSecurity.getDateTimeDiff(auth.jwt_server_difference)) : null;
        },
        /**
         * Server time difference on seconds
         *
         * @param sqlServerTime
         *
         * @returns {number}
         */
        getSecondsDiff: function (sqlServerTime) {
            return WBDateTimeDiff(sqlServerTime);
        },
        /**
         * Get the datetime difference
         *
         * @param seconds
         *
         * @returns {Date}
         */
        getDateTimeDiff: function (seconds) {
            var current_time = new Date();
            seconds = parseInt(seconds);
            if (seconds > 0) {
                // add seconds
                current_time = new Date(current_time.setSeconds(current_time.getSeconds() - seconds));
            }
            else {
                // subtract seconds
                current_time = new Date(current_time.setSeconds(current_time.getSeconds() + Math.abs(seconds)));
            }
            return current_time;
        },
        /**
         * Save auth
         *
         * @param newAuth
         */
        saveAuth: function (newAuth) {
            // let's check if old data is present
            // we must retain the tokens then save it
            var currentAuth = __WEBPACK_IMPORTED_MODULE_0__helper__["a" /* WBHelper */].getItem('user', true);
            if (currentAuth) {
                newAuth.token = currentAuth.token;
                newAuth.server_timestamp = currentAuth.server_timestamp;
                newAuth.jwt_server_difference = _WBSecurity.getSecondsDiff(newAuth.server_timestamp);
            }
            else {
                // server time difference in seconds
                // refresh data if old auth is not available
                newAuth.jwt_server_difference = _WBSecurity.getSecondsDiff(newAuth.server_timestamp);
            }
            // save
            __WEBPACK_IMPORTED_MODULE_0__helper__["a" /* WBHelper */].setItem('user', newAuth, true);
        }
    };
}());
var WBSecurity = _WBSecurity;
//# sourceMappingURL=security.js.map

/***/ }),

/***/ 157:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__libraries_helper__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__base__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__libraries_security__ = __webpack_require__(156);
/**
 * @author          Archie, Disono (webmonsph@gmail.com)
 * @link            https://webmons.com
 * @copyright       Webmons Development Studio. (webmons.com), 2018
 * @license         Apache, 2.0 https://github.com/disono/Ionic-Framework-Template/blob/master/LICENSE
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var UserProvider = /** @class */ (function () {
    function UserProvider(base) {
        this.base = base;
        __WEBPACK_IMPORTED_MODULE_1__libraries_helper__["a" /* WBHelper */].log('User Provider');
    }
    UserProvider.prototype.profile = function (username) {
        return this.base.get('u/' + username, null, function (res) {
            __WEBPACK_IMPORTED_MODULE_1__libraries_helper__["a" /* WBHelper */].log('User-profile: ' + res);
        });
    };
    UserProvider.prototype.updateSettings = function (params) {
        return this.base.upload('user/setting/update', params, function (res) {
            __WEBPACK_IMPORTED_MODULE_1__libraries_helper__["a" /* WBHelper */].log('User-updateSettings: ' + res);
            __WEBPACK_IMPORTED_MODULE_3__libraries_security__["a" /* WBSecurity */].saveAuth(res.data);
        });
    };
    UserProvider.prototype.updateSecurity = function (params) {
        return this.base.post('user/security/update', params, function (res) {
            __WEBPACK_IMPORTED_MODULE_1__libraries_helper__["a" /* WBHelper */].log('User-updateSecurity: ' + res);
            __WEBPACK_IMPORTED_MODULE_3__libraries_security__["a" /* WBSecurity */].saveAuth(res.data);
        });
    };
    UserProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__base__["a" /* BaseProvider */]])
    ], UserProvider);
    return UserProvider;
}());

//# sourceMappingURL=user.js.map

/***/ }),

/***/ 168:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 168;

/***/ }),

/***/ 215:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 215;

/***/ }),

/***/ 23:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WBHelper; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__config__ = __webpack_require__(155);
/**
 * @author          Archie, Disono (webmonsph@gmail.com)
 * @link            https://webmons.com
 * @copyright       Webmons Development Studio. (webmons.com), 2018
 * @license         Apache, 2.0 https://github.com/disono/Ionic-Framework-Template/blob/master/LICENSE
 */

var _WBHelper = (function () {
    return {
        /**
         * Set default values
         *
         * @param params_defaults
         * @param options
         * @returns {any}
         */
        defaults: function (params_defaults, options) {
            for (var prop in params_defaults) {
                // Note: if options would contain some undefined or unnecessary values, you should check for undefined instead.
                options[prop] = (typeof options[prop] !== 'undefined') ? options[prop] : params_defaults[prop];
            }
            params_defaults = options;
            return params_defaults;
        },
        /**
         * Set local storage
         *
         * @param key
         * @param value
         * @param isJson
         */
        setItem: function (key, value, isJson) {
            if (isJson === true) {
                value = JSON.stringify(value);
            }
            window.localStorage.setItem(key, value);
        },
        /**
         * Get local storage
         *
         * @param key
         * @param isJson
         */
        getItem: function (key, isJson) {
            var value = window.localStorage.getItem(key);
            if (isJson === true && value != null) {
                value = JSON.parse(value);
            }
            return value;
        },
        /**
         * Remove local storage
         *
         * @param key
         */
        removeItem: function (key) {
            window.localStorage.removeItem(key);
        },
        /**
         * Clear local storage
         */
        clearItem: function () {
            window.localStorage.clear();
        },
        /**
         * Show toast
         *
         * @url https://github.com/EddyVerbruggen/Toast-PhoneGap-Plugin
         * @param message
         */
        showToast: function (message) {
            if (__WEBPACK_IMPORTED_MODULE_0__config__["a" /* WBConfig */].isBrowser) {
                _WBHelper.log(message);
                return;
            }
            window.plugins.toast.showWithOptions({
                message: message,
                duration: "short",
                position: "bottom"
            }, function () {
            }, function (e) {
                _WBHelper.error(e);
            });
        },
        /**
         * Android alert box
         *
         * @url https://github.com/apache/cordova-plugin-dialogs
         * @params object {desc, title, callBackFunction, btnOk}
         */
        alert: function (options) {
            if (__WEBPACK_IMPORTED_MODULE_0__config__["a" /* WBConfig */].isBrowser) {
                _WBHelper.log('Alert: ' + options.title + ', ' + options.desc);
                return;
            }
            options = _WBHelper.defaults({
                btnOk: 'Ok',
                title: '',
                desc: '',
                callback: function () {
                }
            }, options);
            navigator.notification.alert(options.desc, options.callback, options.title, options.btnOk);
        },
        /**
         * Android confirm box
         *
         * @url https://github.com/apache/cordova-plugin-dialogs
         * @params object {desc, title, callBackFunction, btnOk}
         */
        confirm: function (options) {
            if (__WEBPACK_IMPORTED_MODULE_0__config__["a" /* WBConfig */].isBrowser) {
                _WBHelper.log('Alert: ' + options.title + ', ' + options.desc);
                return;
            }
            options = _WBHelper.defaults({
                btnOk: 'Yes,No',
                title: '',
                desc: '',
                callback: function () {
                }
            }, options);
            navigator.notification.confirm(options.desc, options.callback, options.title, options.btnOk);
        },
        /**
         * Show error messages
         *
         * @param obj
         */
        errorMessage: function (obj) {
            var errorText = 'Unknown error occurred, or please check your network connection.';
            if (typeof obj === 'object') {
                for (var key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        errorText = obj[key].toString();
                        _WBHelper.showToast(errorText);
                        return errorText;
                    }
                }
                return errorText;
            }
            if (!obj) {
                _WBHelper.showToast(obj);
                return obj;
            }
            _WBHelper.showToast(obj);
            return obj;
        },
        /**
         * Log messages
         *
         * @param message
         */
        log: function (message) {
            if (!__WEBPACK_IMPORTED_MODULE_0__config__["a" /* WBConfig */].isBrowser || !message) {
                return;
            }
            console.log('WB Log: ' + new Date() + ': ' + message);
        },
        /**
         * Log errors
         *
         * @param message
         */
        error: function (message) {
            if (!__WEBPACK_IMPORTED_MODULE_0__config__["a" /* WBConfig */].isBrowser || !message) {
                return;
            }
            console.log('WB Error: ' + new Date() + ': ' + message);
        },
        /**
         * Copy to clipboard
         *
         * @param value
         * @param input
         * @param message
         */
        copyToClipboard: function (value, message) {
            var el = document.createElement('textarea');
            el.value = value;
            document.body.appendChild(el);
            el.select();
            document.execCommand('copy');
            document.body.removeChild(el);
            _WBHelper.showToast(message);
        },
        /**
         * Filter errors
         *
         * @param e
         * @returns {any}
         */
        getErrors: function (e) {
            if (typeof e === 'object') {
                for (var key in e) {
                    if (e.hasOwnProperty(key)) {
                        return e[key];
                    }
                }
            }
            return e;
        },
        /**
         * Convert base64 to blob
         *
         * @param dataURI
         * @returns {Blob}
         */
        b64toBlob: function (dataURI) {
            // convert base64/URLEncoded data component to raw binary data held in a string
            var byteString;
            if (dataURI.split(',')[0].indexOf('base64') >= 0) {
                byteString = atob(dataURI.split(',')[1]);
            }
            else {
                byteString = encodeURI(dataURI.split(',')[1]);
            }
            // separate out the mime component
            var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
            // write the bytes of the string to a typed array
            var ia = new Uint8Array(byteString.length);
            for (var i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);
            }
            return new Blob([ia], { type: mimeString });
        }
    };
}());
var WBHelper = _WBHelper;
//# sourceMappingURL=helper.js.map

/***/ }),

/***/ 255:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(256);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(261);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_auth__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_menu_drawer_drawer__ = __webpack_require__(352);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_authentication_login_login__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__libraries_views__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_authentication_verify_verify__ = __webpack_require__(362);
/**
 * @author          Archie, Disono (webmonsph@gmail.com)
 * @link            https://webmons.com
 * @copyright       Webmons Development Studio. (webmons.com), 2018
 * @license         Apache, 2.0 https://github.com/disono/Ionic-Framework-Template/blob/master/LICENSE
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen, authProvider, loadingCtrl) {
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.authProvider = authProvider;
        this.loadingCtrl = loadingCtrl;
        this.initializeApp();
    }
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
            _this.defaultPage();
        });
    };
    MyApp.prototype.defaultPage = function () {
        // check if authenticated
        if (this.authProvider.user()) {
            this.sync();
        }
        else {
            this.rootPage = __WEBPACK_IMPORTED_MODULE_6__pages_authentication_login_login__["a" /* LoginPage */];
        }
    };
    MyApp.prototype.sync = function () {
        var thisApp = this;
        var loader = __WEBPACK_IMPORTED_MODULE_7__libraries_views__["a" /* WBViews */].loading(this.loadingCtrl, 'Syncing...');
        this.authProvider.sync()
            .subscribe(function (response) {
            loader.dismiss();
            if (thisApp.authProvider.user().is_email_verified === 1) {
                thisApp.rootPage = __WEBPACK_IMPORTED_MODULE_5__pages_menu_drawer_drawer__["a" /* DrawerMenu */];
            }
            else {
                thisApp.rootPage = __WEBPACK_IMPORTED_MODULE_8__pages_authentication_verify_verify__["a" /* VerifyPage */];
            }
        }, function (e) {
            loader.dismiss();
            thisApp.rootPage = __WEBPACK_IMPORTED_MODULE_5__pages_menu_drawer_drawer__["a" /* DrawerMenu */];
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Nav */])
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            template: "<ion-nav [root]=\"rootPage\"></ion-nav>"
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_4__providers_auth__["a" /* AuthProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* LoadingController */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 28:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__base__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__libraries_helper__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__libraries_security__ = __webpack_require__(156);
/**
 * @author          Archie, Disono (webmonsph@gmail.com)
 * @link            https://webmons.com
 * @copyright       Webmons Development Studio. (webmons.com), 2018
 * @license         Apache, 2.0 https://github.com/disono/Ionic-Framework-Template/blob/master/LICENSE
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AuthProvider = /** @class */ (function () {
    function AuthProvider(base) {
        this.base = base;
        __WEBPACK_IMPORTED_MODULE_2__libraries_helper__["a" /* WBHelper */].log('Auth Provider');
    }
    AuthProvider.prototype.register = function (parameters) {
        return this.base.post('auth/register', parameters, function (res) {
            __WEBPACK_IMPORTED_MODULE_2__libraries_helper__["a" /* WBHelper */].log('Auth-register: ' + res);
        });
    };
    AuthProvider.prototype.login = function (parameters) {
        return this.base.post('auth/login', parameters, function (res) {
            __WEBPACK_IMPORTED_MODULE_2__libraries_helper__["a" /* WBHelper */].log('Auth-login: ' + res);
            __WEBPACK_IMPORTED_MODULE_3__libraries_security__["a" /* WBSecurity */].saveAuth(res.data);
        });
    };
    AuthProvider.prototype.logout = function () {
        var auth = __WEBPACK_IMPORTED_MODULE_2__libraries_helper__["a" /* WBHelper */].getItem('user', true);
        var tokenId = 0;
        if (auth) {
            tokenId = auth.token.id;
        }
        return this.base.get('auth/logout/' + tokenId, null, function (res) {
            __WEBPACK_IMPORTED_MODULE_2__libraries_helper__["a" /* WBHelper */].log('Auth-logout: ' + res);
            __WEBPACK_IMPORTED_MODULE_2__libraries_helper__["a" /* WBHelper */].clearItem();
        });
    };
    AuthProvider.prototype.passwordForgot = function (email) {
        return this.base.post('auth/password/forgot', { email: email }, function (res) {
            __WEBPACK_IMPORTED_MODULE_2__libraries_helper__["a" /* WBHelper */].log('Auth-forgot: ' + res);
        });
    };
    AuthProvider.prototype.resendVerify = function (type, value) {
        return this.base.post('auth/verify/resend/' + type, { type_value: value }, function (res) {
            __WEBPACK_IMPORTED_MODULE_2__libraries_helper__["a" /* WBHelper */].log('Auth-verify: ' + res);
        });
    };
    AuthProvider.prototype.verifyPhone = function (number, code) {
        return this.base.post('auth/verify/phone', { phone: number, token: code }, function (res) {
            __WEBPACK_IMPORTED_MODULE_2__libraries_helper__["a" /* WBHelper */].log('Auth-verifyPhone: ' + res);
        });
    };
    AuthProvider.prototype.sync = function () {
        return this.base.get('user/sync', null, function (res) {
            __WEBPACK_IMPORTED_MODULE_2__libraries_helper__["a" /* WBHelper */].log('Auth-sync: ' + res);
            __WEBPACK_IMPORTED_MODULE_3__libraries_security__["a" /* WBSecurity */].saveAuth(res.data.profile);
        });
    };
    AuthProvider.prototype.user = function () {
        return __WEBPACK_IMPORTED_MODULE_2__libraries_helper__["a" /* WBHelper */].getItem('user', true);
    };
    AuthProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__base__["a" /* BaseProvider */]])
    ], AuthProvider);
    return AuthProvider;
}());

//# sourceMappingURL=auth.js.map

/***/ }),

/***/ 352:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DrawerMenu; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home_home__ = __webpack_require__(353);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_auth__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__authentication_login_login__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__page_about_about__ = __webpack_require__(356);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__page_privacy_privacy__ = __webpack_require__(357);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__page_terms_terms__ = __webpack_require__(358);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__user_settings_settings_tab__ = __webpack_require__(359);
/**
 * @author          Archie, Disono (webmonsph@gmail.com)
 * @link            https://webmons.com
 * @copyright       Webmons Development Studio. (webmons.com), 2018
 * @license         Apache, 2.0 https://github.com/disono/Ionic-Framework-Template/blob/master/LICENSE
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var DrawerMenu = /** @class */ (function () {
    function DrawerMenu(authProvider) {
        this.authProvider = authProvider;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_2__home_home__["a" /* HomePage */];
        this.me = this.authProvider.user();
    }
    DrawerMenu.prototype.ionViewDidEnter = function () {
        this.createMenu();
    };
    DrawerMenu.prototype.createMenu = function () {
        // used for an example of ngFor and navigation
        this.pages = [
            { title: 'Home', component: __WEBPACK_IMPORTED_MODULE_2__home_home__["a" /* HomePage */] },
            // Pages
            { title: 'About', component: __WEBPACK_IMPORTED_MODULE_5__page_about_about__["a" /* AboutPage */] },
            { title: 'Privacy', component: __WEBPACK_IMPORTED_MODULE_6__page_privacy_privacy__["a" /* PrivacyPage */] },
            { title: 'Terms & Condition', component: __WEBPACK_IMPORTED_MODULE_7__page_terms_terms__["a" /* TermsPage */] },
            { title: 'Logout', component: null }
        ];
    };
    DrawerMenu.prototype.openPage = function (page) {
        var thisApp = this;
        if (page.title === 'Logout') {
            this.authProvider.logout()
                .subscribe(function (response) {
                thisApp.nav.setRoot(__WEBPACK_IMPORTED_MODULE_4__authentication_login_login__["a" /* LoginPage */]);
            }, function (e) {
            });
            return;
        }
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    };
    DrawerMenu.prototype.openSettings = function () {
        this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_8__user_settings_settings_tab__["a" /* SettingsTabPage */]);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Nav */])
    ], DrawerMenu.prototype, "nav", void 0);
    DrawerMenu = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"E:\Projects\MobileCrossPlatform\Cordova\Ionic-Framework-Template\src\pages\menu\drawer\drawer.html"*/'<!--\n * @author          Archie, Disono (webmonsph@gmail.com)\n * @link            https://webmons.com\n * @copyright       Webmons Development Studio. (webmons.com), 2018\n * @license         Apache, 2.0 https://github.com/disono/Ionic-Framework-Template/blob/master/LICENSE\n-->\n\n<ion-menu [content]="content">\n  <ion-content>\n    <!-- Profile -->\n    <ion-card *ngIf="me" style="box-shadow: none !important;">\n      <ion-item class="profile-item">\n        <div class="profile-picture">\n          <img src="{{me.profile_picture}}" (click)="openSettings()" menuClose/>\n        </div>\n\n        <h4 class="profile-name">{{me.full_name}}</h4>\n        <p *ngIf="me.email">{{me.email}}</p>\n      </ion-item>\n\n      <ion-item class="profile-item">\n        <button menuClose ion-button block clear (click)="openSettings()">\n          Profile Settings\n        </button>\n      </ion-item>\n    </ion-card>\n\n    <!-- Menu -->\n    <ion-list>\n      <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)">\n        {{p.title}}\n      </button>\n    </ion-list>\n  </ion-content>\n</ion-menu>\n\n<!-- Disable swipe-to-go-back because it\'s poor UX to combine STGB with side menus -->\n<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>\n'/*ion-inline-end:"E:\Projects\MobileCrossPlatform\Cordova\Ionic-Framework-Template\src\pages\menu\drawer\drawer.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__providers_auth__["a" /* AuthProvider */]])
    ], DrawerMenu);
    return DrawerMenu;
}());

//# sourceMappingURL=drawer.js.map

/***/ }),

/***/ 353:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/**
 * @author          Archie, Disono (webmonsph@gmail.com)
 * @link            https://webmons.com
 * @copyright       Webmons Development Studio. (webmons.com), 2018
 * @license         Apache, 2.0 https://github.com/disono/Ionic-Framework-Template/blob/master/LICENSE
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var HomePage = /** @class */ (function () {
    function HomePage(navCtrl) {
        this.navCtrl = navCtrl;
    }
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"E:\Projects\MobileCrossPlatform\Cordova\Ionic-Framework-Template\src\pages\home\home.html"*/'<!--\n * @author          Archie, Disono (webmonsph@gmail.com)\n * @link            https://webmons.com\n * @copyright       Webmons Development Studio. (webmons.com), 2018\n * @license         Apache, 2.0 https://github.com/disono/Ionic-Framework-Template/blob/master/LICENSE\n-->\n\n<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n\n    <ion-title>Home</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n\n</ion-content>\n'/*ion-inline-end:"E:\Projects\MobileCrossPlatform\Cordova\Ionic-Framework-Template\src\pages\home\home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 354:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegisterPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_auth__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__libraries_views__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__libraries_helper__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__login_login__ = __webpack_require__(47);
/**
 * @author          Archie, Disono (webmonsph@gmail.com)
 * @link            https://webmons.com
 * @copyright       Webmons Development Studio. (webmons.com), 2018
 * @license         Apache, 2.0 https://github.com/disono/Ionic-Framework-Template/blob/master/LICENSE
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var RegisterPage = /** @class */ (function () {
    function RegisterPage(navCtrl, formBuilder, loadingCtrl, authProvider) {
        this.navCtrl = navCtrl;
        this.formBuilder = formBuilder;
        this.loadingCtrl = loadingCtrl;
        this.authProvider = authProvider;
        this.submitAttempt = false;
        this.formInputs();
    }
    RegisterPage.prototype.formInputs = function () {
        this.inputs = this.formBuilder.group({
            first_name: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            last_name: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            email: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            username: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            password: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            password_confirmation: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
        });
    };
    RegisterPage.prototype.doRegister = function () {
        this.submitAttempt = true;
        if (!this.inputs.valid) {
            return;
        }
        var loader = __WEBPACK_IMPORTED_MODULE_4__libraries_views__["a" /* WBViews */].loading(this.loadingCtrl, 'Registering...');
        var thisApp = this;
        this.authProvider
            .register(this.inputs.value)
            .subscribe(function (response) {
            loader.dismiss();
            thisApp.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_6__login_login__["a" /* LoginPage */]);
        }, function (e) {
            loader.dismiss();
            __WEBPACK_IMPORTED_MODULE_5__libraries_helper__["a" /* WBHelper */].alert({
                title: 'Validation Errors',
                desc: __WEBPACK_IMPORTED_MODULE_5__libraries_helper__["a" /* WBHelper */].getErrors(e)
            });
        });
    };
    RegisterPage.prototype.openLogin = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_6__login_login__["a" /* LoginPage */]);
    };
    RegisterPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"E:\Projects\MobileCrossPlatform\Cordova\Ionic-Framework-Template\src\pages\authentication\register\register.html"*/'<!--\n * @author          Archie, Disono (webmonsph@gmail.com)\n * @link            https://webmons.com\n * @copyright       Webmons Development Studio. (webmons.com), 2018\n * @license         Apache, 2.0 https://github.com/disono/Ionic-Framework-Template/blob/master/LICENSE\n-->\n\n<ion-content>\n  <ion-grid>\n    <ion-row>\n      <form [formGroup]="inputs" (ngSubmit)="doRegister()" style="width: 100% !important;">\n        <ion-list padding>\n          <ion-item>\n            <ion-input formControlName="first_name" type="text"\n                       placeholder="First Name"\n                       [class.invalid]="!inputs.controls.first_name.valid && submitAttempt"></ion-input>\n          </ion-item>\n          <ion-item *ngIf="!inputs.controls.first_name.valid && submitAttempt" no-lines>\n            <p class="invalid-text">Please enter your real first name.</p>\n          </ion-item>\n\n          <ion-item>\n            <ion-input formControlName="last_name" type="text"\n                       placeholder="Last Name"\n                       [class.invalid]="!inputs.controls.last_name.valid && submitAttempt"></ion-input>\n          </ion-item>\n          <ion-item *ngIf="!inputs.controls.last_name.valid && submitAttempt" no-lines>\n            <p class="invalid-text">Please enter your real last name.</p>\n          </ion-item>\n\n          <ion-item>\n            <ion-input formControlName="email" type="email"\n                       placeholder="Email"\n                       [class.invalid]="!inputs.controls.email.valid && submitAttempt"></ion-input>\n          </ion-item>\n          <ion-item *ngIf="!inputs.controls.email.valid && submitAttempt" no-lines>\n            <p class="invalid-text">Please enter a valid email.</p>\n          </ion-item>\n\n          <ion-item>\n            <ion-input formControlName="username" type="text"\n                       placeholder="Username"\n                       [class.invalid]="!inputs.controls.username.valid && submitAttempt"></ion-input>\n          </ion-item>\n          <ion-item *ngIf="!inputs.controls.username.valid && submitAttempt" no-lines>\n            <p class="invalid-text">Please enter a valid username.</p>\n          </ion-item>\n\n          <ion-item>\n            <ion-input formControlName="password" placeholder="Password" type="password"></ion-input>\n          </ion-item>\n          <ion-item *ngIf="!inputs.controls.password.valid && submitAttempt" no-lines>\n            <p class="invalid-text">Password is required.</p>\n          </ion-item>\n\n          <ion-item>\n            <ion-input formControlName="password_confirmation" placeholder="Confirm Password" type="password"></ion-input>\n          </ion-item>\n          <ion-item *ngIf="!inputs.controls.password_confirmation.valid && submitAttempt" no-lines>\n            <p class="invalid-text">Confirm Password is required.</p>\n          </ion-item>\n        </ion-list>\n\n        <div padding>\n          <button ion-button block mode="ios" type="submit">Submit</button>\n\n          <button ion-button block clear mode="ios" (click)="openLogin()" type="button">\n            <span>Have an account?</span>&nbsp;<span><strong>Login now!</strong></span></button>\n        </div>\n      </form>\n    </ion-row>\n  </ion-grid>\n</ion-content>\n'/*ion-inline-end:"E:\Projects\MobileCrossPlatform\Cordova\Ionic-Framework-Template\src\pages\authentication\register\register.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_3__providers_auth__["a" /* AuthProvider */]])
    ], RegisterPage);
    return RegisterPage;
}());

//# sourceMappingURL=register.js.map

/***/ }),

/***/ 355:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RecoverPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_auth__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__libraries_views__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__libraries_helper__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__login_login__ = __webpack_require__(47);
/**
 * @author          Archie, Disono (webmonsph@gmail.com)
 * @link            https://webmons.com
 * @copyright       Webmons Development Studio. (webmons.com), 2018
 * @license         Apache, 2.0 https://github.com/disono/Ionic-Framework-Template/blob/master/LICENSE
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var RecoverPage = /** @class */ (function () {
    function RecoverPage(navCtrl, formBuilder, loadingCtrl, authProvider) {
        this.navCtrl = navCtrl;
        this.formBuilder = formBuilder;
        this.loadingCtrl = loadingCtrl;
        this.authProvider = authProvider;
        this.submitAttempt = false;
        this.formInputs();
    }
    RecoverPage.prototype.formInputs = function () {
        this.inputs = this.formBuilder.group({
            email: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
        });
    };
    RecoverPage.prototype.doRecover = function () {
        this.submitAttempt = true;
        if (!this.inputs.valid) {
            return;
        }
        var thisApp = this;
        var loader = __WEBPACK_IMPORTED_MODULE_4__libraries_views__["a" /* WBViews */].loading(this.loadingCtrl, 'Submitting...');
        this.authProvider
            .passwordForgot(this.inputs.value)
            .subscribe(function (response) {
            loader.dismiss();
            thisApp.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_6__login_login__["a" /* LoginPage */]);
        }, function (e) {
            loader.dismiss();
            __WEBPACK_IMPORTED_MODULE_5__libraries_helper__["a" /* WBHelper */].alert({
                title: 'Validation Errors',
                desc: __WEBPACK_IMPORTED_MODULE_5__libraries_helper__["a" /* WBHelper */].getErrors(e)
            });
        });
    };
    RecoverPage.prototype.cancel = function () {
        this.navCtrl.pop();
    };
    RecoverPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"E:\Projects\MobileCrossPlatform\Cordova\Ionic-Framework-Template\src\pages\authentication\recovery\forgot.html"*/'<!--\n * @author          Archie, Disono (webmonsph@gmail.com)\n * @link            https://webmons.com\n * @copyright       Webmons Development Studio. (webmons.com), 2018\n * @license         Apache, 2.0 https://github.com/disono/Ionic-Framework-Template/blob/master/LICENSE\n-->\n\n<ion-content>\n  <ion-grid>\n    <ion-row>\n      <form [formGroup]="inputs" (ngSubmit)="doRecover()" style="width: 100% !important;">\n        <ion-list padding>\n          <ion-item>\n            <ion-input formControlName="email" type="email"\n                       placeholder="Email"\n                       [class.invalid]="!inputs.controls.email.valid && submitAttempt"></ion-input>\n          </ion-item>\n          <ion-item *ngIf="!inputs.controls.email.valid && submitAttempt" no-lines>\n            <p class="invalid-text">Please enter a valid email.</p>\n          </ion-item>\n        </ion-list>\n\n        <div padding>\n          <button ion-button block mode="ios" type="submit">Submit</button>\n          <button ion-button block clear mode="ios" type="button" (click)="cancel()">Cancel</button>\n        </div>\n      </form>\n    </ion-row>\n  </ion-grid>\n</ion-content>\n'/*ion-inline-end:"E:\Projects\MobileCrossPlatform\Cordova\Ionic-Framework-Template\src\pages\authentication\recovery\forgot.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_3__providers_auth__["a" /* AuthProvider */]])
    ], RecoverPage);
    return RecoverPage;
}());

//# sourceMappingURL=forgot.js.map

/***/ }),

/***/ 356:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AboutPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_page__ = __webpack_require__(90);
/**
 * @author          Archie, Disono (webmonsph@gmail.com)
 * @link            https://webmons.com
 * @copyright       Webmons Development Studio. (webmons.com), 2018
 * @license         Apache, 2.0 https://github.com/disono/Ionic-Framework-Template/blob/master/LICENSE
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AboutPage = /** @class */ (function () {
    function AboutPage(navCtrl, pageProvider) {
        this.navCtrl = navCtrl;
        this.pageProvider = pageProvider;
        this.page = null;
    }
    AboutPage.prototype.ionViewDidEnter = function () {
        this.fetch();
    };
    AboutPage.prototype.fetch = function () {
        var thisApp = this;
        thisApp.pageProvider.show('about')
            .subscribe(function (response) {
            thisApp.page = response.data;
        }, function (e) {
        });
    };
    AboutPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"E:\Projects\MobileCrossPlatform\Cordova\Ionic-Framework-Template\src\pages\page\about\about.html"*/'<!--\n * @author          Archie, Disono (webmonsph@gmail.com)\n * @link            https://webmons.com\n * @copyright       Webmons Development Studio. (webmons.com), 2018\n * @license         Apache, 2.0 https://github.com/disono/Ionic-Framework-Template/blob/master/LICENSE\n-->\n\n<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n\n    <ion-title>About</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <article *ngIf="page" [innerHtml]="page.content"></article>\n</ion-content>\n'/*ion-inline-end:"E:\Projects\MobileCrossPlatform\Cordova\Ionic-Framework-Template\src\pages\page\about\about.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__providers_page__["a" /* PageProvider */]])
    ], AboutPage);
    return AboutPage;
}());

//# sourceMappingURL=about.js.map

/***/ }),

/***/ 357:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PrivacyPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_page__ = __webpack_require__(90);
/**
 * @author          Archie, Disono (webmonsph@gmail.com)
 * @link            https://webmons.com
 * @copyright       Webmons Development Studio. (webmons.com), 2018
 * @license         Apache, 2.0 https://github.com/disono/Ionic-Framework-Template/blob/master/LICENSE
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var PrivacyPage = /** @class */ (function () {
    function PrivacyPage(navCtrl, pageProvider) {
        this.navCtrl = navCtrl;
        this.pageProvider = pageProvider;
        this.page = null;
    }
    PrivacyPage.prototype.ionViewDidEnter = function () {
        this.fetch();
    };
    PrivacyPage.prototype.fetch = function () {
        var thisApp = this;
        thisApp.pageProvider.show('privacy')
            .subscribe(function (response) {
            thisApp.page = response.data;
        }, function (e) {
        });
    };
    PrivacyPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"E:\Projects\MobileCrossPlatform\Cordova\Ionic-Framework-Template\src\pages\page\privacy\privacy.html"*/'<!--\n * @author          Archie, Disono (webmonsph@gmail.com)\n * @link            https://webmons.com\n * @copyright       Webmons Development Studio. (webmons.com), 2018\n * @license         Apache, 2.0 https://github.com/disono/Ionic-Framework-Template/blob/master/LICENSE\n-->\n\n<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n\n    <ion-title>Privacy</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <article *ngIf="page" [innerHtml]="page.content"></article>\n</ion-content>\n'/*ion-inline-end:"E:\Projects\MobileCrossPlatform\Cordova\Ionic-Framework-Template\src\pages\page\privacy\privacy.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__providers_page__["a" /* PageProvider */]])
    ], PrivacyPage);
    return PrivacyPage;
}());

//# sourceMappingURL=privacy.js.map

/***/ }),

/***/ 358:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TermsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_page__ = __webpack_require__(90);
/**
 * @author          Archie, Disono (webmonsph@gmail.com)
 * @link            https://webmons.com
 * @copyright       Webmons Development Studio. (webmons.com), 2018
 * @license         Apache, 2.0 https://github.com/disono/Ionic-Framework-Template/blob/master/LICENSE
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var TermsPage = /** @class */ (function () {
    function TermsPage(navCtrl, pageProvider) {
        this.navCtrl = navCtrl;
        this.pageProvider = pageProvider;
        this.page = null;
    }
    TermsPage.prototype.ionViewDidEnter = function () {
        this.fetch();
    };
    TermsPage.prototype.fetch = function () {
        var thisApp = this;
        thisApp.pageProvider.show('terms_and_condition')
            .subscribe(function (response) {
            thisApp.page = response.data;
        }, function (e) {
        });
    };
    TermsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"E:\Projects\MobileCrossPlatform\Cordova\Ionic-Framework-Template\src\pages\page\terms\terms.html"*/'<!--\n * @author          Archie, Disono (webmonsph@gmail.com)\n * @link            https://webmons.com\n * @copyright       Webmons Development Studio. (webmons.com), 2018\n * @license         Apache, 2.0 https://github.com/disono/Ionic-Framework-Template/blob/master/LICENSE\n-->\n\n<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n\n    <ion-title>Terms and Condition</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <article *ngIf="page" [innerHtml]="page.content"></article>\n</ion-content>\n'/*ion-inline-end:"E:\Projects\MobileCrossPlatform\Cordova\Ionic-Framework-Template\src\pages\page\terms\terms.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__providers_page__["a" /* PageProvider */]])
    ], TermsPage);
    return TermsPage;
}());

//# sourceMappingURL=terms.js.map

/***/ }),

/***/ 359:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettingsTabPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__general__ = __webpack_require__(360);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__security__ = __webpack_require__(361);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_auth__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__libraries_views__ = __webpack_require__(40);
/**
 * @author          Archie, Disono (webmonsph@gmail.com)
 * @link            https://webmons.com
 * @copyright       Webmons Development Studio. (webmons.com), 2018
 * @license         Apache, 2.0 https://github.com/disono/Ionic-Framework-Template/blob/master/LICENSE
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var SettingsTabPage = /** @class */ (function () {
    function SettingsTabPage(authProvider, loadingCtrl) {
        this.authProvider = authProvider;
        this.loadingCtrl = loadingCtrl;
        // this tells the tabs component which Pages
        // should be each tab's root Page
        this.generalRoot = __WEBPACK_IMPORTED_MODULE_2__general__["a" /* GeneralSettingsPage */];
        this.securityRoot = __WEBPACK_IMPORTED_MODULE_3__security__["a" /* SecuritySettingsPage */];
    }
    SettingsTabPage.prototype.ionViewDidEnter = function () {
        this.sync();
    };
    SettingsTabPage.prototype.sync = function () {
        var thisApp = this;
        var loader = __WEBPACK_IMPORTED_MODULE_5__libraries_views__["a" /* WBViews */].loading(this.loadingCtrl, 'Syncing...');
        thisApp.authProvider.sync()
            .subscribe(function (response) {
            loader.dismiss();
        }, function (e) {
            loader.dismiss();
        });
    };
    SettingsTabPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"E:\Projects\MobileCrossPlatform\Cordova\Ionic-Framework-Template\src\pages\user\settings\settings.tab.html"*/'<!--\n * @author          Archie, Disono (webmonsph@gmail.com)\n * @link            https://webmons.com\n * @copyright       Webmons Development Studio. (webmons.com), 2018\n * @license         Apache, 2.0 https://github.com/disono/Ionic-Framework-Template/blob/master/LICENSE\n-->\n\n<ion-tabs>\n  <ion-tab [root]="generalRoot" tabTitle="General" tabIcon="md-settings"></ion-tab>\n  <ion-tab [root]="securityRoot" tabTitle="Security" tabIcon="md-unlock"></ion-tab>\n</ion-tabs>\n'/*ion-inline-end:"E:\Projects\MobileCrossPlatform\Cordova\Ionic-Framework-Template\src\pages\user\settings\settings.tab.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__providers_auth__["a" /* AuthProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* LoadingController */]])
    ], SettingsTabPage);
    return SettingsTabPage;
}());

//# sourceMappingURL=settings.tab.js.map

/***/ }),

/***/ 360:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GeneralSettingsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_auth__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__libraries_helper__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__config__ = __webpack_require__(155);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__libraries_views__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_user__ = __webpack_require__(157);
/**
 * @author          Archie, Disono (webmonsph@gmail.com)
 * @link            https://webmons.com
 * @copyright       Webmons Development Studio. (webmons.com), 2018
 * @license         Apache, 2.0 https://github.com/disono/Ionic-Framework-Template/blob/master/LICENSE
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var GeneralSettingsPage = /** @class */ (function () {
    function GeneralSettingsPage(navCtrl, authProvider, userProvider, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.authProvider = authProvider;
        this.userProvider = userProvider;
        this.loadingCtrl = loadingCtrl;
        this.me = this.authProvider.user();
        this.init();
    }
    /**
     * Initialize
     */
    GeneralSettingsPage.prototype.init = function () {
        var thisApp = this;
        thisApp.authInputs();
    };
    /**
     * Authenticated inputs
     */
    GeneralSettingsPage.prototype.authInputs = function () {
        var thisApp = this;
        var user = this.authProvider.user();
        // inputs
        thisApp.inputs = {
            first_name: user.first_name,
            last_name: user.last_name,
            phone: (user.phone) ? user.phone : '',
            address: (user.address) ? user.address : '',
            birthday: (user.birthday) ? new Date(user.birthday).toISOString() : '',
            gender: ((user.gender) ? user.gender : 'Male'),
            email: user.email,
        };
        // files
        thisApp.files = null;
    };
    GeneralSettingsPage.prototype.doSave = function ($event, inputs) {
        $event.preventDefault();
        var thisApp = this;
        // check for values
        if (!inputs.first_name || !inputs.last_name || !inputs.email) {
            __WEBPACK_IMPORTED_MODULE_3__libraries_helper__["a" /* WBHelper */].alert({
                title: 'Required Inputs',
                desc: 'Please check all the required fields.'
            });
            return;
        }
        // format birthday
        if (inputs.birthday) {
            inputs.birthday = moment(new Date(inputs.birthday)).format('MMMM DD YYYY');
        }
        // update the profile
        var loading = __WEBPACK_IMPORTED_MODULE_5__libraries_views__["a" /* WBViews */].loading(thisApp.loadingCtrl, 'Updating profile...');
        thisApp.userProvider.updateSettings({
            inputs: inputs,
            files: thisApp.files
        }).subscribe(function () {
            loading.dismiss();
            thisApp.authInputs();
        }, function (e) {
            // errors
            loading.dismiss();
            __WEBPACK_IMPORTED_MODULE_3__libraries_helper__["a" /* WBHelper */].alert({
                title: 'Validation Errors',
                desc: __WEBPACK_IMPORTED_MODULE_3__libraries_helper__["a" /* WBHelper */].getErrors(e)
            });
        });
    };
    /**
     * File camera
     */
    GeneralSettingsPage.prototype.fileSelector = function () {
        var thisApp = this;
        if (__WEBPACK_IMPORTED_MODULE_4__config__["a" /* WBConfig */].isBrowser) {
            __WEBPACK_IMPORTED_MODULE_3__libraries_helper__["a" /* WBHelper */].log('File selection is not supported on browser.');
            return;
        }
        navigator.camera.getPicture(function (fileURI) {
            if (!fileURI || fileURI == '') {
                __WEBPACK_IMPORTED_MODULE_3__libraries_helper__["a" /* WBHelper */].alert({
                    title: 'Camera Failed',
                    desc: 'Failed to capture the image, please try again.'
                });
                return;
            }
            var img = "data:image/jpeg;base64," + fileURI;
            try {
                // set to image
                thisApp._setImage(document.getElementById('profileImage'), img);
            }
            catch (e) {
                __WEBPACK_IMPORTED_MODULE_3__libraries_helper__["a" /* WBHelper */].alert({
                    title: 'Camera Failed',
                    desc: 'Image src failed to set, ' + e
                });
            }
            try {
                // set to input
                var blog = __WEBPACK_IMPORTED_MODULE_3__libraries_helper__["a" /* WBHelper */].b64toBlob(img);
                thisApp.files = { profile_picture: { val: blog, filename: 'profile_picture.jpg' } };
            }
            catch (e) {
                __WEBPACK_IMPORTED_MODULE_3__libraries_helper__["a" /* WBHelper */].alert({
                    title: 'Camera Failed',
                    desc: 'Failed to convert to blob, ' + e
                });
            }
        }, function (e) {
            // handle errors
            __WEBPACK_IMPORTED_MODULE_3__libraries_helper__["a" /* WBHelper */].alert({
                title: 'Camera Failed',
                desc: e
            });
        }, {
            quality: 50,
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: Camera.PictureSourceType.CAMERA,
            mediaType: Camera.MediaType.PICTURE,
            encodingType: Camera.EncodingType.JPEG
        });
    };
    GeneralSettingsPage.prototype._setImage = function (image, img) {
        image.src = img;
    };
    GeneralSettingsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"E:\Projects\MobileCrossPlatform\Cordova\Ionic-Framework-Template\src\pages\user\settings\general.html"*/'<!--\n * @author          Archie, Disono (webmonsph@gmail.com)\n * @link            https://webmons.com\n * @copyright       Webmons Development Studio. (webmons.com), 2018\n * @license         Apache, 2.0 https://github.com/disono/Ionic-Framework-Template/blob/master/LICENSE\n-->\n\n<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n\n    <ion-title>\n      General Settings\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <div style="text-align: center;">\n    <img src="{{ me.profile_picture }}" style="width: 92px; border-radius: 1000px;" id="profileImage" (click)="fileSelector()"/>\n  </div>\n\n  <form (submit)="doSave($event, inputs)">\n    <ion-list>\n      <ion-item>\n        <ion-label floating>First Name*</ion-label>\n        <ion-input type="text" [(ngModel)]="inputs.first_name" name="first_name"></ion-input>\n      </ion-item>\n\n      <ion-item>\n        <ion-label floating>Last Name*</ion-label>\n        <ion-input type="text" [(ngModel)]="inputs.last_name" name="last_name"></ion-input>\n      </ion-item>\n\n      <ion-item>\n        <ion-label floating>Phone</ion-label>\n        <ion-input type="tel" [(ngModel)]="inputs.phone" name="phone"></ion-input>\n      </ion-item>\n\n      <ion-item>\n        <ion-label>Gender</ion-label>\n        <ion-select [(ngModel)]="inputs.gender" name="gender">\n          <ion-option value="Male">Male</ion-option>\n          <ion-option value="Female">Female</ion-option>\n        </ion-select>\n      </ion-item>\n\n      <ion-item>\n        <ion-label>Birthday</ion-label>\n        <ion-datetime displayFormat="MMMM DD YYYY" [(ngModel)]="inputs.birthday" name="birthday"></ion-datetime>\n      </ion-item>\n\n      <ion-item>\n        <ion-label floating>Address</ion-label>\n        <ion-textarea rows="3" [(ngModel)]="inputs.address" name="address"></ion-textarea>\n      </ion-item>\n\n      <ion-item>\n        <ion-label floating>Email*</ion-label>\n        <ion-input type="email" [(ngModel)]="inputs.email" name="email"></ion-input>\n      </ion-item>\n    </ion-list>\n\n    <button ion-button block mode="ios" type="submit">Save Changes</button>\n  </form>\n</ion-content>\n'/*ion-inline-end:"E:\Projects\MobileCrossPlatform\Cordova\Ionic-Framework-Template\src\pages\user\settings\general.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__providers_auth__["a" /* AuthProvider */], __WEBPACK_IMPORTED_MODULE_6__providers_user__["a" /* UserProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* LoadingController */]])
    ], GeneralSettingsPage);
    return GeneralSettingsPage;
}());

//# sourceMappingURL=general.js.map

/***/ }),

/***/ 361:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SecuritySettingsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_auth__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__libraries_helper__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__libraries_views__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_user__ = __webpack_require__(157);
/**
 * @author          Archie, Disono (webmonsph@gmail.com)
 * @link            https://webmons.com
 * @copyright       Webmons Development Studio. (webmons.com), 2018
 * @license         Apache, 2.0 https://github.com/disono/Ionic-Framework-Template/blob/master/LICENSE
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var SecuritySettingsPage = /** @class */ (function () {
    function SecuritySettingsPage(navCtrl, authProvider, userProvider, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.authProvider = authProvider;
        this.userProvider = userProvider;
        this.loadingCtrl = loadingCtrl;
        this.init();
    }
    /**
     * Initialize
     */
    SecuritySettingsPage.prototype.init = function () {
        var user = this.authProvider.user();
        // inputs
        this.inputs = {
            email: user.email,
            current_password: '',
            password: '',
            password_confirmation: ''
        };
    };
    /**
     * Save the changes
     *
     * @param $event
     * @param inputs
     */
    SecuritySettingsPage.prototype.doSave = function ($event, inputs) {
        $event.preventDefault();
        var thisApp = this;
        // check for values
        if (!inputs.current_password || !inputs.email) {
            __WEBPACK_IMPORTED_MODULE_3__libraries_helper__["a" /* WBHelper */].alert({
                title: 'Required Inputs',
                desc: 'Please check all the required fields.'
            });
            return;
        }
        // show loading
        var loading = __WEBPACK_IMPORTED_MODULE_4__libraries_views__["a" /* WBViews */].loading(thisApp.loadingCtrl, 'Updating security...');
        // update security
        thisApp.userProvider.updateSecurity(inputs)
            .subscribe(function (res) {
            loading.dismiss();
        }, function (e) {
            loading.dismiss();
        });
    };
    SecuritySettingsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"E:\Projects\MobileCrossPlatform\Cordova\Ionic-Framework-Template\src\pages\user\settings\security.html"*/'<!--\n * @author          Archie, Disono (webmonsph@gmail.com)\n * @link            https://webmons.com\n * @copyright       Webmons Development Studio. (webmons.com), 2018\n * @license         Apache, 2.0 https://github.com/disono/Ionic-Framework-Template/blob/master/LICENSE\n-->\n\n<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n\n    <ion-title>\n      Security\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <form (submit)="doSave($event, inputs)">\n    <ion-item>\n      <ion-label floating>Email*</ion-label>\n      <ion-input type="email" [(ngModel)]="inputs.email" name="email"></ion-input>\n    </ion-item>\n\n    <ion-item>\n      <ion-label floating>Current Password*</ion-label>\n      <ion-input type="password" [(ngModel)]="inputs.current_password" name="current_password"></ion-input>\n    </ion-item>\n\n    <ion-item>\n      <ion-label floating>New Password*</ion-label>\n      <ion-input type="password" [(ngModel)]="inputs.password" name="password"></ion-input>\n    </ion-item>\n\n    <ion-item>\n      <ion-label floating>Confirm New Password*</ion-label>\n      <ion-input type="password" [(ngModel)]="inputs.password_confirmation" name="password_confirmation"></ion-input>\n    </ion-item>\n\n    <button ion-button block type="submit" mode="ios">Save Changes</button>\n  </form>\n</ion-content>\n'/*ion-inline-end:"E:\Projects\MobileCrossPlatform\Cordova\Ionic-Framework-Template\src\pages\user\settings\security.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__providers_auth__["a" /* AuthProvider */], __WEBPACK_IMPORTED_MODULE_5__providers_user__["a" /* UserProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* LoadingController */]])
    ], SecuritySettingsPage);
    return SecuritySettingsPage;
}());

//# sourceMappingURL=security.js.map

/***/ }),

/***/ 362:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VerifyPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_auth__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__login_login__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__libraries_helper__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__libraries_views__ = __webpack_require__(40);
/**
 * @author          Archie, Disono (webmonsph@gmail.com)
 * @link            https://webmons.com
 * @copyright       Webmons Development Studio. (webmons.com), 2018
 * @license         Apache, 2.0 https://github.com/disono/Ionic-Framework-Template/blob/master/LICENSE
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var VerifyPage = /** @class */ (function () {
    function VerifyPage(navCtrl, authProvider, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.authProvider = authProvider;
        this.loadingCtrl = loadingCtrl;
        this.auth = this.authProvider.user();
        this.timer = 900000;
        this.showResendEmailButton = false;
    }
    VerifyPage.prototype.ionViewDidEnter = function () {
        this.resendTimer();
    };
    VerifyPage.prototype.resendTimer = function () {
        var thisApp = this;
        thisApp.showResendEmailButton = false;
        setTimeout(function () {
            thisApp.showResendEmailButton = true;
        }, thisApp.timer);
    };
    VerifyPage.prototype.logout = function () {
        var thisApp = this;
        thisApp.authProvider.logout()
            .subscribe(function (response) {
            thisApp.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__login_login__["a" /* LoginPage */]);
        }, function (e) {
        });
    };
    VerifyPage.prototype.resend = function (type, value) {
        var thisApp = this;
        var loader = __WEBPACK_IMPORTED_MODULE_5__libraries_views__["a" /* WBViews */].loading(thisApp.loadingCtrl, 'Resending...');
        thisApp.authProvider.resendVerify(type, value)
            .subscribe(function (response) {
            loader.dismiss();
            thisApp.resendTimer();
        }, function (e) {
            loader.dismiss();
            __WEBPACK_IMPORTED_MODULE_4__libraries_helper__["a" /* WBHelper */].alert({
                title: 'Validation Errors',
                desc: __WEBPACK_IMPORTED_MODULE_4__libraries_helper__["a" /* WBHelper */].getErrors(e)
            });
        });
    };
    VerifyPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"E:\Projects\MobileCrossPlatform\Cordova\Ionic-Framework-Template\src\pages\authentication\verify\verify.html"*/'<!--\n * @author          Archie, Disono (webmonsph@gmail.com)\n * @link            https://webmons.com\n * @copyright       Webmons Development Studio. (webmons.com), 2018\n * @license         Apache, 2.0 https://github.com/disono/Ionic-Framework-Template/blob/master/LICENSE\n-->\n\n<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n\n    <ion-title>Verify</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <div *ngIf="auth.is_email_verified !== 1">\n    <p class="text-center">\n      Please verify your email address, we already sent a verification url to your {{ auth.email }}.\n    </p>\n\n    <button ion-button block clear  mode="ios" (click)="resend(\'email\', auth.email)"\n            *ngIf="showResendEmailButton">Resend Verification</button>\n\n    <button ion-button block color="danger" mode="ios" (click)="logout()">Logout</button>\n  </div>\n</ion-content>\n'/*ion-inline-end:"E:\Projects\MobileCrossPlatform\Cordova\Ionic-Framework-Template\src\pages\authentication\verify\verify.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__providers_auth__["a" /* AuthProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* LoadingController */]])
    ], VerifyPage);
    return VerifyPage;
}());

//# sourceMappingURL=verify.js.map

/***/ }),

/***/ 363:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(364);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(368);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 368:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__(169);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_component__ = __webpack_require__(255);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_home_home__ = __webpack_require__(353);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_status_bar__ = __webpack_require__(256);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_splash_screen__ = __webpack_require__(261);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_user__ = __webpack_require__(157);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__providers_auth__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__providers_authSocial__ = __webpack_require__(691);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__providers_application__ = __webpack_require__(692);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__providers_base__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_menu_drawer_drawer__ = __webpack_require__(352);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_authentication_login_login__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_authentication_register_register__ = __webpack_require__(354);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_authentication_recovery_forgot__ = __webpack_require__(355);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_page_about_about__ = __webpack_require__(356);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__pages_page_privacy_privacy__ = __webpack_require__(357);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__pages_page_show_show__ = __webpack_require__(693);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__pages_page_terms_terms__ = __webpack_require__(358);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__pages_authentication_verify_verify__ = __webpack_require__(362);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__pages_user_settings_general__ = __webpack_require__(360);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__pages_user_settings_security__ = __webpack_require__(361);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__pages_user_settings_settings_tab__ = __webpack_require__(359);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__providers_page__ = __webpack_require__(90);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


























var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_5__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_menu_drawer_drawer__["a" /* DrawerMenu */],
                __WEBPACK_IMPORTED_MODULE_14__pages_authentication_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_authentication_register_register__["a" /* RegisterPage */],
                __WEBPACK_IMPORTED_MODULE_16__pages_authentication_recovery_forgot__["a" /* RecoverPage */],
                __WEBPACK_IMPORTED_MODULE_21__pages_authentication_verify_verify__["a" /* VerifyPage */],
                __WEBPACK_IMPORTED_MODULE_17__pages_page_about_about__["a" /* AboutPage */],
                __WEBPACK_IMPORTED_MODULE_18__pages_page_privacy_privacy__["a" /* PrivacyPage */],
                __WEBPACK_IMPORTED_MODULE_19__pages_page_show_show__["a" /* ShowPage */],
                __WEBPACK_IMPORTED_MODULE_20__pages_page_terms_terms__["a" /* TermsPage */],
                __WEBPACK_IMPORTED_MODULE_24__pages_user_settings_settings_tab__["a" /* SettingsTabPage */],
                __WEBPACK_IMPORTED_MODULE_22__pages_user_settings_general__["a" /* GeneralSettingsPage */],
                __WEBPACK_IMPORTED_MODULE_23__pages_user_settings_security__["a" /* SecuritySettingsPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["c" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* MyApp */], {}, {
                    links: []
                }),
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["a" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_5__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_menu_drawer_drawer__["a" /* DrawerMenu */],
                __WEBPACK_IMPORTED_MODULE_14__pages_authentication_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_authentication_register_register__["a" /* RegisterPage */],
                __WEBPACK_IMPORTED_MODULE_16__pages_authentication_recovery_forgot__["a" /* RecoverPage */],
                __WEBPACK_IMPORTED_MODULE_21__pages_authentication_verify_verify__["a" /* VerifyPage */],
                __WEBPACK_IMPORTED_MODULE_17__pages_page_about_about__["a" /* AboutPage */],
                __WEBPACK_IMPORTED_MODULE_18__pages_page_privacy_privacy__["a" /* PrivacyPage */],
                __WEBPACK_IMPORTED_MODULE_19__pages_page_show_show__["a" /* ShowPage */],
                __WEBPACK_IMPORTED_MODULE_20__pages_page_terms_terms__["a" /* TermsPage */],
                __WEBPACK_IMPORTED_MODULE_24__pages_user_settings_settings_tab__["a" /* SettingsTabPage */],
                __WEBPACK_IMPORTED_MODULE_22__pages_user_settings_general__["a" /* GeneralSettingsPage */],
                __WEBPACK_IMPORTED_MODULE_23__pages_user_settings_security__["a" /* SecuritySettingsPage */],
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_6__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_7__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_12__providers_base__["a" /* BaseProvider */],
                __WEBPACK_IMPORTED_MODULE_9__providers_auth__["a" /* AuthProvider */],
                __WEBPACK_IMPORTED_MODULE_10__providers_authSocial__["a" /* AuthSocialProvider */],
                __WEBPACK_IMPORTED_MODULE_11__providers_application__["a" /* ApplicationProvider */],
                __WEBPACK_IMPORTED_MODULE_8__providers_user__["a" /* UserProvider */],
                __WEBPACK_IMPORTED_MODULE_25__providers_page__["a" /* PageProvider */],
                { provide: __WEBPACK_IMPORTED_MODULE_2__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["b" /* IonicErrorHandler */] }
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 40:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WBViews; });
/**
 * @author          Archie, Disono (webmonsph@gmail.com)
 * @link            https://webmons.com
 * @copyright       Webmons Development Studio. (webmons.com), 2018
 * @license         Apache 2.0
 */
var _WBViews = (function () {
    return {
        /**
         * Loading view
         *
         * @param loadingCtrl
         * @param message
         * @returns {any}
         */
        loading: function (loadingCtrl, message) {
            var loader = loadingCtrl.create({
                content: message
            });
            loader.present();
            return loader;
        }
    };
}());
var WBViews = _WBViews;
//# sourceMappingURL=views.js.map

/***/ }),

/***/ 47:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_auth__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__libraries_views__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_app_component__ = __webpack_require__(255);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__libraries_helper__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__register_register__ = __webpack_require__(354);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__recovery_forgot__ = __webpack_require__(355);
/**
 * @author          Archie, Disono (webmonsph@gmail.com)
 * @link            https://webmons.com
 * @copyright       Webmons Development Studio. (webmons.com), 2018
 * @license         Apache, 2.0 https://github.com/disono/Ionic-Framework-Template/blob/master/LICENSE
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var LoginPage = /** @class */ (function () {
    function LoginPage(navCtrl, formBuilder, loadingCtrl, authProvider) {
        this.navCtrl = navCtrl;
        this.formBuilder = formBuilder;
        this.loadingCtrl = loadingCtrl;
        this.authProvider = authProvider;
        this.submitAttempt = false;
        this.formInputs();
    }
    LoginPage.prototype.formInputs = function () {
        this.inputs = this.formBuilder.group({
            username: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            password: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
        });
    };
    LoginPage.prototype.doLogin = function () {
        this.submitAttempt = true;
        if (!this.inputs.valid) {
            return;
        }
        var thisApp = this;
        var loader = __WEBPACK_IMPORTED_MODULE_4__libraries_views__["a" /* WBViews */].loading(this.loadingCtrl, 'Authenticating...');
        this.authProvider
            .login(this.inputs.value)
            .subscribe(function (response) {
            loader.dismiss();
            thisApp.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__app_app_component__["a" /* MyApp */]);
        }, function (e) {
            loader.dismiss();
            __WEBPACK_IMPORTED_MODULE_6__libraries_helper__["a" /* WBHelper */].alert({
                title: 'Validation Errors',
                desc: __WEBPACK_IMPORTED_MODULE_6__libraries_helper__["a" /* WBHelper */].getErrors(e)
            });
        });
    };
    LoginPage.prototype.openRegister = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_7__register_register__["a" /* RegisterPage */]);
    };
    LoginPage.prototype.openForgot = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_8__recovery_forgot__["a" /* RecoverPage */]);
    };
    LoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"E:\Projects\MobileCrossPlatform\Cordova\Ionic-Framework-Template\src\pages\authentication\login\login.html"*/'<!--\n * @author          Archie, Disono (webmonsph@gmail.com)\n * @link            https://webmons.com\n * @copyright       Webmons Development Studio. (webmons.com), 2018\n * @license         Apache, 2.0 https://github.com/disono/Ionic-Framework-Template/blob/master/LICENSE\n-->\n\n<ion-content>\n  <ion-grid>\n    <ion-row>\n      <form [formGroup]="inputs" (ngSubmit)="doLogin()" style="width: 100% !important;">\n        <ion-list padding>\n          <ion-item>\n            <ion-label color="primary">\n              <ion-icon name="ios-person"></ion-icon>\n            </ion-label>\n            <ion-input formControlName="username" type="text"\n                       placeholder="Username"\n                       [class.invalid]="!inputs.controls.username.valid && submitAttempt"></ion-input>\n          </ion-item>\n          <ion-item *ngIf="!inputs.controls.username.valid && submitAttempt" no-lines>\n            <p class="invalid-text">Please enter a valid username.</p>\n          </ion-item>\n\n          <ion-item>\n            <ion-label color="primary">\n              <ion-icon name="ios-lock"></ion-icon>\n            </ion-label>\n            <ion-input formControlName="password" placeholder="Password" type="password"></ion-input>\n          </ion-item>\n          <ion-item *ngIf="!inputs.controls.password.valid && submitAttempt" no-lines>\n            <p class="invalid-text">Password is required.</p>\n          </ion-item>\n        </ion-list>\n\n        <div padding>\n          <button ion-button block mode="ios" type="submit">Sign In</button>\n\n          <button ion-button block clear mode="ios" (click)="openRegister()" type="button">\n            <span>Don\'t have an account?</span>&nbsp;<span><strong>Sign up</strong></span></button>\n\n          <button ion-button block clear mode="ios" type="button" (click)="openForgot()">Forgot Password?</button>\n        </div>\n      </form>\n    </ion-row>\n  </ion-grid>\n</ion-content>\n'/*ion-inline-end:"E:\Projects\MobileCrossPlatform\Cordova\Ionic-Framework-Template\src\pages\authentication\login\login.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_3__providers_auth__["a" /* AuthProvider */]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 59:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BaseProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(169);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__ = __webpack_require__(411);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__libraries_helper__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__config__ = __webpack_require__(155);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__libraries_security__ = __webpack_require__(156);
/**
 * @author          Archie, Disono (webmonsph@gmail.com)
 * @link            https://webmons.com
 * @copyright       Webmons Development Studio. (webmons.com), 2018
 * @license         Apache, 2.0 https://github.com/disono/Ionic-Framework-Template/blob/master/LICENSE
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var BaseProvider = /** @class */ (function () {
    function BaseProvider(http) {
        this.http = http;
        console.log('Base Provider');
    }
    BaseProvider_1 = BaseProvider;
    /**
     * Authenticated user
     *
     * @returns {string}
     */
    BaseProvider.me = function () {
        return __WEBPACK_IMPORTED_MODULE_4__libraries_helper__["a" /* WBHelper */].getItem('user', true);
    };
    /**
     * Error
     *
     * @param response
     * @returns {any}
     * @private
     */
    BaseProvider._handleError = function (response) {
        if (response.success === false) {
            throw __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].throw(response.errors);
        }
        return response;
    };
    /**
     * 500 error
     *
     * @param e
     * @private
     */
    BaseProvider._handle500Error = function (e) {
        return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].throw(BaseProvider_1._extractErrors(e));
    };
    /**
     * Extract error messages
     *
     * @param e
     * @returns {string}
     * @private
     */
    BaseProvider._extractErrors = function (e) {
        return (e.error) ? ((e.error.errors) ? e.error.errors : (e.name + ': ' + e.message)) : e;
    };
    /**
     * Headers for upload
     *
     * @returns {HttpHeaders}
     */
    BaseProvider.prototype.headerUpload = function () {
        var me = BaseProvider_1.me();
        if (!me) {
            return new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["c" /* HttpHeaders */]();
        }
        return new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["c" /* HttpHeaders */]()
            .append('Authorization', "Bearer " + String(__WEBPACK_IMPORTED_MODULE_6__libraries_security__["a" /* WBSecurity */].jwtAuth()))
            .append('token_key', String(me.token.key))
            .append('authenticated_id', String(me.id));
    };
    /**
     * HttpHeaders for authenticated
     *
     * @returns {HttpHeaders}
     */
    BaseProvider.prototype.headersAuth = function () {
        var me = BaseProvider_1.me();
        if (!me) {
            return this.headersGuest();
        }
        if (!me.token) {
            return this.headersGuest();
        }
        return new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["c" /* HttpHeaders */]()
            .append('Content-Type', 'application/json')
            .append('Authorization', "Bearer " + String(__WEBPACK_IMPORTED_MODULE_6__libraries_security__["a" /* WBSecurity */].jwtAuth()))
            .append('token_key', String(me.token.key))
            .append('authenticated_id', String(me.id));
    };
    /**
     * HttpHeaders for guest
     *
     * @returns {HttpHeaders}
     */
    BaseProvider.prototype.headersGuest = function () {
        return new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["c" /* HttpHeaders */]()
            .append('Content-Type', 'application/json');
    };
    /**
     * GET
     *
     * @param uri
     * @param parameters
     * @param callbackSuccess
     * @returns {Promise<T | ErrorObservable>}
     */
    BaseProvider.prototype.get = function (uri, parameters, callbackSuccess) {
        var url = __WEBPACK_IMPORTED_MODULE_5__config__["a" /* WBConfig */].url() + uri;
        var headers = this.headersAuth();
        // parameters
        var params = new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["d" /* HttpParams */]();
        for (var key in parameters) {
            if (parameters.hasOwnProperty(key)) {
                var _val = (parameters[key] === null) ? '' : parameters[key];
                params = params.append(key, _val);
            }
        }
        return this.http
            .get(url, {
            headers: headers,
            params: params
        })
            .map(function (response) {
            var _response = BaseProvider_1._handleError(response);
            callbackSuccess(_response);
            return _response;
        })
            .catch(BaseProvider_1._handle500Error);
    };
    /**
     * POST
     *
     * @param uri
     * @param parameters
     * @param callbackSuccess
     * @returns {Promise<T | ErrorObservable>}
     */
    BaseProvider.prototype.post = function (uri, parameters, callbackSuccess) {
        var url = __WEBPACK_IMPORTED_MODULE_5__config__["a" /* WBConfig */].url() + uri;
        var headers = this.headersAuth();
        return this.http
            .post(url, parameters, {
            headers: headers
        })
            .map(function (response) {
            var _response = BaseProvider_1._handleError(response);
            callbackSuccess(_response);
            return _response;
        })
            .catch(BaseProvider_1._handle500Error);
    };
    /**
     * Upload
     *
     * Single files: {name: {val: file, filename: string}
     * Multiple files: {name_1: [{val: file, filename: string}, {val: file, filename: string}], name_2: [{val: file, filename: string}, {val: file, filename: string}]}
     *
     * @param uri
     * @param parameters
     * @param callbackSuccess
     */
    BaseProvider.prototype.upload = function (uri, parameters, callbackSuccess) {
        var url = __WEBPACK_IMPORTED_MODULE_5__config__["a" /* WBConfig */].url() + uri;
        var headers = this.headerUpload();
        var formData = new FormData();
        // files to upload
        if (parameters.files) {
            var files = parameters.files;
            for (var key in files) {
                if (files.hasOwnProperty(key)) {
                    if (Array.isArray(files[key])) {
                        // multiple files upload
                        for (var num = 0; num < files[key].length; num++) {
                            // make has values
                            if (files[key][num].val) {
                                formData.append(key + '[]', files[key][num].val, files[key][num].filename);
                            }
                        }
                    }
                    else {
                        // single upload
                        if (files[key]) {
                            formData.append(key, files[key].val, files[key].filename);
                        }
                    }
                }
            }
        }
        // other form inputs
        if (parameters.inputs) {
            for (var key in parameters.inputs) {
                if (parameters.inputs.hasOwnProperty(key)) {
                    formData.append(key, parameters.inputs[key]);
                }
            }
        }
        return this.http
            .post(url, formData, {
            headers: headers
        })
            .map(function (response) {
            var res = BaseProvider_1._handleError(response);
            callbackSuccess(res);
            return res;
        })
            .catch(BaseProvider_1._handle500Error);
    };
    BaseProvider = BaseProvider_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */]])
    ], BaseProvider);
    return BaseProvider;
    var BaseProvider_1;
}());

//# sourceMappingURL=base.js.map

/***/ }),

/***/ 691:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthSocialProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__base__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__auth__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__libraries_helper__ = __webpack_require__(23);
/**
 * @author          Archie, Disono (webmonsph@gmail.com)
 * @link            https://webmons.com
 * @copyright       Webmons Development Studio. (webmons.com), 2018
 * @license         Apache, 2.0 https://github.com/disono/Ionic-Framework-Template/blob/master/LICENSE
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AuthSocialProvider = /** @class */ (function () {
    function AuthSocialProvider(base, auth) {
        this.base = base;
        this.auth = auth;
        __WEBPACK_IMPORTED_MODULE_3__libraries_helper__["a" /* WBHelper */].log('AuthSocial Provider');
    }
    AuthSocialProvider.prototype.facebook = function () {
    };
    AuthSocialProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__base__["a" /* BaseProvider */], __WEBPACK_IMPORTED_MODULE_2__auth__["a" /* AuthProvider */]])
    ], AuthSocialProvider);
    return AuthSocialProvider;
}());

//# sourceMappingURL=authSocial.js.map

/***/ }),

/***/ 692:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ApplicationProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__libraries_helper__ = __webpack_require__(23);
/**
 * @author          Archie, Disono (webmonsph@gmail.com)
 * @link            https://webmons.com
 * @copyright       Webmons Development Studio. (webmons.com), 2018
 * @license         Apache, 2.0 https://github.com/disono/Ionic-Framework-Template/blob/master/LICENSE
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ApplicationProvider = /** @class */ (function () {
    function ApplicationProvider() {
        __WEBPACK_IMPORTED_MODULE_1__libraries_helper__["a" /* WBHelper */].log('Application Provider');
    }
    ApplicationProvider.prototype.settings = function () {
    };
    ApplicationProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [])
    ], ApplicationProvider);
    return ApplicationProvider;
}());

//# sourceMappingURL=application.js.map

/***/ }),

/***/ 693:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ShowPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/**
 * @author          Archie, Disono (webmonsph@gmail.com)
 * @link            https://webmons.com
 * @copyright       Webmons Development Studio. (webmons.com), 2018
 * @license         Apache, 2.0 https://github.com/disono/Ionic-Framework-Template/blob/master/LICENSE
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ShowPage = /** @class */ (function () {
    function ShowPage(navCtrl) {
        this.navCtrl = navCtrl;
    }
    ShowPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"E:\Projects\MobileCrossPlatform\Cordova\Ionic-Framework-Template\src\pages\page\show\show.html"*/'<!--\n * @author          Archie, Disono (webmonsph@gmail.com)\n * @link            https://webmons.com\n * @copyright       Webmons Development Studio. (webmons.com), 2018\n * @license         Apache, 2.0 https://github.com/disono/Ionic-Framework-Template/blob/master/LICENSE\n-->\n\n<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n\n    <ion-title>Page</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n\n</ion-content>\n'/*ion-inline-end:"E:\Projects\MobileCrossPlatform\Cordova\Ionic-Framework-Template\src\pages\page\show\show.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */]])
    ], ShowPage);
    return ShowPage;
}());

//# sourceMappingURL=show.js.map

/***/ }),

/***/ 90:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PageProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__libraries_helper__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__base__ = __webpack_require__(59);
/**
 * @author          Archie, Disono (webmonsph@gmail.com)
 * @link            https://webmons.com
 * @copyright       Webmons Development Studio. (webmons.com), 2018
 * @license         Apache, 2.0 https://github.com/disono/Ionic-Framework-Template/blob/master/LICENSE
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var PageProvider = /** @class */ (function () {
    function PageProvider(base) {
        this.base = base;
        __WEBPACK_IMPORTED_MODULE_1__libraries_helper__["a" /* WBHelper */].log('Page Provider');
    }
    PageProvider.prototype.show = function (slug) {
        return this.base.get('p/' + slug, null, function (res) {
            __WEBPACK_IMPORTED_MODULE_1__libraries_helper__["a" /* WBHelper */].log('Page-show: ' + res);
        });
    };
    PageProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__base__["a" /* BaseProvider */]])
    ], PageProvider);
    return PageProvider;
}());

//# sourceMappingURL=page.js.map

/***/ })

},[363]);
//# sourceMappingURL=main.js.map