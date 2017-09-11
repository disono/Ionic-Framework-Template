webpackJsonp([0],{

/***/ 11:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WBHelper; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__config__ = __webpack_require__(37);
/**
 * @author Archie, Disono (webmonsph@gmail.com)
 * @git https://github.com/disono/Ionic-Framework-Template
 * @copyright Webmons Development Studio. (webmons.com), 2016-2017
 * @license Apache, 2.0 https://github.com/disono/Ionic-Framework-Template/blob/master/LICENSE
 */

var _WBHelper = (function () {
    return {
        defaults: function (params_defaults, options) {
            for (var prop in params_defaults) {
                // Note: if options would contain some undefined or unnecessary values, you should check for undefined instead.
                options[prop] = (typeof options[prop] !== 'undefined') ? options[prop] : params_defaults[prop];
            }
            params_defaults = options;
            return params_defaults;
        },
        /**
         * Convert string to bytes
         *
         * @param val
         * @returns {Array}
         */
        stringToByte: function (val) {
            var bytes = [];
            for (var i = 0; i < val.length; ++i) {
                bytes.push(val.charCodeAt(i));
            }
            return bytes;
        },
        /**
         * Convert byte to string
         *
         * @param val
         * @returns {string}
         */
        byteToString: function (val) {
            return String.fromCharCode.apply(String, val);
        },
        /**
         * set local storage
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
         * get local storage
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
         * remove local storage
         *
         * @param key
         */
        removeItem: function (key) {
            window.localStorage.removeItem(key);
        },
        /**
         * clear local storage
         */
        clearItem: function () {
            window.localStorage.clear();
        },
        /**
         * check for network access connection
         *
         * @returns {boolean}
         */
        hasConnection: function () {
            if (__WEBPACK_IMPORTED_MODULE_0__config__["a" /* WBConfig */].is_browser) {
                return true;
            }
            if (navigator.connection.type == Connection.NONE) {
                _WBHelper.showToast('No network connection.');
                return false;
            }
            else {
                return true;
            }
        },
        /**
         * show toast
         *
         * @param message
         */
        showToast: function (message) {
            if (__WEBPACK_IMPORTED_MODULE_0__config__["a" /* WBConfig */].is_browser) {
                console.log(message);
                return;
            }
            window.plugins.toast.showWithOptions({
                message: message,
                duration: "short",
                position: "bottom"
            }, function () {
            }, function (e) {
                console.error(e);
            });
        },
        /**
         * android alert box
         *
         * @params object {desc, title, callBackFunction, btnOk}
         */
        alert: function (options) {
            if (__WEBPACK_IMPORTED_MODULE_0__config__["a" /* WBConfig */].is_browser) {
                console.debug('Alert: ' + options.title + ', ' + options.desc);
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
         * android confirm box
         *
         * @params object {desc, title, callBackFunction, btnOk}
         */
        confirm: function (options) {
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
         * show error messages
         *
         * @param obj
         */
        errorMessage: function (obj) {
            var errorText = '';
            if (typeof obj === 'object') {
                jQ.each(obj, function (k, v) {
                    _WBHelper.showToast(v.toString());
                    errorText = v.toString();
                    return false;
                });
                return errorText;
            }
            else {
                if (!obj) {
                    _WBHelper.showToast('Unknown error occurred, or please check your network connection.');
                }
                _WBHelper.showToast(obj);
                return obj;
            }
        },
        /**
         * Notify
         * @url https://github.com/katzer/cordova-plugin-local-notifications
         *
         * @param title
         * @param description
         */
        notify: function (title, description) {
            if (__WEBPACK_IMPORTED_MODULE_0__config__["a" /* WBConfig */].is_browser) {
                console.warn('Notify: ' + title + ', ' + description);
                return;
            }
            cordova.plugins.notification.local.schedule({
                id: new Date().getTime(),
                title: title,
                text: description
            });
        },
        /**
         * Date
         *
         * @param value
         */
        humaDate: function (value) {
            return moment(new Date(value)).format('MMMM DD YYYY');
        },
        /**
         * Get the current location
         *
         * @param successCallback
         * @param errorCallback
         *
         * returns
         * lat: position.coords.latitude
         * lng: position.coords.longitude
         */
        getCurrentPosition: function (successCallback, errorCallback) {
            navigator.geolocation.getCurrentPosition(function (position) {
                __WEBPACK_IMPORTED_MODULE_0__config__["a" /* WBConfig */].lat = position.coords.latitude;
                __WEBPACK_IMPORTED_MODULE_0__config__["a" /* WBConfig */].lng = position.coords.longitude;
                console.log(position);
                successCallback(position);
            }, function (error) {
                console.error('GPS Error (getCurrentPosition): ' + error.message + ', code: ' + error.code);
                errorCallback(error);
            }, {
                timeout: 30000,
                enableHighAccuracy: true
            });
        },
        /**
         * Watch the current position
         *
         * @param successCallback
         * @param errorCallback
         *
         * returns
         * lat: position.coords.latitude
         * lng: position.coords.longitude
         */
        watchPosition: function (successCallback, errorCallback) {
            // clear the data on GPS watch
            if (__WEBPACK_IMPORTED_MODULE_0__config__["a" /* WBConfig */].watchPositionID) {
                navigator.geolocation.clearWatch(__WEBPACK_IMPORTED_MODULE_0__config__["a" /* WBConfig */].watchPositionID);
                __WEBPACK_IMPORTED_MODULE_0__config__["a" /* WBConfig */].watchPositionID = null;
            }
            // watch the current position
            __WEBPACK_IMPORTED_MODULE_0__config__["a" /* WBConfig */].watchPositionID = navigator.geolocation.watchPosition(function (position) {
                __WEBPACK_IMPORTED_MODULE_0__config__["a" /* WBConfig */].lat = position.coords.latitude;
                __WEBPACK_IMPORTED_MODULE_0__config__["a" /* WBConfig */].lng = position.coords.longitude;
                console.log(position);
                successCallback(position);
            }, function (error) {
                console.error('GPS Error (watchPosition): ' + error.message + ', code: ' + error.code);
                errorCallback(error);
            }, {
                timeout: 30000,
                enableHighAccuracy: true
            });
        },
        /**
         * Stop the GPS watch
         */
        stopWatchPosition: function () {
            if (__WEBPACK_IMPORTED_MODULE_0__config__["a" /* WBConfig */].watchPositionID) {
                navigator.geolocation.clearWatch(__WEBPACK_IMPORTED_MODULE_0__config__["a" /* WBConfig */].watchPositionID);
                __WEBPACK_IMPORTED_MODULE_0__config__["a" /* WBConfig */].watchPositionID = null;
            }
        },
        /**
         * Log messages
         *
         * @param message
         */
        log: function (message) {
            if (__WEBPACK_IMPORTED_MODULE_0__config__["a" /* WBConfig */].is_browser || !message) {
                return;
            }
            console.log('WB Log ' + new Date() + ': ' + message);
        },
        /**
         * Log errors
         *
         * @param message
         */
        error: function (message) {
            if (__WEBPACK_IMPORTED_MODULE_0__config__["a" /* WBConfig */].is_browser || !message) {
                return;
            }
            console.log('WB Error ' + new Date() + ': ' + message);
        }
    };
}());
var WBHelper = _WBHelper;
//# sourceMappingURL=helper.js.map

/***/ }),

/***/ 142:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ECommerceProductListPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_ecommerce_product_product__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_auth_provider__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_ecommerce_cart_cart__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__lib_helper__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__product_show__ = __webpack_require__(143);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__filter_modal__ = __webpack_require__(283);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__authentication_login__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__cart_content__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_ionic_image_loader__ = __webpack_require__(31);
/**
 * @author Archie, Disono (webmonsph@gmail.com)
 * @git https://github.com/disono/Ionic-Framework-Template
 * @copyright Webmons Development Studio. (webmons.com), 2016-2017
 * @license Apache, 2.0 https://github.com/disono/Ionic-Framework-Template/blob/master/LICENSE
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











var ECommerceProductListPage = (function () {
    function ECommerceProductListPage(nav, product, authProvider, cart, modalCtrl) {
        this.nav = nav;
        this.product = product;
        this.authProvider = authProvider;
        this.cart = cart;
        this.modalCtrl = modalCtrl;
        this.rowNumGrid = 0;
        this.data_list = [];
        this.init_loading = true;
        this.is_refreshing = false;
        this.is_fetching = false;
        this.refresher = null;
        this.infiniteScroll = null;
        this.filter = {
            search: null,
            min_srp: null,
            max_srp: null,
            product_category_id: null,
            is_sale: null,
            is_latest: null,
            is_featured: null,
            page: 1
        };
    }
    ECommerceProductListPage.prototype.ionViewDidLoad = function () {
        var thisApp = this;
        thisApp.init();
    };
    ECommerceProductListPage.prototype.init = function () {
        this.init_loading = true;
        this.refresher = null;
        this.infiniteScroll = null;
        this.is_fetching = false;
        this.data_list = [];
        this.filter.page = 1;
        // fetch data
        this.fetchData();
        this.is_refreshing = true;
    };
    /**
     * Pull refresh
     *
     * @param refresher
     */
    ECommerceProductListPage.prototype.doRefresh = function (refresher) {
        this.refresher = refresher;
        this.filter.page = 1;
        this.fetchData();
        this.is_refreshing = true;
    };
    /**
     * Infinite scroll
     *
     * @param infiniteScroll
     */
    ECommerceProductListPage.prototype.doInfinite = function (infiniteScroll) {
        this.infiniteScroll = infiniteScroll;
        this.fetchData();
    };
    /**
     * Fetch the data to server
     */
    ECommerceProductListPage.prototype.fetchData = function () {
        var thisApp = this;
        // the application is still fetch data to server
        if (thisApp.is_refreshing || thisApp.is_fetching) {
            return;
        }
        // fetch data to server
        thisApp.is_fetching = true;
        thisApp.product.index(thisApp.filter).subscribe(function (res) {
            // reset data if refreshing
            if (thisApp.is_refreshing) {
                thisApp.rowNumGrid = 0;
                thisApp.data_list = [];
            }
            // format data
            thisApp.formatListDataToGrid(res.data);
            // development
            __WEBPACK_IMPORTED_MODULE_5__lib_helper__["a" /* WBHelper */].log('Page: ' + thisApp.filter.page + ' Data: ' + JSON.stringify(res.data));
            // update the page
            if (res.data.length) {
                thisApp.filter.page++;
            }
            thisApp.completeFetch();
        }, function (error) {
            thisApp.completeFetch();
        });
    };
    /**
     * Format data list to grid
     *
     * @param data
     */
    ECommerceProductListPage.prototype.formatListDataToGrid = function (data) {
        var thisApp = this;
        // counter to iterate over the rows in the grid
        var iterator = (data.length == 1) ? 1 : 2;
        // iterate data
        for (var i = 0; i < data.length; i += iterator) {
            // declare two elements per row
            var innerIterator = (data[i] && data[i + 1]) ? 2 : 1;
            thisApp.data_list[thisApp.rowNumGrid] = Array(innerIterator);
            // check dat exists
            if (data[i]) {
                // insert data
                thisApp.data_list[thisApp.rowNumGrid][0] = data[i];
            }
            // repeat for the second data
            if (data[i + 1]) {
                thisApp.data_list[thisApp.rowNumGrid][1] = data[i + 1];
            }
            // go on to the next row
            thisApp.rowNumGrid++;
        }
    };
    /**
     * Fetch completed
     */
    ECommerceProductListPage.prototype.completeFetch = function () {
        this.init_loading = false;
        this.is_fetching = false;
        this.is_refreshing = false;
        if (this.refresher) {
            this.refresher.complete();
        }
        if (this.infiniteScroll) {
            this.infiniteScroll.complete();
        }
    };
    /**
     * Search products open the modals for filters
     */
    ECommerceProductListPage.prototype.searchProducts = function () {
        var _this = this;
        var thisApp = this;
        __WEBPACK_IMPORTED_MODULE_5__lib_helper__["a" /* WBHelper */].log('Search Products.');
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_7__filter_modal__["a" /* ECommerceProductFilterModal */], {
            filter: thisApp.filter
        });
        modal.onDidDismiss(function (data) {
            if (data) {
                __WEBPACK_IMPORTED_MODULE_5__lib_helper__["a" /* WBHelper */].log(data);
                thisApp.filter.page = 1;
                thisApp.filter = data;
                thisApp.fetchData();
                _this.is_refreshing = true;
            }
        });
        modal.present();
    };
    /**
     * Add to cart
     *
     * @param product_id
     */
    ECommerceProductListPage.prototype.addToCart = function (product_id) {
        var thisApp = this;
        if (thisApp.authProvider.check()) {
            thisApp.storeToCart(product_id);
        }
        else {
            // show the login page (modal)
            var loginModal = thisApp.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_8__authentication_login__["a" /* LoginPage */], {
                return_page: 'modal',
                nav: thisApp.nav
            });
            loginModal.onDidDismiss(function (data) {
                thisApp.storeToCart(product_id);
            });
            loginModal.present();
        }
    };
    /**
     * Store to cart the item
     *
     * @param product_id
     */
    ECommerceProductListPage.prototype.storeToCart = function (product_id) {
        var thisApp = this;
        thisApp.cart.add(product_id).subscribe(function (response) {
            __WEBPACK_IMPORTED_MODULE_5__lib_helper__["a" /* WBHelper */].showToast('Your item is successfully added to cart.');
            thisApp.nav.setRoot(__WEBPACK_IMPORTED_MODULE_9__cart_content__["a" /* ECommerceCartContentPage */]);
        }, function (error) {
            __WEBPACK_IMPORTED_MODULE_5__lib_helper__["a" /* WBHelper */].error('Subscribe Error: ' + error);
        });
    };
    /**
     * Show product details
     *
     * @param id
     */
    ECommerceProductListPage.prototype.showProduct = function (id) {
        __WEBPACK_IMPORTED_MODULE_5__lib_helper__["a" /* WBHelper */].log('Product: ' + id);
        this.nav.push(__WEBPACK_IMPORTED_MODULE_6__product_show__["a" /* ECommerceProductShowPage */], {
            id: id
        });
    };
    /**
     * String limit
     *
     * @param str
     * @returns {string}
     */
    ECommerceProductListPage.prototype.stringLimit = function (str) {
        return (str.length > 14) ? str.substring(0, 14) + '...' : str;
    };
    return ECommerceProductListPage;
}());
ECommerceProductListPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_10_ionic_image_loader__["a" /* IonicImageLoader */]
        ]
    }),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"E:\Projects\MobileCrossPlatform\Ionic-Framework-Template\src\pages\ecommerce\product\product.list.html"*/'<!--\n* @author Archie, Disono (webmonsph@gmail.com)\n* @git https://github.com/disono/Ionic-Framework-Template\n* @copyright Webmons Development Studio. (webmons.com), 2016-2017\n* @license Apache, 2.0 https://github.com/disono/Ionic-Framework-Template/blob/master/LICENSE\n-->\n\n<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n\n    <ion-title>\n      Items\n    </ion-title>\n\n    <ion-buttons end>\n      <button ion-button icon-only (click)="searchProducts()">\n        <ion-icon name="search"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<ion-content class="bg-product-list">\n  <ion-refresher *ngIf="!init_loading" (ionRefresh)="doRefresh($event)">\n    <ion-refresher-content></ion-refresher-content>\n  </ion-refresher>\n\n  <div *ngIf="!init_loading">\n    <ion-grid>\n      <ion-row *ngFor="let data_fetch of data_list">\n        <ion-col width-50 *ngFor="let item of data_fetch">\n          <ion-card>\n            <!-- item image -->\n            <img-loader src="{{item.cover}}" (click)="showProduct(item.id)" useImg></img-loader>\n\n            <ion-card-content>\n              <!-- item name -->\n              <h4 (click)="showProduct(item.id)">\n                {{stringLimit(item.name)}}\n              </h4>\n\n              <!-- srp and discounted srp -->\n              <p [innerHTML]="item.formatted_srp" color="danger"></p>\n              <p *ngIf="item.srp_discounted" [innerHTML]="item.formatted_srp_discounted"\n                 style="text-decoration: line-through;"></p>\n\n              <!-- add to cart button -->\n              <button (click)="addToCart(item.id)" ion-button block clear>Add to cart</button>\n            </ion-card-content>\n          </ion-card>\n        </ion-col>\n      </ion-row>\n    </ion-grid>\n  </div>\n\n  <h1 class="text-center" *ngIf="!data_list.length && !init_loading">\n    No Items Found.\n  </h1>\n\n  <ion-infinite-scroll *ngIf="!init_loading" (ionInfinite)="doInfinite($event)">\n    <ion-infinite-scroll-content></ion-infinite-scroll-content>\n  </ion-infinite-scroll>\n\n  <h1 class="text-center" *ngIf="init_loading">\n    <ion-spinner icon="spiral"></ion-spinner>\n    Loading...\n  </h1>\n</ion-content>\n'/*ion-inline-end:"E:\Projects\MobileCrossPlatform\Ionic-Framework-Template\src\pages\ecommerce\product\product.list.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__providers_ecommerce_product_product__["a" /* ECommerceProduct */], __WEBPACK_IMPORTED_MODULE_3__providers_auth_provider__["a" /* AuthProvider */], __WEBPACK_IMPORTED_MODULE_4__providers_ecommerce_cart_cart__["a" /* ECommerceCart */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ModalController */]])
], ECommerceProductListPage);

//# sourceMappingURL=product.list.js.map

/***/ }),

/***/ 143:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ECommerceProductShowPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_ecommerce_product_product__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__lib_views__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__lib_helper__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_auth_provider__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_ecommerce_cart_cart__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__cart_content__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__authentication_login__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_ionic_image_loader__ = __webpack_require__(31);
/**
 * @author Archie, Disono (webmonsph@gmail.com)
 * @git https://github.com/disono/Ionic-Framework-Template
 * @copyright Webmons Development Studio. (webmons.com), 2016-2017
 * @license Apache, 2.0 https://github.com/disono/Ionic-Framework-Template/blob/master/LICENSE
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










var ECommerceProductShowPage = (function () {
    function ECommerceProductShowPage(nav, params, auth, cart, product, loadingCtrl, modalCtrl) {
        this.nav = nav;
        this.params = params;
        this.auth = auth;
        this.cart = cart;
        this.product = product;
        this.loadingCtrl = loadingCtrl;
        this.modalCtrl = modalCtrl;
        this.title = 'Item';
        this.details = null;
        __WEBPACK_IMPORTED_MODULE_4__lib_helper__["a" /* WBHelper */].log('Product ID: ' + params.get('id'));
        this.fetch(params.get('id'));
    }
    /**
     * Fetch the details on server
     *
     * @param id
     */
    ECommerceProductShowPage.prototype.fetch = function (id) {
        var thisApp = this;
        var loading = __WEBPACK_IMPORTED_MODULE_3__lib_views__["a" /* WBView */].loading(thisApp.loadingCtrl, 'Loading');
        thisApp.product.show(id).subscribe(function (response) {
            loading.dismiss();
            thisApp.details = response.data;
            thisApp.title = thisApp.details.name;
        }, function (error) {
            loading.dismiss();
            // close the page
            thisApp.nav.pop();
        });
    };
    /**
     * Add to cart
     *
     * @param product_id
     */
    ECommerceProductShowPage.prototype.addToCart = function (product_id) {
        var thisApp = this;
        if (thisApp.auth.check()) {
            thisApp.storeToCart(product_id);
        }
        else {
            // show the login page (modal)
            var loginModal = thisApp.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_8__authentication_login__["a" /* LoginPage */], {
                return_page: 'modal',
                nav: thisApp.nav
            });
            loginModal.onDidDismiss(function (data) {
                thisApp.storeToCart(product_id);
            });
            loginModal.present();
        }
    };
    /**
     * Store to cart the item
     *
     * @param product_id
     */
    ECommerceProductShowPage.prototype.storeToCart = function (product_id) {
        var thisApp = this;
        thisApp.cart.add(product_id).subscribe(function (response) {
            __WEBPACK_IMPORTED_MODULE_4__lib_helper__["a" /* WBHelper */].showToast('Your item is successfully added to cart.');
            thisApp.nav.setRoot(__WEBPACK_IMPORTED_MODULE_7__cart_content__["a" /* ECommerceCartContentPage */]);
        }, function (error) {
            __WEBPACK_IMPORTED_MODULE_4__lib_helper__["a" /* WBHelper */].error('Subscribe Error: ' + error);
        });
    };
    /**
     * Cart list
     */
    ECommerceProductShowPage.prototype.cartList = function () {
        this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_7__cart_content__["a" /* ECommerceCartContentPage */]);
    };
    return ECommerceProductShowPage;
}());
ECommerceProductShowPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_9_ionic_image_loader__["a" /* IonicImageLoader */]
        ]
    }),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"E:\Projects\MobileCrossPlatform\Ionic-Framework-Template\src\pages\ecommerce\product\product.show.html"*/'<!--\n* @author Archie, Disono (webmonsph@gmail.com)\n* @git https://github.com/disono/Ionic-Framework-Template\n* @copyright Webmons Development Studio. (webmons.com), 2016-2017\n* @license Apache, 2.0 https://github.com/disono/Ionic-Framework-Template/blob/master/LICENSE\n-->\n\n<ion-header>\n  <ion-navbar>\n    <ion-title>\n      {{title}}\n    </ion-title>\n\n    <ion-buttons *ngIf="details" end>\n      <button ion-button icon-only (click)="cartList()">\n        <ion-icon ios="ios-cart" md="md-cart"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <div *ngIf="details">\n    <h1>{{title}}</h1>\n    <p *ngIf="details.size">{{details.size}}</p>\n\n    <!-- srp and discounted srp -->\n    <h5 [innerHTML]="details.formatted_srp" color="danger"></h5>\n    <h6 *ngIf="details.srp_discounted" [innerHTML]="details.formatted_srp_discounted"\n        style="text-decoration: line-through;"></h6>\n\n    <!-- images on slider -->\n    <ion-slides pager *ngIf="details.images.length">\n      <ion-slide *ngFor="let image of details.images" style="width: 100% !important;">\n        <img-loader src="{{image.path}}" useImg></img-loader>\n      </ion-slide>\n    </ion-slides>\n\n    <h5>Product Details</h5>\n\n    <h6 *ngIf="details.description">Product Description</h6>\n    <p *ngIf="details.description">{{details.description}}</p>\n\n    <h6 *ngIf="details.features">Product Features</h6>\n    <p *ngIf="details.features">{{details.features}}</p>\n\n    <h6 *ngIf="details.application">Application</h6>\n    <p *ngIf="details.application">{{details.application}}</p>\n\n    <h6 *ngIf="details.suitable_for">Suitable For</h6>\n    <p *ngIf="details.suitable_for">{{details.suitable_for}}</p>\n  </div>\n\n  <h1 class="text-center" *ngIf="!details">\n    <ion-spinner icon="spiral"></ion-spinner>\n    Loading...\n  </h1>\n</ion-content>\n\n<!-- add to cart button -->\n<ion-footer *ngIf="details">\n  <ion-toolbar>\n    <button ion-button block color="danger" (click)="addToCart(details.id)">\n      <ion-icon ios="ios-cart" md="md-cart"></ion-icon>\n      Add to cart\n    </button>\n  </ion-toolbar>\n</ion-footer>\n'/*ion-inline-end:"E:\Projects\MobileCrossPlatform\Ionic-Framework-Template\src\pages\ecommerce\product\product.show.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */], __WEBPACK_IMPORTED_MODULE_5__providers_auth_provider__["a" /* AuthProvider */], __WEBPACK_IMPORTED_MODULE_6__providers_ecommerce_cart_cart__["a" /* ECommerceCart */],
        __WEBPACK_IMPORTED_MODULE_2__providers_ecommerce_product_product__["a" /* ECommerceProduct */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ModalController */]])
], ECommerceProductShowPage);

//# sourceMappingURL=product.show.js.map

/***/ }),

/***/ 144:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ECommerceOrder; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__apd_provider__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lib_helper__ = __webpack_require__(11);
/**
 * @author Archie, Disono (webmonsph@gmail.com)
 * @git https://github.com/disono/Ionic-Framework-Template
 * @copyright Webmons Development Studio. (webmons.com), 2016-2017
 * @license Apache, 2.0 https://github.com/disono/Ionic-Framework-Template/blob/master/LICENSE
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



var ECommerceOrder = (function () {
    function ECommerceOrder(appProvider) {
        this.appProvider = appProvider;
        __WEBPACK_IMPORTED_MODULE_2__lib_helper__["a" /* WBHelper */].log('ECommerce Orders Called.');
    }
    /**
     * Orders
     *
     * @returns {any}
     */
    ECommerceOrder.prototype.index = function (page) {
        return this.appProvider.get('e-commerce/order', {
            page: page
        }, function (res) {
            __WEBPACK_IMPORTED_MODULE_2__lib_helper__["a" /* WBHelper */].log('Order-index: ' + res);
        });
    };
    /**
     * Show ordered items
     *
     * @param id
     * @returns {any}
     */
    ECommerceOrder.prototype.show = function (id) {
        return this.appProvider.get('e-commerce/order/show/' + id, null, function (res) {
            __WEBPACK_IMPORTED_MODULE_2__lib_helper__["a" /* WBHelper */].log('Order-show: ' + res);
        });
    };
    return ECommerceOrder;
}());
ECommerceOrder = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__apd_provider__["a" /* APDProvider */]])
], ECommerceOrder);

//# sourceMappingURL=order.js.map

/***/ }),

/***/ 145:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MessageProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__apd_provider__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lib_helper__ = __webpack_require__(11);
/**
 * @author Archie, Disono (webmonsph@gmail.com)
 * @git https://github.com/disono/Ionic-Framework-Template
 * @copyright Webmons Development Studio. (webmons.com), 2016-2017
 * @license Apache, 2.0 https://github.com/disono/Ionic-Framework-Template/blob/master/LICENSE
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



var MessageProvider = (function () {
    function MessageProvider(appProvider) {
        this.appProvider = appProvider;
        __WEBPACK_IMPORTED_MODULE_2__lib_helper__["a" /* WBHelper */].log('Message Provider Called.');
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
            __WEBPACK_IMPORTED_MODULE_2__lib_helper__["a" /* WBHelper */].log('Message-inbox: ' + res);
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
            __WEBPACK_IMPORTED_MODULE_2__lib_helper__["a" /* WBHelper */].log('Message-reading: ' + res);
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
            __WEBPACK_IMPORTED_MODULE_2__lib_helper__["a" /* WBHelper */].log('Message-group: ' + res);
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
    return MessageProvider;
}());
MessageProvider = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__apd_provider__["a" /* APDProvider */]])
], MessageProvider);

//# sourceMappingURL=message-provider.js.map

/***/ }),

/***/ 156:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	return new Promise(function(resolve, reject) { reject(new Error("Cannot find module '" + req + "'.")); });
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 156;

/***/ }),

/***/ 200:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	return new Promise(function(resolve, reject) { reject(new Error("Cannot find module '" + req + "'.")); });
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 200;

/***/ }),

/***/ 21:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lib_helper__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__apd_provider__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__lib_config__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__lib_socket__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__lib_security__ = __webpack_require__(271);
/**
 * @author Archie, Disono (webmonsph@gmail.com)
 * @git https://github.com/disono/Ionic-Framework-Template
 * @copyright Webmons Development Studio. (webmons.com), 2016-2017
 * @license Apache, 2.0 https://github.com/disono/Ionic-Framework-Template/blob/master/LICENSE
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






var AuthProvider = (function () {
    function AuthProvider(appProvider) {
        this.appProvider = appProvider;
        __WEBPACK_IMPORTED_MODULE_1__lib_helper__["a" /* WBHelper */].log('AuthProvider Provider Called.');
    }
    /**
     * Login
     *
     * @param parameters
     * @returns {any}
     */
    AuthProvider.prototype.login = function (parameters) {
        return this.appProvider.post('auth/login', parameters, function (res) {
            __WEBPACK_IMPORTED_MODULE_1__lib_helper__["a" /* WBHelper */].log('AuthProvider-login: ' + res);
            __WEBPACK_IMPORTED_MODULE_5__lib_security__["a" /* WBSecurity */].saveAuth(res.data);
        });
    };
    /**
     * Facebook authentication
     */
    AuthProvider.prototype.facebook = function (successCallback, errorCallback, completeCallback) {
        var thisApp = this;
        var permissions = [
            'email', 'user_birthday'
        ];
        if (__WEBPACK_IMPORTED_MODULE_3__lib_config__["a" /* WBConfig */].is_browser || !__WEBPACK_IMPORTED_MODULE_3__lib_config__["a" /* WBConfig */].facebook_auth) {
            alert('Facebook login is not compatible with browser mode, or the facebook authentication is disabled.');
            completeCallback();
        }
        else {
            // remove any facebook auth
            thisApp.facebookLogout(function () {
                // start to login
                facebookConnectPlugin.login(permissions, function (login_response) {
                    if (typeof login_response !== 'string') {
                        // get user
                        facebookConnectPlugin.api('/me?fields=name,first_name,last_name,email,gender,birthday', permissions, function (api_response) {
                            // submit to server
                            thisApp.register({
                                social_id: api_response.id,
                                first_name: api_response.first_name,
                                last_name: api_response.last_name,
                                email: api_response.email
                            }).subscribe(function (register_response) {
                                // save
                                __WEBPACK_IMPORTED_MODULE_5__lib_security__["a" /* WBSecurity */].saveAuth(register_response.data);
                                // call success
                                successCallback(register_response);
                            }, function (register_error) {
                                errorCallback("Server Failed: " + register_error);
                            });
                        }, function (api_error) {
                            errorCallback('API FB Response: ' + JSON.stringify(api_error));
                        });
                    }
                    else {
                        errorCallback('Auth FB Response: ' + login_response);
                    }
                }, function (login_error) {
                    errorCallback('Auth FB API: ' + JSON.stringify(login_error));
                });
            });
        }
    };
    /**
     * Facebook logout
     */
    AuthProvider.prototype.facebookLogout = function (callback) {
        // facebook logout
        if (!__WEBPACK_IMPORTED_MODULE_3__lib_config__["a" /* WBConfig */].is_browser && __WEBPACK_IMPORTED_MODULE_3__lib_config__["a" /* WBConfig */].facebook_auth) {
            facebookConnectPlugin.logout(function (success) {
                callback();
            }, function (error) {
                callback();
            });
        }
    };
    /**
     * Forgot password
     *
     * @param parameters
     * @returns {any}
     */
    AuthProvider.prototype.forgot = function (parameters) {
        return this.appProvider.post('password/recover', parameters, function (res) {
            __WEBPACK_IMPORTED_MODULE_1__lib_helper__["a" /* WBHelper */].log('AuthProvider-forgot: ' + res);
        });
    };
    /**
     * Register
     *
     * @param parameters
     * @returns {any}
     */
    AuthProvider.prototype.register = function (parameters) {
        return this.appProvider.post('auth/register', parameters, function (res) {
            __WEBPACK_IMPORTED_MODULE_1__lib_helper__["a" /* WBHelper */].log('AuthProvider-register: ' + res);
        });
    };
    /**
     * Update user settings or profile
     *
     * @param parameters
     * @param successCallback
     * @param errorCallback
     */
    AuthProvider.prototype.update = function (parameters, successCallback, errorCallback) {
        this.appProvider.upload('user/update/setting', parameters, function (res) {
            // success
            successCallback(res);
            __WEBPACK_IMPORTED_MODULE_5__lib_security__["a" /* WBSecurity */].saveAuth(res.data);
        }, function (res) {
            // errors
            errorCallback(res);
        });
    };
    /**
     * Update security
     *
     * @param parameters
     * @returns {any}
     */
    AuthProvider.prototype.security = function (parameters) {
        return this.appProvider.post('user/update/security', parameters, function (res) {
            __WEBPACK_IMPORTED_MODULE_1__lib_helper__["a" /* WBHelper */].log('AuthProvider-security: ' + res);
            __WEBPACK_IMPORTED_MODULE_5__lib_security__["a" /* WBSecurity */].saveAuth(res.data);
        });
    };
    /**
     * Sync user details
     *
     * @returns {any}
     */
    AuthProvider.prototype.sync = function () {
        var thisApp = this;
        return this.appProvider.get('user/' + thisApp.user().id, null, function (res) {
            __WEBPACK_IMPORTED_MODULE_1__lib_helper__["a" /* WBHelper */].log('AuthProvider-sync: ' + res);
            __WEBPACK_IMPORTED_MODULE_5__lib_security__["a" /* WBSecurity */].saveAuth(res.data);
        });
    };
    /**
     * Check if user is authenticated
     *
     * @returns {boolean}
     */
    AuthProvider.prototype.check = function () {
        return !!(__WEBPACK_IMPORTED_MODULE_1__lib_helper__["a" /* WBHelper */].getItem('user', false));
    };
    /**
     * UserProvider detains or information
     *
     * @returns {any}
     */
    AuthProvider.prototype.user = function () {
        return __WEBPACK_IMPORTED_MODULE_1__lib_helper__["a" /* WBHelper */].getItem('user', true);
    };
    /**
     * Logout
     */
    AuthProvider.prototype.logout = function () {
        // destroy the socket
        __WEBPACK_IMPORTED_MODULE_4__lib_socket__["a" /* WBSocket */].disconnect();
        // reset GPS
        __WEBPACK_IMPORTED_MODULE_3__lib_config__["a" /* WBConfig */].resetGPS();
        // clear all stored data
        __WEBPACK_IMPORTED_MODULE_1__lib_helper__["a" /* WBHelper */].clearItem();
        // facebook logout
        this.facebookLogout(function () {
        });
    };
    /**
     * Store FCM token
     *
     * @param id
     * @param token
     * @returns {any}
     */
    AuthProvider.prototype.fcm_token = function (id, token) {
        return this.appProvider.get('user/fcm-token/' + id + '/' + token, null, function (res) {
            __WEBPACK_IMPORTED_MODULE_1__lib_helper__["a" /* WBHelper */].log('AuthProvider-fcm_token: ' + res);
        });
    };
    return AuthProvider;
}());
AuthProvider = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__apd_provider__["a" /* APDProvider */]])
], AuthProvider);

//# sourceMappingURL=auth-provider.js.map

/***/ }),

/***/ 27:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WBView; });
/**
 * @author Archie, Disono (webmonsph@gmail.com)
 * @git https://github.com/disono/Ionic-Framework-Template
 * @copyright Webmons Development Studio. (webmons.com), 2016-2017
 * @license Apache, 2.0 https://github.com/disono/Ionic-Framework-Template/blob/master/LICENSE
 */
var _WBView = (function () {
    return {
        /**
         * alert
         *
         * @param alertCtrl
         * @param title
         * @param message
         */
        alert: function (alertCtrl, title, message) {
            var alert = alertCtrl.create({
                title: title,
                message: message,
                buttons: ['Ok']
            });
            alert.present();
        },
        /**
         * Toast
         *
         * @param toastCtrl
         * @param message
         */
        toast: function (toastCtrl, message) {
            var toast = toastCtrl.create({
                message: message,
                duration: 3000
            });
            toast.present();
        },
        /**
         * Loading
         *
         * @param loadingCtrl
         * @param message
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
var WBView = _WBView;
//# sourceMappingURL=views.js.map

/***/ }),

/***/ 271:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WBSecurity; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__helper__ = __webpack_require__(11);
/**
 * @author Archie, Disono (webmonsph@gmail.com)
 * @git https://github.com/disono/Ionic-Framework-Template
 * @copyright Webmons Development Studio. (webmons.com), 2016-2017
 * @license Apache, 2.0 https://github.com/disono/Ionic-Framework-Template/blob/master/LICENSE
 */

var _WBSecurity = (function () {
    return {
        jwt: function (secret, id, current_time) {
            var token = null;
            // minus 5 minutes
            var current = new Date(current_time.getTime() - 5 * 60000);
            if (!secret) {
                __WEBPACK_IMPORTED_MODULE_0__helper__["a" /* WBHelper */].error('JWT Token is null: ' + secret);
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
            __WEBPACK_IMPORTED_MODULE_0__helper__["a" /* WBHelper */].log(token);
            return token;
        },
        /**
         * JWT auth
         *
         * @returns {any}
         */
        jwtAuth: function () {
            var auth = __WEBPACK_IMPORTED_MODULE_0__helper__["a" /* WBHelper */].getItem('user', true);
            if (!auth) {
                __WEBPACK_IMPORTED_MODULE_0__helper__["a" /* WBHelper */].log('Not authenticated.');
                return null;
            }
            __WEBPACK_IMPORTED_MODULE_0__helper__["a" /* WBHelper */].log('Auth Timestamp: ' + auth.jwt_server_difference);
            return _WBSecurity.jwt(auth.secret_key, auth.id, _WBSecurity.getDateTimeDiff(auth.jwt_server_difference));
        },
        /**
         * Server time difference on seconds
         *
         * @param sqlServerTime
         * @returns {number}
         */
        getSecondsDiff: function (sqlServerTime) {
            return WBDateTimeDiff(sqlServerTime);
        },
        /**
         * Get the datetime difference
         *
         * @param seconds
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
         * @param user_data
         */
        saveAuth: function (user_data) {
            // let's check if old data is present
            // we must retain the tokens then save it
            var oldAuth = __WEBPACK_IMPORTED_MODULE_0__helper__["a" /* WBHelper */].getItem('user', true);
            if (oldAuth) {
                user_data.secret_key = oldAuth.secret_key;
                user_data.token_key = oldAuth.token_key;
                user_data.server_timestamp = oldAuth.server_timestamp;
                user_data.jwt_server_difference = oldAuth.jwt_server_difference;
            }
            else {
                // server time difference in seconds
                // refresh data if old auth is not available
                user_data.jwt_server_difference = _WBSecurity.getSecondsDiff(user_data.server_timestamp);
            }
            // save
            __WEBPACK_IMPORTED_MODULE_0__helper__["a" /* WBHelper */].setItem('user', user_data, true);
        }
    };
}());
var WBSecurity = _WBSecurity;
//# sourceMappingURL=security.js.map

/***/ }),

/***/ 272:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AboutPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/**
 * @author Archie, Disono (webmonsph@gmail.com)
 * @git https://github.com/disono/Ionic-Framework-Template
 * @copyright Webmons Development Studio. (webmons.com), 2016-2017
 * @license Apache, 2.0 https://github.com/disono/Ionic-Framework-Template/blob/master/LICENSE
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


var AboutPage = (function () {
    function AboutPage(nav) {
        this.nav = nav;
    }
    return AboutPage;
}());
AboutPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"E:\Projects\MobileCrossPlatform\Ionic-Framework-Template\src\pages\about\about.html"*/'<!--\n* @author Archie, Disono (webmonsph@gmail.com)\n* @git https://github.com/disono/Ionic-Framework-Template\n* @copyright Webmons Development Studio. (webmons.com), 2016-2017\n* @license Apache, 2.0 https://github.com/disono/Ionic-Framework-Template/blob/master/LICENSE\n-->\n\n<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n\n    <ion-title>\n      About\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <h1>About</h1>\n</ion-content>\n'/*ion-inline-end:"E:\Projects\MobileCrossPlatform\Ionic-Framework-Template\src\pages\about\about.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */]])
], AboutPage);

//# sourceMappingURL=about.js.map

/***/ }),

/***/ 273:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContactPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/**
 * @author Archie, Disono (webmonsph@gmail.com)
 * @git https://github.com/disono/Ionic-Framework-Template
 * @copyright Webmons Development Studio. (webmons.com), 2016-2017
 * @license Apache, 2.0 https://github.com/disono/Ionic-Framework-Template/blob/master/LICENSE
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


var ContactPage = (function () {
    function ContactPage(nav) {
        this.nav = nav;
    }
    return ContactPage;
}());
ContactPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"E:\Projects\MobileCrossPlatform\Ionic-Framework-Template\src\pages\contact\contact.html"*/'<!--\n* @author Archie, Disono (webmonsph@gmail.com)\n* @git https://github.com/disono/Ionic-Framework-Template\n* @copyright Webmons Development Studio. (webmons.com), 2016-2017\n* @license Apache, 2.0 https://github.com/disono/Ionic-Framework-Template/blob/master/LICENSE\n-->\n\n<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n\n    <ion-title>\n      Contact\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <ion-list>\n    <ion-list-header>Follow me on Twitter</ion-list-header>\n    <ion-item>\n      <ion-icon name="logo-twitter" item-left></ion-icon>\n      @master_archie\n    </ion-item>\n  </ion-list>\n</ion-content>\n'/*ion-inline-end:"E:\Projects\MobileCrossPlatform\Ionic-Framework-Template\src\pages\contact\contact.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */]])
], ContactPage);

//# sourceMappingURL=contact.js.map

/***/ }),

/***/ 274:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettingsTabPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__general__ = __webpack_require__(275);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__security__ = __webpack_require__(276);
/**
 * @author Archie, Disono (webmonsph@gmail.com)
 * @git https://github.com/disono/Ionic-Framework-Template
 * @copyright Webmons Development Studio. (webmons.com), 2016-2017
 * @license Apache, 2.0 https://github.com/disono/Ionic-Framework-Template/blob/master/LICENSE
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



var SettingsTabPage = (function () {
    function SettingsTabPage() {
        // this tells the tabs component which Pages
        // should be each tab's root Page
        this.generalRoot = __WEBPACK_IMPORTED_MODULE_1__general__["a" /* GeneralPage */];
        this.securityRoot = __WEBPACK_IMPORTED_MODULE_2__security__["a" /* SecurityPage */];
    }
    return SettingsTabPage;
}());
SettingsTabPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"E:\Projects\MobileCrossPlatform\Ionic-Framework-Template\src\pages\settings\settings-tab.html"*/'<!--\n* @author Archie, Disono (webmonsph@gmail.com)\n* @git https://github.com/disono/Ionic-Framework-Template\n* @copyright Webmons Development Studio. (webmons.com), 2016-2017\n* @license Apache, 2.0 https://github.com/disono/Ionic-Framework-Template/blob/master/LICENSE\n-->\n\n<ion-tabs>\n  <ion-tab [root]="generalRoot" tabTitle="General" tabIcon="md-settings"></ion-tab>\n  <ion-tab [root]="securityRoot" tabTitle="Security" tabIcon="md-unlock"></ion-tab>\n</ion-tabs>\n'/*ion-inline-end:"E:\Projects\MobileCrossPlatform\Ionic-Framework-Template\src\pages\settings\settings-tab.html"*/
    }),
    __metadata("design:paramtypes", [])
], SettingsTabPage);

//# sourceMappingURL=settings-tab.js.map

/***/ }),

/***/ 275:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GeneralPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lib_views__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_auth_provider__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__drawer_drawer__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ionic_image_loader__ = __webpack_require__(31);
/**
 * @author Archie, Disono (webmonsph@gmail.com)
 * @git https://github.com/disono/Ionic-Framework-Template
 * @copyright Webmons Development Studio. (webmons.com), 2016-2017
 * @license Apache, 2.0 https://github.com/disono/Ionic-Framework-Template/blob/master/LICENSE
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






var GeneralPage = (function () {
    function GeneralPage(nav, alertCtrl, loadingCtrl, auth, app) {
        this.nav = nav;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.auth = auth;
        this.app = app;
        this.init();
    }
    /**
     * Initialize
     */
    GeneralPage.prototype.init = function () {
        var thisApp = this;
        thisApp.authInputs();
        // save the new authenticated user (Sync data)
        var loading = __WEBPACK_IMPORTED_MODULE_2__lib_views__["a" /* WBView */].loading(thisApp.loadingCtrl, 'Syncing...');
        thisApp.auth.sync().subscribe(function (res) {
            loading.dismiss();
            // reinitialize inputs
            thisApp.authInputs();
            // file on change
            jQ(document).off().on('change', '#file', function () {
                thisApp.setFiles(this);
            });
        }, function (error) {
            loading.dismiss();
            __WEBPACK_IMPORTED_MODULE_2__lib_views__["a" /* WBView */].alert(thisApp.alertCtrl, 'Error Syncing', error);
        });
    };
    /**
     * Authenticated inputs
     */
    GeneralPage.prototype.authInputs = function () {
        var thisApp = this;
        // authenticated user
        var user = this.auth.user();
        // inputs
        thisApp.inputs = {
            first_name: user.first_name,
            last_name: user.last_name,
            phone: user.phone,
            address: user.address,
            email: user.email,
            birthday: new Date(user.birthday).toISOString(),
            gender: ((user.gender) ? user.gender : 'Male'),
            about: user.about,
            avatar: user.avatar
        };
        // files / avatar
        thisApp.files = null;
    };
    /**
     * Save the changes
     *
     * @param $event
     * @param inputs
     */
    GeneralPage.prototype.doSave = function ($event, inputs) {
        $event.preventDefault();
        var thisApp = this;
        // check for values
        if (!inputs.first_name || !inputs.last_name || !inputs.phone || !inputs.email || !inputs.gender) {
            __WEBPACK_IMPORTED_MODULE_2__lib_views__["a" /* WBView */].alert(thisApp.alertCtrl, 'Required Inputs', 'Please check all the required fields.');
            return;
        }
        // format birthday
        if (inputs.birthday) {
            inputs.birthday = moment(new Date(inputs.birthday)).format('MMMM DD YYYY');
        }
        // show loading
        var loading = __WEBPACK_IMPORTED_MODULE_2__lib_views__["a" /* WBView */].loading(thisApp.loadingCtrl, 'Updating profile...');
        // update the profile
        thisApp.auth.update({
            inputs: inputs,
            files: thisApp.files
        }, function (res) {
            setTimeout(function () {
                thisApp.authInputs();
            }, 100);
            loading.dismiss();
        }, function (errors) {
            // errors
            loading.dismiss();
        });
    };
    /**
     * Open the dialog for images
     */
    GeneralPage.prototype.openFileDialog = function () {
        jQ('#file').off().click();
    };
    /**
     * Set the image file on change
     *
     * @param input
     */
    GeneralPage.prototype.setFiles = function (input) {
        if (input.files && input.files[0]) {
            this.files = { image: input.files[0] };
        }
    };
    /**
     * Logout
     */
    GeneralPage.prototype.logout = function () {
        this.auth.logout();
        this.app.getRootNav().setRoot(__WEBPACK_IMPORTED_MODULE_4__drawer_drawer__["a" /* DrawerPage */]);
    };
    return GeneralPage;
}());
GeneralPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_5_ionic_image_loader__["a" /* IonicImageLoader */]
        ]
    }),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"E:\Projects\MobileCrossPlatform\Ionic-Framework-Template\src\pages\settings\general.html"*/'<!--\n* @author Archie, Disono (webmonsph@gmail.com)\n* @git https://github.com/disono/Ionic-Framework-Template\n* @copyright Webmons Development Studio. (webmons.com), 2016-2017\n* @license Apache, 2.0 https://github.com/disono/Ionic-Framework-Template/blob/master/LICENSE\n-->\n\n<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n\n    <ion-title>\n      General Settings\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <div style="text-align: center;">\n    <img-loader src="{{inputs.avatar}}" style="width: 164px;" useImg></img-loader>\n  </div>\n\n  <form (submit)="doSave($event, inputs)">\n    <input type="file" style="visibility: hidden;" id="file">\n\n    <ion-list>\n      <button ion-button block type="button" (click)="openFileDialog()">Select Image</button>\n\n      <ion-item>\n        <ion-label floating>First Name*</ion-label>\n        <ion-input type="text" [(ngModel)]="inputs.first_name" name="first_name"></ion-input>\n      </ion-item>\n\n      <ion-item>\n        <ion-label floating>Last Name*</ion-label>\n        <ion-input type="text" [(ngModel)]="inputs.last_name" name="last_name"></ion-input>\n      </ion-item>\n\n      <ion-item>\n        <ion-label floating>Phone*</ion-label>\n        <ion-input type="tel" [(ngModel)]="inputs.phone" name="phone"></ion-input>\n      </ion-item>\n\n      <ion-item>\n        <ion-label>Gender*</ion-label>\n        <ion-select [(ngModel)]="inputs.gender" name="gender">\n          <ion-option value="Male">Male</ion-option>\n          <ion-option value="Female">Female</ion-option>\n        </ion-select>\n      </ion-item>\n\n      <ion-item>\n        <ion-label>Birthday</ion-label>\n        <ion-datetime displayFormat="MMMM DD YYYY" [(ngModel)]="inputs.birthday" name="birthday"></ion-datetime>\n      </ion-item>\n\n      <ion-item>\n        <ion-label floating>Address</ion-label>\n        <ion-textarea rows="3" [(ngModel)]="inputs.address" name="address"></ion-textarea>\n      </ion-item>\n\n      <ion-item>\n        <ion-label floating>Email*</ion-label>\n        <ion-input type="email" [(ngModel)]="inputs.email" name="email"></ion-input>\n      </ion-item>\n\n      <ion-item>\n        <ion-label floating>About Me</ion-label>\n        <ion-textarea rows="3" [(ngModel)]="inputs.about" name="about"></ion-textarea>\n      </ion-item>\n    </ion-list>\n\n    <button ion-button block type="submit">Save Changes</button>\n  </form>\n</ion-content>\n'/*ion-inline-end:"E:\Projects\MobileCrossPlatform\Ionic-Framework-Template\src\pages\settings\general.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_3__providers_auth_provider__["a" /* AuthProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* App */]])
], GeneralPage);

//# sourceMappingURL=general.js.map

/***/ }),

/***/ 276:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SecurityPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lib_views__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_auth_provider__ = __webpack_require__(21);
/**
 * @author Archie, Disono (webmonsph@gmail.com)
 * @git https://github.com/disono/Ionic-Framework-Template
 * @copyright Webmons Development Studio. (webmons.com), 2016-2017
 * @license Apache, 2.0 https://github.com/disono/Ionic-Framework-Template/blob/master/LICENSE
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




var SecurityPage = (function () {
    function SecurityPage(nav, alertCtrl, loadingCtrl, auth, app) {
        this.nav = nav;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.auth = auth;
        this.app = app;
        this.init();
    }
    /**
     * Initialize
     */
    SecurityPage.prototype.init = function () {
        var user = this.auth.user();
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
    SecurityPage.prototype.doSave = function ($event, inputs) {
        $event.preventDefault();
        var thisApp = this;
        // check for values
        if (!inputs.current_password || !inputs.password || !inputs.email) {
            __WEBPACK_IMPORTED_MODULE_2__lib_views__["a" /* WBView */].alert(thisApp.alertCtrl, 'Required Inputs', 'Please check all the required fields.');
            return;
        }
        // show loading
        var loading = __WEBPACK_IMPORTED_MODULE_2__lib_views__["a" /* WBView */].loading(thisApp.loadingCtrl, 'Updating security...');
        // update security
        thisApp.auth.security(inputs).subscribe(function (res) {
            loading.dismiss();
        }, function (e) {
            loading.dismiss();
        });
    };
    return SecurityPage;
}());
SecurityPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"E:\Projects\MobileCrossPlatform\Ionic-Framework-Template\src\pages\settings\security.html"*/'<!--\n* @author Archie, Disono (webmonsph@gmail.com)\n* @git https://github.com/disono/Ionic-Framework-Template\n* @copyright Webmons Development Studio. (webmons.com), 2016-2017\n* @license Apache, 2.0 https://github.com/disono/Ionic-Framework-Template/blob/master/LICENSE\n-->\n\n<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n\n    <ion-title>\n      Security\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <form (submit)="doSave($event, inputs)">\n    <ion-item>\n      <ion-label floating>Email*</ion-label>\n      <ion-input type="email" [(ngModel)]="inputs.email" name="email"></ion-input>\n    </ion-item>\n\n    <ion-item>\n      <ion-label floating>Current Password*</ion-label>\n      <ion-input type="password" [(ngModel)]="inputs.current_password" name="current_password"></ion-input>\n    </ion-item>\n\n    <ion-item>\n      <ion-label floating>New Password*</ion-label>\n      <ion-input type="password" [(ngModel)]="inputs.password" name="password"></ion-input>\n    </ion-item>\n\n    <ion-item>\n      <ion-label floating>Confirm New Password*</ion-label>\n      <ion-input type="password" [(ngModel)]="inputs.password_confirmation" name="password_confirmation"></ion-input>\n    </ion-item>\n\n    <button ion-button block type="submit">Save Changes</button>\n  </form>\n</ion-content>\n'/*ion-inline-end:"E:\Projects\MobileCrossPlatform\Ionic-Framework-Template\src\pages\settings\security.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_3__providers_auth_provider__["a" /* AuthProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* App */]])
], SecurityPage);

//# sourceMappingURL=security.js.map

/***/ }),

/***/ 277:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ECommerceCartCheckoutPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_auth_provider__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_ecommerce_cart_cart__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_application_provider__ = __webpack_require__(278);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__success__ = __webpack_require__(279);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__lib_views__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__lib_config__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__lib_helper__ = __webpack_require__(11);
/**
 * @author Archie, Disono (webmonsph@gmail.com)
 * @git https://github.com/disono/Ionic-Framework-Template
 * @copyright Webmons Development Studio. (webmons.com), 2016-2017
 * @license Apache, 2.0 https://github.com/disono/Ionic-Framework-Template/blob/master/LICENSE
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









var ECommerceCartCheckoutPage = (function () {
    function ECommerceCartCheckoutPage(nav, auth, cart, applicationData, loadingCtrl, alertCtrl) {
        this.nav = nav;
        this.auth = auth;
        this.cart = cart;
        this.applicationData = applicationData;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.user = this.auth.user();
        this.inputs = {
            full_name: this.user.full_name,
            phone: this.user.phone,
            email: this.user.email,
            payment_type_id: '',
            billing_address: ((this.user.address && this.user.address != null) ? this.user.address : ''),
            shipping_address: ((this.user.address && this.user.address != null) ? this.user.address : ''),
            // card mode
            card_first_name: this.user.first_name,
            card_last_name: this.user.last_name,
            card_type: 'visa',
            card_number: '',
            card_exp_month: '',
            card_exp_yr: '',
            card_cvv: '',
        };
        this.cart_details = null;
        this.payment_types = [];
        this.voucher_code = null;
        this.payment_type_details = null;
        this.is_card_mode = false;
        this.fetchData();
    }
    /**
     * Load all data time at a time
     */
    ECommerceCartCheckoutPage.prototype.fetchData = function () {
        var thisApp = this;
        thisApp.cartDetails(function () {
            thisApp.paymentTypes(function () {
                // done loading
            });
        });
    };
    /**
     * Cart details
     */
    ECommerceCartCheckoutPage.prototype.cartDetails = function (callback) {
        var thisApp = this;
        thisApp.cart.content().subscribe(function (res) {
            thisApp.cart_details = res.data;
            callback();
        }, function (error) {
            thisApp.nav.pop();
        });
    };
    /**
     * Payment types
     */
    ECommerceCartCheckoutPage.prototype.paymentTypes = function (callback) {
        var thisApp = this;
        thisApp.applicationData.index().subscribe(function (response) {
            var data = response.data;
            thisApp.payment_types = data.payment_types;
            callback();
        }, function (error) {
            __WEBPACK_IMPORTED_MODULE_8__lib_helper__["a" /* WBHelper */].error('Subscribe Error: ' + error);
        });
    };
    /**
     * Payment type description
     *
     * @param $event
     * @param id
     */
    ECommerceCartCheckoutPage.prototype.paymentTypeSelected = function ($event, id) {
        for (var i = 0; i < this.payment_types.length; i++) {
            if (id == this.payment_types[i].id) {
                this.payment_type_details = this.payment_types[i].description;
                var name_1 = this.payment_types[i].name.toLowerCase();
                // is mode of payment using card
                if (name_1 == 'credit card' || name_1 == 'debit card' || name_1 == 'credit-card' || name_1 == 'debit-card') {
                    this.is_card_mode = true;
                }
                return;
            }
        }
        this.is_card_mode = false;
        this.payment_type_details = null;
    };
    /**
     * Apply voucher
     */
    ECommerceCartCheckoutPage.prototype.voucherApply = function () {
        var thisApp = this;
        if (thisApp.voucher_code) {
            __WEBPACK_IMPORTED_MODULE_8__lib_helper__["a" /* WBHelper */].log('Voucher Code: ' + thisApp.voucher_code);
            var loading_1 = __WEBPACK_IMPORTED_MODULE_6__lib_views__["a" /* WBView */].loading(thisApp.loadingCtrl, 'Applying Voucher...');
            thisApp.cart.voucher(thisApp.voucher_code).subscribe(function (response) {
                loading_1.dismiss();
                thisApp.fetchData();
            }, function (error) {
                loading_1.dismiss();
                __WEBPACK_IMPORTED_MODULE_8__lib_helper__["a" /* WBHelper */].error('Subscribe Error: ' + error);
            });
        }
    };
    /**
     * Remove the current voucher or discount
     */
    ECommerceCartCheckoutPage.prototype.removeVoucher = function () {
        var thisApp = this;
        if (thisApp.voucher_code) {
            __WEBPACK_IMPORTED_MODULE_8__lib_helper__["a" /* WBHelper */].log('Voucher Remove Code: ' + thisApp.voucher_code);
            var loading_2 = __WEBPACK_IMPORTED_MODULE_6__lib_views__["a" /* WBView */].loading(thisApp.loadingCtrl, 'Removing Voucher...');
            thisApp.cart.removeVoucher().subscribe(function (response) {
                loading_2.dismiss();
                thisApp.fetchData();
            }, function (error) {
                loading_2.dismiss();
                __WEBPACK_IMPORTED_MODULE_8__lib_helper__["a" /* WBHelper */].error('Subscribe Error: ' + error);
            });
        }
    };
    /**
     * Proceed to place your order
     */
    ECommerceCartCheckoutPage.prototype.placeOrder = function () {
        var thisApp = this;
        // check if on card mode
        // check if all details of card if applied
        // do not continue if the fields is not field-up
        if (thisApp.is_card_mode) {
            if (!thisApp.inputs.card_first_name || !thisApp.inputs.card_last_name || !thisApp.inputs.card_type || !thisApp.inputs.card_number || !thisApp.inputs.card_exp_month || !thisApp.inputs.card_exp_yr || !thisApp.inputs.card_cvv) {
                __WEBPACK_IMPORTED_MODULE_6__lib_views__["a" /* WBView */].alert(thisApp.alertCtrl, 'Required Fields', 'Please fill all the required fields for you card payment');
                return;
            }
        }
        var loading = __WEBPACK_IMPORTED_MODULE_6__lib_views__["a" /* WBView */].loading(thisApp.loadingCtrl, 'Placing your order...');
        thisApp.cart.place(thisApp.inputs).subscribe(function (response) {
            loading.dismiss();
            // process the response
            thisApp.processOrderResponse(thisApp, response);
        }, function (error) {
            loading.dismiss();
            __WEBPACK_IMPORTED_MODULE_8__lib_helper__["a" /* WBHelper */].error('Subscribe Error: ' + error);
        });
    };
    /**
     * Order response
     *
     * @param thisApp
     * @param response
     */
    ECommerceCartCheckoutPage.prototype.processOrderResponse = function (thisApp, response) {
        if (response.data.id) {
            thisApp.paymentProcessingDone();
        }
        else if (response.data.redirect) {
            // let's use browser (InAppBrowser) to process our payment's
            var inAppBrowserRef_1 = cordova.InAppBrowser.open(response.data.redirect, '_blank', 'location=no,zoom=no');
            // something is done loading (url)
            inAppBrowserRef_1.addEventListener('loadstop', function (event) {
                // the only default payment processor is IGS for now
                var card_processor = 'IGS';
                var target_url = __WEBPACK_IMPORTED_MODULE_7__lib_config__["a" /* WBConfig */].dev_domain + '/e-commerce/payment-processor/redirect/' + card_processor;
                var event_url = event.url.substring(0, event.url.indexOf('?'));
                if (event_url == target_url) {
                    setTimeout(function () {
                        inAppBrowserRef_1.close();
                        thisApp.paymentProcessingDone();
                    }, 5000);
                }
            });
            // the browser closed
            inAppBrowserRef_1.addEventListener('exit', function (event) {
                thisApp.paymentProcessingDone();
            });
        }
        else {
            // just process the success page
            thisApp.paymentProcessingDone();
        }
    };
    /**
     * Payment done
     */
    ECommerceCartCheckoutPage.prototype.paymentProcessingDone = function () {
        var thisApp = this;
        thisApp.fetchData();
        thisApp.nav.setRoot(__WEBPACK_IMPORTED_MODULE_5__success__["a" /* ECommerceCartSuccessPage */]);
    };
    return ECommerceCartCheckoutPage;
}());
ECommerceCartCheckoutPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"E:\Projects\MobileCrossPlatform\Ionic-Framework-Template\src\pages\ecommerce\cart\checkout.html"*/'<!--\n* @author Archie, Disono (webmonsph@gmail.com)\n* @git https://github.com/disono/Ionic-Framework-Template\n* @copyright Webmons Development Studio. (webmons.com), 2016-2017\n* @license Apache, 2.0 https://github.com/disono/Ionic-Framework-Template/blob/master/LICENSE\n-->\n\n<ion-header>\n  <ion-navbar>\n    <ion-title>\n      Secure Checkout\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <div *ngIf="cart_details">\n    <ion-grid>\n      <ion-row>\n        <ion-col width-50>Total</ion-col>\n        <ion-col width-50 [innerHTML]="cart_details.formatted_total"></ion-col>\n      </ion-row>\n\n      <ion-row>\n        <ion-col width-50>Tax</ion-col>\n        <ion-col width-50 [innerHTML]="cart_details.formatted_tax"></ion-col>\n      </ion-row>\n\n      <ion-row>\n        <ion-col width-50>Shipping Fee</ion-col>\n        <ion-col width-50 [innerHTML]="cart_details.formatted_delivery_cost"></ion-col>\n      </ion-row>\n\n      <ion-row>\n        <ion-col width-50>Discount</ion-col>\n        <ion-col width-50 [innerHTML]="cart_details.formatted_discount"></ion-col>\n      </ion-row>\n\n      <ion-row>\n        <ion-col width-50>Subtotal</ion-col>\n        <ion-col width-50 [innerHTML]="cart_details.formatted_subtotal"></ion-col>\n      </ion-row>\n    </ion-grid>\n\n    <ion-list>\n      <ion-item>\n        <ion-label floating>Full Name*</ion-label>\n        <ion-input type="text" [(ngModel)]="inputs.full_name" name="full_name"></ion-input>\n      </ion-item>\n\n      <ion-item>\n        <ion-label floating>Phone*</ion-label>\n        <ion-input type="tel" [(ngModel)]="inputs.phone" name="phone"></ion-input>\n      </ion-item>\n\n      <ion-item>\n        <ion-label floating>email*</ion-label>\n        <ion-input type="email" [(ngModel)]="inputs.email" name="email"></ion-input>\n      </ion-item>\n\n      <ion-item>\n        <ion-label>Payment Types*</ion-label>\n        <ion-select [(ngModel)]="inputs.payment_type_id"\n                    (ionChange)="paymentTypeSelected($event, inputs.payment_type_id)">\n          <ion-option value="">Select Payment Type</ion-option>\n          <ion-option *ngFor="let item of payment_types" value="{{item.id}}">{{item.name}}</ion-option>\n        </ion-select>\n      </ion-item>\n\n      <!-- card details -->\n      <div *ngIf="is_card_mode">\n        <ion-item><h4>Your Card Details</h4></ion-item>\n\n        <ion-item>\n          <ion-label floating>First Name*</ion-label>\n          <ion-input type="text" [(ngModel)]="inputs.card_first_name" name="card_first_name"></ion-input>\n        </ion-item>\n\n        <ion-item>\n          <ion-label floating>Last Name*</ion-label>\n          <ion-input type="text" [(ngModel)]="inputs.card_last_name" name="card_last_name"></ion-input>\n        </ion-item>\n\n        <ion-item>\n          <ion-label>Card Types*</ion-label>\n          <ion-select [(ngModel)]="inputs.card_type">\n            <ion-option value="visa">Visa</ion-option>\n            <ion-option value="mastercard">Mastercard</ion-option>\n          </ion-select>\n        </ion-item>\n\n        <ion-item>\n          <ion-label floating>Card #*</ion-label>\n          <ion-input type="tel" [(ngModel)]="inputs.card_number" name="card_number"></ion-input>\n        </ion-item>\n\n        <ion-item>\n          <ion-label floating>Exp Month*</ion-label>\n          <ion-input type="tel" [(ngModel)]="inputs.card_exp_month" name="card_exp_month"></ion-input>\n        </ion-item>\n\n        <ion-item>\n          <ion-label floating>Exp Year*</ion-label>\n          <ion-input type="tel" [(ngModel)]="inputs.card_exp_yr" name="card_exp_yr"></ion-input>\n        </ion-item>\n\n        <ion-item>\n          <ion-label floating>CVV2*</ion-label>\n          <ion-input type="tel" [(ngModel)]="inputs.card_cvv" name="card_cvv"></ion-input>\n        </ion-item>\n      </div>\n\n      <ion-item *ngIf="payment_type_details">\n        <p color="secondary">{{payment_type_details}}</p>\n      </ion-item>\n\n      <ion-item>\n        <ion-label floating>Billing Address*</ion-label>\n        <ion-textarea rows="3" [(ngModel)]="inputs.billing_address" name="billing_address"></ion-textarea>\n      </ion-item>\n\n      <ion-item>\n        <ion-label floating>Shipping Address*</ion-label>\n        <ion-textarea rows="3" [(ngModel)]="inputs.shipping_address" name="shipping_address"></ion-textarea>\n      </ion-item>\n\n      <!-- applied voucher -->\n      <ion-item *ngIf="!cart_details.options.voucher_code">\n        <ion-label floating>Apply Voucher</ion-label>\n        <ion-input type="text" [(ngModel)]="voucher_code" name="voucher_code"></ion-input>\n      </ion-item>\n      <ion-item *ngIf="!cart_details.options.voucher_code">\n        <button ion-button clear block color="danger" (click)="voucherApply()">Apply Voucher</button>\n      </ion-item>\n\n      <!-- remove voucher -->\n      <ion-item *ngIf="cart_details.options.voucher_code">\n        <p>{{cart_details.options.voucher_code}}</p>\n      </ion-item>\n      <ion-item *ngIf="cart_details.options.voucher_code">\n        <button ion-button clear block color="danger" (click)="removeVoucher()">Remove Voucher</button>\n      </ion-item>\n    </ion-list>\n\n    <div padding>\n      <button ion-button block color="danger" (click)="placeOrder()">Place Order</button>\n    </div>\n  </div>\n</ion-content>\n'/*ion-inline-end:"E:\Projects\MobileCrossPlatform\Ionic-Framework-Template\src\pages\ecommerce\cart\checkout.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__providers_auth_provider__["a" /* AuthProvider */], __WEBPACK_IMPORTED_MODULE_3__providers_ecommerce_cart_cart__["a" /* ECommerceCart */], __WEBPACK_IMPORTED_MODULE_4__providers_application_provider__["a" /* ApplicationProvider */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */]])
], ECommerceCartCheckoutPage);

//# sourceMappingURL=checkout.js.map

/***/ }),

/***/ 278:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ApplicationProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__apd_provider__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lib_helper__ = __webpack_require__(11);
/**
 * @author Archie, Disono (webmonsph@gmail.com)
 * @git https://github.com/disono/Ionic-Framework-Template
 * @copyright Webmons Development Studio. (webmons.com), 2016-2017
 * @license Apache, 2.0 https://github.com/disono/Ionic-Framework-Template/blob/master/LICENSE
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



var ApplicationProvider = (function () {
    function ApplicationProvider(appProvider) {
        this.appProvider = appProvider;
        __WEBPACK_IMPORTED_MODULE_2__lib_helper__["a" /* WBHelper */].log('Application Settings Provider Provider Called.');
    }
    /**
     * UserProvider
     * Save the data to authenticated user
     *
     * @param id
     * @returns {any}
     */
    ApplicationProvider.prototype.index = function () {
        return this.appProvider.get('application', null, function (res) {
            __WEBPACK_IMPORTED_MODULE_2__lib_helper__["a" /* WBHelper */].log('ApplicationProvider-index: ' + res);
        });
    };
    return ApplicationProvider;
}());
ApplicationProvider = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__apd_provider__["a" /* APDProvider */]])
], ApplicationProvider);

//# sourceMappingURL=application-provider.js.map

/***/ }),

/***/ 279:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ECommerceCartSuccessPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__product_product_list__ = __webpack_require__(142);
/**
 * @author Archie, Disono (webmonsph@gmail.com)
 * @git https://github.com/disono/Ionic-Framework-Template
 * @copyright Webmons Development Studio. (webmons.com), 2016-2017
 * @license Apache, 2.0 https://github.com/disono/Ionic-Framework-Template/blob/master/LICENSE
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



var ECommerceCartSuccessPage = (function () {
    function ECommerceCartSuccessPage(nav) {
        this.nav = nav;
    }
    ECommerceCartSuccessPage.prototype.productList = function () {
        this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_2__product_product_list__["a" /* ECommerceProductListPage */]);
    };
    return ECommerceCartSuccessPage;
}());
ECommerceCartSuccessPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"E:\Projects\MobileCrossPlatform\Ionic-Framework-Template\src\pages\ecommerce\cart\success.html"*/'<!--\n* @author Archie, Disono (webmonsph@gmail.com)\n* @git https://github.com/disono/Ionic-Framework-Template\n* @copyright Webmons Development Studio. (webmons.com), 2016-2017\n* @license Apache, 2.0 https://github.com/disono/Ionic-Framework-Template/blob/master/LICENSE\n-->\n\n<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n\n    <ion-title>\n      Your order is place\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <h1 class="text-center">Thank you for buying.</h1>\n  <button ion-button block clear (click)="productList()">Back to items and products</button>\n</ion-content>\n'/*ion-inline-end:"E:\Projects\MobileCrossPlatform\Ionic-Framework-Template\src\pages\ecommerce\cart\success.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */]])
], ECommerceCartSuccessPage);

//# sourceMappingURL=success.js.map

/***/ }),

/***/ 280:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ECommerceCartItemQuantityModal; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_ecommerce_product_product__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_auth_provider__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_ecommerce_cart_cart__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__lib_views__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__lib_helper__ = __webpack_require__(11);
/**
 * @author Archie, Disono (webmonsph@gmail.com)
 * @git https://github.com/disono/Ionic-Framework-Template
 * @copyright Webmons Development Studio. (webmons.com), 2016-2017
 * @license Apache, 2.0 https://github.com/disono/Ionic-Framework-Template/blob/master/LICENSE
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







var ECommerceCartItemQuantityModal = (function () {
    function ECommerceCartItemQuantityModal(nav, product, auth, cart, params, viewCtrl, loadingCtrl) {
        this.nav = nav;
        this.product = product;
        this.auth = auth;
        this.cart = cart;
        this.params = params;
        this.viewCtrl = viewCtrl;
        this.loadingCtrl = loadingCtrl;
    }
    /**
     * Update the quantity
     */
    ECommerceCartItemQuantityModal.prototype.update = function () {
        var thisApp = this;
        if (thisApp.quantity) {
            var loading_1 = __WEBPACK_IMPORTED_MODULE_5__lib_views__["a" /* WBView */].loading(thisApp.loadingCtrl, 'Updating Item Quantity...');
            thisApp.cart.update(thisApp.params.get('id'), thisApp.quantity).subscribe(function (response) {
                loading_1.dismiss();
                thisApp.viewCtrl.dismiss(true);
            }, function (error) {
                loading_1.dismiss();
                thisApp.dismiss();
            });
        }
    };
    /**
     * Close the modal
     */
    ECommerceCartItemQuantityModal.prototype.dismiss = function () {
        __WEBPACK_IMPORTED_MODULE_6__lib_helper__["a" /* WBHelper */].log('Modal filter cancelled...');
        this.viewCtrl.dismiss();
    };
    return ECommerceCartItemQuantityModal;
}());
ECommerceCartItemQuantityModal = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"E:\Projects\MobileCrossPlatform\Ionic-Framework-Template\src\pages\ecommerce\cart\update.quantity.modal.html"*/'<!--\n* @author Archie, Disono (webmonsph@gmail.com)\n* @git https://github.com/disono/Ionic-Framework-Template\n* @copyright Webmons Development Studio. (webmons.com), 2016-2017\n* @license Apache, 2.0 https://github.com/disono/Ionic-Framework-Template/blob/master/LICENSE\n-->\n\n<ion-header>\n  <ion-navbar>\n    <ion-title>\n      Update Quantity\n    </ion-title>\n\n    <ion-buttons start>\n      <button ion-button clear (click)="dismiss()">\n        Cancel\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <ion-list>\n    <ion-item>\n      <ion-label floating>Quantity*</ion-label>\n      <ion-input type="tel" [(ngModel)]="quantity" name="quantity"></ion-input>\n    </ion-item>\n  </ion-list>\n\n  <button ion-button clear block color="danger" (click)="update()">Update Quantity</button>\n</ion-content>\n'/*ion-inline-end:"E:\Projects\MobileCrossPlatform\Ionic-Framework-Template\src\pages\ecommerce\cart\update.quantity.modal.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__providers_ecommerce_product_product__["a" /* ECommerceProduct */], __WEBPACK_IMPORTED_MODULE_3__providers_auth_provider__["a" /* AuthProvider */], __WEBPACK_IMPORTED_MODULE_4__providers_ecommerce_cart_cart__["a" /* ECommerceCart */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ViewController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */]])
], ECommerceCartItemQuantityModal);

//# sourceMappingURL=update.quantity.modal.js.map

/***/ }),

/***/ 281:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegisterPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_auth_provider__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__lib_views__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__drawer_drawer__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__lib_socket__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__lib_config__ = __webpack_require__(37);
/**
 * @author Archie, Disono (webmonsph@gmail.com)
 * @git https://github.com/disono/Ionic-Framework-Template
 * @copyright Webmons Development Studio. (webmons.com), 2016-2017
 * @license Apache, 2.0 https://github.com/disono/Ionic-Framework-Template/blob/master/LICENSE
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







var RegisterPage = (function () {
    function RegisterPage(nav, alertCtrl, loadingCtrl, auth, params) {
        this.nav = nav;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.auth = auth;
        this.params = params;
        this.wb_config = __WEBPACK_IMPORTED_MODULE_6__lib_config__["a" /* WBConfig */];
        __WEBPACK_IMPORTED_MODULE_6__lib_config__["a" /* WBConfig */].thisApp = this;
        this.init();
    }
    /**
     * Initialize
     */
    RegisterPage.prototype.init = function () {
        this.inputs = {
            first_name: '',
            last_name: '',
            phone: '',
            email: '',
            username: '',
            password: ''
        };
    };
    /**
     * Do register
     *
     * @param $event
     * @param inputs
     */
    RegisterPage.prototype.doRegister = function ($event, inputs) {
        $event.preventDefault();
        var thisApp = this;
        // check for values
        if (!inputs.email || !inputs.password) {
            __WEBPACK_IMPORTED_MODULE_3__lib_views__["a" /* WBView */].alert(thisApp.alertCtrl, 'Required Inputs', 'Email is required.');
            return;
        }
        // show loading
        var loading = __WEBPACK_IMPORTED_MODULE_3__lib_views__["a" /* WBView */].loading(thisApp.loadingCtrl, 'Creating profile...');
        // register
        thisApp.auth.register(inputs).subscribe(function (res) {
            loading.dismiss();
            __WEBPACK_IMPORTED_MODULE_3__lib_views__["a" /* WBView */].alert(thisApp.alertCtrl, 'Registration successful', 'Please check your email to verify your registration.');
            thisApp.nav.setRoot(__WEBPACK_IMPORTED_MODULE_4__drawer_drawer__["a" /* DrawerPage */]);
        }, function (e) {
            loading.dismiss();
        });
    };
    /**
     * Facebook authentication
     */
    RegisterPage.prototype.doFacebook = function () {
        var thisApp = this;
        // show loading
        var loading = __WEBPACK_IMPORTED_MODULE_3__lib_views__["a" /* WBView */].loading(thisApp.loadingCtrl, 'Creating profile...');
        thisApp.auth.facebook(function (response) {
            loading.dismiss();
            // check the users role
            __WEBPACK_IMPORTED_MODULE_6__lib_config__["a" /* WBConfig */].thisApp._checkRole(response, __WEBPACK_IMPORTED_MODULE_6__lib_config__["a" /* WBConfig */].thisApp);
        }, function (error) {
            loading.dismiss();
            __WEBPACK_IMPORTED_MODULE_3__lib_views__["a" /* WBView */].alert(thisApp.alertCtrl, 'Registration unsuccessful', error);
        }, function () {
            loading.dismiss();
        });
    };
    /**
     * Check role
     *
     * @param response
     * @param thisApp
     * @private
     */
    RegisterPage.prototype._checkRole = function (response, thisApp) {
        // data
        var data = response.data;
        // show the main menu
        if (data.role == 'client') {
            thisApp.init();
            // emit to sync data
            __WEBPACK_IMPORTED_MODULE_5__lib_socket__["a" /* WBSocket */].emitter.emitEvent('sync_application');
            // set the main page
            if (thisApp.params.get('return_page')) {
                thisApp.nav.pop();
            }
            else {
                thisApp.nav.setRoot(__WEBPACK_IMPORTED_MODULE_4__drawer_drawer__["a" /* DrawerPage */]);
            }
        }
        else {
            __WEBPACK_IMPORTED_MODULE_3__lib_views__["a" /* WBView */].alert(thisApp.alertCtrl, 'Not Allowed', 'This Email/Username and password is not allowed to login.');
            thisApp.auth.logout();
        }
    };
    /**
     * Cancel registration drawer page
     */
    RegisterPage.prototype.cancel = function () {
        this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_4__drawer_drawer__["a" /* DrawerPage */]);
    };
    return RegisterPage;
}());
RegisterPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"E:\Projects\MobileCrossPlatform\Ionic-Framework-Template\src\pages\authentication\register.html"*/'<!--\n* @author Archie, Disono (webmonsph@gmail.com)\n* @git https://github.com/disono/Ionic-Framework-Template\n* @copyright Webmons Development Studio. (webmons.com), 2016-2017\n* @license Apache, 2.0 https://github.com/disono/Ionic-Framework-Template/blob/master/LICENSE\n-->\n\n<ion-header>\n  <ion-navbar>\n    <ion-title>Register</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <!-- facebook login button -->\n  <button type="button" *ngIf="wb_config.facebook_auth" color="facebook-color" ion-button block (click)="doFacebook()">\n    <ion-icon ios="logo-facebook" md="logo-facebook"></ion-icon>\n    Continue with Facebook\n  </button>\n\n  <form (submit)="doRegister($event, inputs)">\n    <ion-list no-lines>\n      <ion-item>\n        <ion-label floating>First Name</ion-label>\n        <ion-input type="text" [(ngModel)]="inputs.first_name" name="first_name"></ion-input>\n      </ion-item>\n\n      <ion-item>\n        <ion-label floating>Last Name</ion-label>\n        <ion-input type="text" [(ngModel)]="inputs.last_name" name="last_name"></ion-input>\n      </ion-item>\n\n      <ion-item>\n        <ion-label floating>Phone</ion-label>\n        <ion-input type="tel" [(ngModel)]="inputs.phone" name="phone"></ion-input>\n      </ion-item>\n\n      <ion-item>\n        <ion-label floating>Email</ion-label>\n        <ion-input type="email" [(ngModel)]="inputs.email" name="email"></ion-input>\n      </ion-item>\n\n      <ion-item>\n        <ion-label floating>Username</ion-label>\n        <ion-input type="text" [(ngModel)]="inputs.username" name="username"></ion-input>\n      </ion-item>\n\n      <ion-item>\n        <ion-label floating>Password</ion-label>\n        <ion-input type="password" [(ngModel)]="inputs.password" name="password"></ion-input>\n      </ion-item>\n\n      <ion-item>\n        <button ion-button block outline type="submit">Register</button>\n      </ion-item>\n    </ion-list>\n\n    <button ion-button block clear type="button" (click)="cancel()">Cancel</button>\n  </form>\n</ion-content>\n'/*ion-inline-end:"E:\Projects\MobileCrossPlatform\Ionic-Framework-Template\src\pages\authentication\register.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_2__providers_auth_provider__["a" /* AuthProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */]])
], RegisterPage);

//# sourceMappingURL=register.js.map

/***/ }),

/***/ 282:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ForgotPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__login__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__lib_views__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_auth_provider__ = __webpack_require__(21);
/**
 * @author Archie, Disono (webmonsph@gmail.com)
 * @git https://github.com/disono/Ionic-Framework-Template
 * @copyright Webmons Development Studio. (webmons.com), 2016-2017
 * @license Apache, 2.0 https://github.com/disono/Ionic-Framework-Template/blob/master/LICENSE
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





var ForgotPage = (function () {
    function ForgotPage(nav, alertCtrl, loadingCtrl, auth) {
        this.nav = nav;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.auth = auth;
        this.init();
    }
    /**
     * Initialize
     */
    ForgotPage.prototype.init = function () {
        this.inputs = {
            email: ''
        };
    };
    /**
     * Do reset
     *
     * @param $event
     * @param inputs
     */
    ForgotPage.prototype.doReset = function ($event, inputs) {
        $event.preventDefault();
        var thisApp = this;
        // check for values
        if (!inputs.email) {
            __WEBPACK_IMPORTED_MODULE_3__lib_views__["a" /* WBView */].alert(thisApp.alertCtrl, 'Required Inputs', 'Email is required.');
            return;
        }
        // show loading
        var loading = __WEBPACK_IMPORTED_MODULE_3__lib_views__["a" /* WBView */].loading(thisApp.loadingCtrl, 'Send request...');
        // send to server
        thisApp.auth.forgot(inputs).subscribe(function (res) {
            loading.dismiss();
            thisApp.nav.setRoot(__WEBPACK_IMPORTED_MODULE_2__login__["a" /* LoginPage */]);
        }, function (e) {
            loading.dismiss();
        });
    };
    return ForgotPage;
}());
ForgotPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"E:\Projects\MobileCrossPlatform\Ionic-Framework-Template\src\pages\authentication\forgot.html"*/'<!--\n* @author Archie, Disono (webmonsph@gmail.com)\n* @git https://github.com/disono/Ionic-Framework-Template\n* @copyright Webmons Development Studio. (webmons.com), 2016-2017\n* @license Apache, 2.0 https://github.com/disono/Ionic-Framework-Template/blob/master/LICENSE\n-->\n\n<ion-header>\n  <ion-navbar>\n    <ion-title>Forgot</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <form (submit)="doReset($event, inputs)">\n    <ion-list no-lines>\n      <ion-item>\n        <ion-label floating>Email</ion-label>\n        <ion-input type="email" [(ngModel)]="inputs.email" name="email"></ion-input>\n      </ion-item>\n\n      <ion-item>\n        <button ion-button block outline type="submit">Reset</button>\n      </ion-item>\n    </ion-list>\n  </form>\n</ion-content>\n'/*ion-inline-end:"E:\Projects\MobileCrossPlatform\Ionic-Framework-Template\src\pages\authentication\forgot.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_4__providers_auth_provider__["a" /* AuthProvider */]])
], ForgotPage);

//# sourceMappingURL=forgot.js.map

/***/ }),

/***/ 283:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ECommerceProductFilterModal; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_ecommerce_product_category__ = __webpack_require__(284);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__lib_helper__ = __webpack_require__(11);
/**
 * @author Archie, Disono (webmonsph@gmail.com)
 * @git https://github.com/disono/Ionic-Framework-Template
 * @copyright Webmons Development Studio. (webmons.com), 2016-2017
 * @license Apache, 2.0 https://github.com/disono/Ionic-Framework-Template/blob/master/LICENSE
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




var ECommerceProductFilterModal = (function () {
    function ECommerceProductFilterModal(nav, viewCtrl, params, category) {
        this.nav = nav;
        this.viewCtrl = viewCtrl;
        this.params = params;
        this.category = category;
        this.filter = this.params.get('filter');
        this.categories = [];
        __WEBPACK_IMPORTED_MODULE_3__lib_helper__["a" /* WBHelper */].log('Filter Data: ' + params.get('filter'));
        if (!this.filter.product_category_id) {
            this.filter.product_category_id = '';
        }
        this.fetchCategories();
    }
    /**
     * Product categories
     */
    ECommerceProductFilterModal.prototype.fetchCategories = function () {
        var thisApp = this;
        this.category.index().subscribe(function (response) {
            thisApp.categories = response.data;
        }, function (error) {
            __WEBPACK_IMPORTED_MODULE_3__lib_helper__["a" /* WBHelper */].error('Subscribe Error: ' + error);
        });
    };
    /**
     * Apply the filter and search
     */
    ECommerceProductFilterModal.prototype.search = function () {
        __WEBPACK_IMPORTED_MODULE_3__lib_helper__["a" /* WBHelper */].log('Searching...');
        this.viewCtrl.dismiss(this.filter);
    };
    /**
     * On toggle change
     *
     * @param type
     * @param value
     */
    ECommerceProductFilterModal.prototype.onChangeToggle = function (type, value) {
        if (type == 'sale') {
            if (value) {
                this.filter.is_sale = 1;
            }
            else {
                this.filter.is_sale = 0;
            }
        }
        if (type == 'latest') {
            if (value) {
                this.filter.is_latest = 1;
            }
            else {
                this.filter.is_latest = 0;
            }
        }
    };
    /**
     * Close the modal
     */
    ECommerceProductFilterModal.prototype.dismiss = function () {
        __WEBPACK_IMPORTED_MODULE_3__lib_helper__["a" /* WBHelper */].log('Modal filter cancelled...');
        this.viewCtrl.dismiss();
    };
    return ECommerceProductFilterModal;
}());
ECommerceProductFilterModal = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"E:\Projects\MobileCrossPlatform\Ionic-Framework-Template\src\pages\ecommerce\product\filter.modal.html"*/'<!--\n* @author Archie, Disono (webmonsph@gmail.com)\n* @git https://github.com/disono/Ionic-Framework-Template\n* @copyright Webmons Development Studio. (webmons.com), 2016-2017\n* @license Apache, 2.0 https://github.com/disono/Ionic-Framework-Template/blob/master/LICENSE\n-->\n\n<ion-header>\n  <ion-navbar>\n    <ion-title>\n      Filter\n    </ion-title>\n\n    <ion-buttons start>\n      <button ion-button clear (click)="dismiss()">\n        Cancel\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <div padding>\n    <!-- search input -->\n    <ion-searchbar [(ngModel)]="filter.search" placeholder="Search product by name..."></ion-searchbar>\n\n    <ion-list>\n      <ion-item>\n        <ion-label floating>Min Price</ion-label>\n        <ion-input type="tel" [(ngModel)]="filter.min_srp" name="min_srp"></ion-input>\n      </ion-item>\n\n      <ion-item>\n        <ion-label floating>Max Price</ion-label>\n        <ion-input type="tel" [(ngModel)]="filter.max_srp" name="max_srp"></ion-input>\n      </ion-item>\n\n      <!-- category -->\n      <ion-item>\n        <ion-label>Category</ion-label>\n        <ion-select [(ngModel)]="filter.product_category_id" name="product_category_id">\n          <ion-option value="">All</ion-option>\n          <ion-option *ngFor="let item of categories" value="{{item.id}}">{{item.name}}</ion-option>\n        </ion-select>\n      </ion-item>\n\n      <ion-item>\n        <ion-label>On Sale</ion-label>\n        <ion-toggle [(ngModel)]="filter.is_sale" (ionChange)="onChangeToggle(\'sale\', filter.is_sale)"></ion-toggle>\n      </ion-item>\n\n      <ion-item no-lines>\n        <ion-label>Latest / New Arrival</ion-label>\n        <ion-toggle [(ngModel)]="filter.is_latest"\n                    (ionChange)="onChangeToggle(\'latest\', filter.is_latest)"></ion-toggle>\n      </ion-item>\n    </ion-list>\n\n    <button ion-button block clear (click)="search()">Apply Filters</button>\n  </div>\n</ion-content>\n'/*ion-inline-end:"E:\Projects\MobileCrossPlatform\Ionic-Framework-Template\src\pages\ecommerce\product\filter.modal.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ViewController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_ecommerce_product_category__["a" /* ECommerceProductCategories */]])
], ECommerceProductFilterModal);

//# sourceMappingURL=filter.modal.js.map

/***/ }),

/***/ 284:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ECommerceProductCategories; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__apd_provider__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lib_helper__ = __webpack_require__(11);
/**
 * @author Archie, Disono (webmonsph@gmail.com)
 * @git https://github.com/disono/Ionic-Framework-Template
 * @copyright Webmons Development Studio. (webmons.com), 2016-2017
 * @license Apache, 2.0 https://github.com/disono/Ionic-Framework-Template/blob/master/LICENSE
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



var ECommerceProductCategories = (function () {
    function ECommerceProductCategories(appProvider) {
        this.appProvider = appProvider;
        __WEBPACK_IMPORTED_MODULE_2__lib_helper__["a" /* WBHelper */].log('ECommerce Product Category Called.');
    }
    /**
     * Product categories
     *
     * @returns {any}
     */
    ECommerceProductCategories.prototype.index = function () {
        return this.appProvider.get('e-commerce/product/category', null, function (res) {
            __WEBPACK_IMPORTED_MODULE_2__lib_helper__["a" /* WBHelper */].log('Product-categories: ' + res);
        });
    };
    return ECommerceProductCategories;
}());
ECommerceProductCategories = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__apd_provider__["a" /* APDProvider */]])
], ECommerceProductCategories);

//# sourceMappingURL=category.js.map

/***/ }),

/***/ 285:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ECommerceOrderListPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_ecommerce_order_order__ = __webpack_require__(144);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__order_details__ = __webpack_require__(286);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__lib_helper__ = __webpack_require__(11);
/**
 * @author Archie, Disono (webmonsph@gmail.com)
 * @git https://github.com/disono/Ionic-Framework-Template
 * @copyright Webmons Development Studio. (webmons.com), 2016-2017
 * @license Apache, 2.0 https://github.com/disono/Ionic-Framework-Template/blob/master/LICENSE
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





var ECommerceOrderListPage = (function () {
    function ECommerceOrderListPage(nav, order) {
        this.nav = nav;
        this.order = order;
        this.init();
        this.fetchData();
        this.is_refreshing = true;
    }
    ECommerceOrderListPage.prototype.init = function () {
        this.init_loading = true;
        this.refresher = null;
        this.is_fetching = false;
        this.infiniteScroll = null;
        this.data_list = [];
        this.page = 1;
    };
    /**
     * Pull refresh
     *
     * @param refresher
     */
    ECommerceOrderListPage.prototype.doRefresh = function (refresher) {
        this.refresher = refresher;
        this.page = 1;
        this.fetchData();
        this.is_refreshing = true;
    };
    /**
     * Infinite scroll
     *
     * @param infiniteScroll
     */
    ECommerceOrderListPage.prototype.doInfinite = function (infiniteScroll) {
        this.infiniteScroll = infiniteScroll;
        this.fetchData();
    };
    /**
     * Fetch the data to server
     */
    ECommerceOrderListPage.prototype.fetchData = function () {
        var thisApp = this;
        // the application is still fetch data to server
        if (thisApp.is_refreshing || thisApp.is_fetching) {
            return;
        }
        // fetch data to server
        thisApp.is_fetching = true;
        thisApp.order.index(thisApp.page).subscribe(function (res) {
            // reset data if refreshing
            if (thisApp.is_refreshing) {
                thisApp.data_list = [];
            }
            // format data
            for (var i = 0; i < res.data.length; i++) {
                thisApp.data_list.push(res.data[i]);
            }
            // development
            __WEBPACK_IMPORTED_MODULE_4__lib_helper__["a" /* WBHelper */].log('Page: ' + thisApp.page + ' Data: ' + JSON.stringify(res.data));
            // update the page
            if (res.data.length) {
                thisApp.page++;
            }
            thisApp.completeFetch();
        }, function (error) {
            thisApp.completeFetch();
        });
    };
    /**
     * Fetch completed
     */
    ECommerceOrderListPage.prototype.completeFetch = function () {
        this.init_loading = false;
        this.is_fetching = false;
        this.is_refreshing = false;
        if (this.refresher) {
            this.refresher.complete();
        }
        if (this.infiniteScroll) {
            this.infiniteScroll.complete();
        }
    };
    /**
     * Show ordered items
     *
     * @param id
     */
    ECommerceOrderListPage.prototype.itemSelected = function (id) {
        this.nav.push(__WEBPACK_IMPORTED_MODULE_3__order_details__["a" /* ECommerceOrderDetailsPage */], {
            id: id
        });
    };
    return ECommerceOrderListPage;
}());
ECommerceOrderListPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"E:\Projects\MobileCrossPlatform\Ionic-Framework-Template\src\pages\ecommerce\order\order.list.html"*/'<!--\n* @author Archie, Disono (webmonsph@gmail.com)\n* @git https://github.com/disono/Ionic-Framework-Template\n* @copyright Webmons Development Studio. (webmons.com), 2016-2017\n* @license Apache, 2.0 https://github.com/disono/Ionic-Framework-Template/blob/master/LICENSE\n-->\n\n<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n\n    <ion-title>\n      My Orders\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <ion-refresher *ngIf="!init_loading" (ionRefresh)="doRefresh($event)">\n    <ion-refresher-content></ion-refresher-content>\n  </ion-refresher>\n\n  <div *ngIf="!init_loading">\n    <ion-list>\n      <ion-item *ngFor="let data_fetch of data_list" (click)="itemSelected(data_fetch.id)">\n        <h2 [innerHTML]="data_fetch.formatted_total"></h2>\n        <p>{{data_fetch.count_items}} items</p>\n        <p>{{data_fetch.created_at}}</p>\n      </ion-item>\n    </ion-list>\n  </div>\n\n  <!-- no orders -->\n  <h1 class="text-center" *ngIf="!data_list.length && !init_loading">\n    No Orders!\n  </h1>\n\n  <ion-infinite-scroll *ngIf="!init_loading" (ionInfinite)="doInfinite($event)">\n    <ion-infinite-scroll-content></ion-infinite-scroll-content>\n  </ion-infinite-scroll>\n\n  <h1 class="text-center" *ngIf="init_loading">\n    <ion-spinner icon="spiral"></ion-spinner>\n    Loading...\n  </h1>\n</ion-content>\n'/*ion-inline-end:"E:\Projects\MobileCrossPlatform\Ionic-Framework-Template\src\pages\ecommerce\order\order.list.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__providers_ecommerce_order_order__["a" /* ECommerceOrder */]])
], ECommerceOrderListPage);

//# sourceMappingURL=order.list.js.map

/***/ }),

/***/ 286:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ECommerceOrderDetailsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_ecommerce_order_order__ = __webpack_require__(144);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__lib_helper__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_image_loader__ = __webpack_require__(31);
/**
 * @author Archie, Disono (webmonsph@gmail.com)
 * @git https://github.com/disono/Ionic-Framework-Template
 * @copyright Webmons Development Studio. (webmons.com), 2016-2017
 * @license Apache, 2.0 https://github.com/disono/Ionic-Framework-Template/blob/master/LICENSE
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





var ECommerceOrderDetailsPage = (function () {
    function ECommerceOrderDetailsPage(nav, order, params) {
        this.nav = nav;
        this.order = order;
        this.params = params;
        this.init();
        this.fetchData();
        this.is_refreshing = true;
    }
    ECommerceOrderDetailsPage.prototype.init = function () {
        this.init_loading = true;
        this.refresher = null;
        this.is_fetching = false;
        this.data_list = [];
    };
    /**
     * Pull refresh
     *
     * @param refresher
     */
    ECommerceOrderDetailsPage.prototype.doRefresh = function (refresher) {
        this.refresher = refresher;
        this.fetchData();
        this.is_refreshing = true;
    };
    /**
     * Fetch the data to server
     */
    ECommerceOrderDetailsPage.prototype.fetchData = function () {
        var thisApp = this;
        // the application is still fetch data to server
        if (thisApp.is_refreshing || thisApp.is_fetching) {
            return;
        }
        // fetch data to server
        thisApp.is_fetching = true;
        thisApp.order.show(thisApp.params.get('id')).subscribe(function (res) {
            var data = res.data;
            thisApp.data_list = res.data;
            // development
            __WEBPACK_IMPORTED_MODULE_3__lib_helper__["a" /* WBHelper */].log('Data: ' + JSON.stringify(data.item));
            thisApp.completeFetch();
        }, function (error) {
            thisApp.completeFetch();
        });
    };
    /**
     * Fetch completed
     */
    ECommerceOrderDetailsPage.prototype.completeFetch = function () {
        this.init_loading = false;
        this.is_fetching = false;
        this.is_refreshing = false;
        if (this.refresher) {
            this.refresher.complete();
        }
    };
    return ECommerceOrderDetailsPage;
}());
ECommerceOrderDetailsPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_4_ionic_image_loader__["a" /* IonicImageLoader */]
        ]
    }),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"E:\Projects\MobileCrossPlatform\Ionic-Framework-Template\src\pages\ecommerce\order\order.details.html"*/'<!--\n* @author Archie, Disono (webmonsph@gmail.com)\n* @git https://github.com/disono/Ionic-Framework-Template\n* @copyright Webmons Development Studio. (webmons.com), 2016-2017\n* @license Apache, 2.0 https://github.com/disono/Ionic-Framework-Template/blob/master/LICENSE\n-->\n\n<ion-header>\n  <ion-navbar>\n    <ion-title>\n      Ordered Items\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <!-- refresh items -->\n  <ion-refresher *ngIf="!init_loading" (ionRefresh)="doRefresh($event)">\n    <ion-refresher-content></ion-refresher-content>\n  </ion-refresher>\n\n  <!-- list of items on cart -->\n  <div *ngIf="!init_loading">\n    <ion-list>\n      <ion-item *ngFor="let data_fetch of data_list">\n        <ion-avatar item-left>\n          <img-loader src="{{data_fetch.cover}}" useImg></img-loader>\n        </ion-avatar>\n\n        <h2>{{data_fetch.product_name}}</h2>\n        <p>Quantity: {{data_fetch.qty}}</p>\n        <p>Total: <span color="danger"\n                        [innerHTML]="data_fetch.formatted_total"></span></p>\n        <p>{{data_fetch.status}}</p>\n      </ion-item>\n    </ion-list>\n\n    <!-- no items -->\n    <h1 class="text-center" *ngIf="!data_list.length">No Ordered Items!</h1>\n  </div>\n\n  <!-- loading -->\n  <h1 class="text-center" *ngIf="init_loading">\n    <ion-spinner icon="spiral"></ion-spinner>\n    Loading...\n  </h1>\n</ion-content>\n'/*ion-inline-end:"E:\Projects\MobileCrossPlatform\Ionic-Framework-Template\src\pages\ecommerce\order\order.details.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__providers_ecommerce_order_order__["a" /* ECommerceOrder */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */]])
], ECommerceOrderDetailsPage);

//# sourceMappingURL=order.details.js.map

/***/ }),

/***/ 287:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InboxPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_message_provider__ = __webpack_require__(145);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__reading_inbox__ = __webpack_require__(288);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__user_user_list__ = __webpack_require__(289);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__lib_helper__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ionic_image_loader__ = __webpack_require__(31);
/**
 * @author Archie, Disono (webmonsph@gmail.com)
 * @git https://github.com/disono/Ionic-Framework-Template
 * @copyright Webmons Development Studio. (webmons.com), 2016-2017
 * @license Apache, 2.0 https://github.com/disono/Ionic-Framework-Template/blob/master/LICENSE
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







var InboxPage = (function () {
    function InboxPage(nav, messageProvider, modalCtrl) {
        this.nav = nav;
        this.messageProvider = messageProvider;
        this.modalCtrl = modalCtrl;
        this.init();
        this.fetchData();
        this.is_refreshing = true;
    }
    InboxPage.prototype.init = function () {
        this.init_loading = true;
        this.refresher = null;
        this.is_fetching = false;
        this.infiniteScroll = null;
        this.data_list = [];
        this.page = 1;
    };
    /**
     * Pull refresh
     *
     * @param refresher
     */
    InboxPage.prototype.doRefresh = function (refresher) {
        this.refresher = refresher;
        this.page = 1;
        this.fetchData();
        this.is_refreshing = true;
    };
    /**
     * Infinite scroll
     *
     * @param infiniteScroll
     */
    InboxPage.prototype.doInfinite = function (infiniteScroll) {
        this.infiniteScroll = infiniteScroll;
        this.fetchData();
    };
    /**
     * Fetch the data to server
     */
    InboxPage.prototype.fetchData = function () {
        var thisApp = this;
        // the application is still fetch data to server
        if (thisApp.is_refreshing || thisApp.is_fetching) {
            return;
        }
        // fetch data to server
        thisApp.is_fetching = true;
        thisApp.messageProvider.inbox(thisApp.page).subscribe(function (res) {
            // reset data if refreshing
            if (thisApp.is_refreshing) {
                thisApp.data_list = [];
            }
            // format data
            for (var i = 0; i < res.data.length; i++) {
                thisApp.data_list.push(res.data[i]);
            }
            // development
            __WEBPACK_IMPORTED_MODULE_5__lib_helper__["a" /* WBHelper */].log('Page: ' + thisApp.page + ' Data: ' + JSON.stringify(res.data));
            // update the page
            if (res.data.length) {
                thisApp.page++;
            }
            thisApp.completeFetch();
        }, function (error) {
            thisApp.completeFetch();
        });
    };
    /**
     * Fetch completed
     */
    InboxPage.prototype.completeFetch = function () {
        this.init_loading = false;
        this.is_fetching = false;
        this.is_refreshing = false;
        if (this.refresher) {
            this.refresher.complete();
        }
        if (this.infiniteScroll) {
            this.infiniteScroll.complete();
        }
    };
    /**
     * Reading message
     *
     * @param from_id
     */
    InboxPage.prototype.readingMessage = function (from_id) {
        this.nav.push(__WEBPACK_IMPORTED_MODULE_3__reading_inbox__["a" /* ReadingInboxPage */], {
            from_id: from_id
        });
    };
    /**
     * Search user page
     */
    InboxPage.prototype.searchUser = function () {
        var thisApp = this;
        var searchListModal = thisApp.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_4__user_user_list__["a" /* UserListPage */], {
            return_page: 'modal',
            nav: thisApp.nav
        });
        searchListModal.onDidDismiss(function (data) {
            if (data) {
                // list of messages
                thisApp.readingMessage(data.user_id);
            }
        });
        searchListModal.present();
    };
    return InboxPage;
}());
InboxPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_6_ionic_image_loader__["a" /* IonicImageLoader */]
        ]
    }),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"E:\Projects\MobileCrossPlatform\Ionic-Framework-Template\src\pages\message\inbox.html"*/'<!--\n* @author Archie, Disono (webmonsph@gmail.com)\n* @git https://github.com/disono/Ionic-Framework-Template\n* @copyright Webmons Development Studio. (webmons.com), 2016-2017\n* @license Apache, 2.0 https://github.com/disono/Ionic-Framework-Template/blob/master/LICENSE\n-->\n\n<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n\n    <ion-title>\n      Inbox\n    </ion-title>\n\n    <ion-buttons end>\n      <button ion-button icon-only (click)="searchUser()">\n        <ion-icon ios="ios-person" md="md-person"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <ion-refresher *ngIf="!init_loading" (ionRefresh)="doRefresh($event)">\n    <ion-refresher-content></ion-refresher-content>\n  </ion-refresher>\n\n  <div *ngIf="!init_loading">\n    <ion-list>\n      <ion-item *ngFor="let data_fetch of data_list" (click)="readingMessage(data_fetch.from_id)">\n        <ion-avatar item-left>\n          <img-loader src="{{data_fetch.from_avatar}}" useImg></img-loader>\n        </ion-avatar>\n\n        <h2>{{data_fetch.from_full_name}}</h2>\n        <h3>{{data_fetch.formatted_created_at}}</h3>\n        <p>{{data_fetch.limit_message}}</p>\n      </ion-item>\n    </ion-list>\n  </div>\n\n  <h1 class="text-center" *ngIf="!data_list.length && !init_loading">\n    No Messages.\n  </h1>\n\n  <ion-infinite-scroll *ngIf="!init_loading" (ionInfinite)="doInfinite($event)">\n    <ion-infinite-scroll-content></ion-infinite-scroll-content>\n  </ion-infinite-scroll>\n\n  <h1 class="text-center" *ngIf="init_loading">\n    <ion-spinner icon="spiral"></ion-spinner>\n    Loading...\n  </h1>\n</ion-content>\n'/*ion-inline-end:"E:\Projects\MobileCrossPlatform\Ionic-Framework-Template\src\pages\message\inbox.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__providers_message_provider__["a" /* MessageProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ModalController */]])
], InboxPage);

//# sourceMappingURL=inbox.js.map

/***/ }),

/***/ 288:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ReadingInboxPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_message_provider__ = __webpack_require__(145);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__lib_config__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__lib_socket__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_auth_provider__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__lib_views__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__lib_helper__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_ionic_image_loader__ = __webpack_require__(31);
/**
 * @author Archie, Disono (webmonsph@gmail.com)
 * @git https://github.com/disono/Ionic-Framework-Template
 * @copyright Webmons Development Studio. (webmons.com), 2016-2017
 * @license Apache, 2.0 https://github.com/disono/Ionic-Framework-Template/blob/master/LICENSE
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









var ReadingInboxPage = (function () {
    function ReadingInboxPage(nav, messageProvider, params, loadingCtrl, auth, changeDetectorRef) {
        this.nav = nav;
        this.messageProvider = messageProvider;
        this.params = params;
        this.loadingCtrl = loadingCtrl;
        this.auth = auth;
        this.changeDetectorRef = changeDetectorRef;
        // infinite scroll up
        this.previousScrollPosition = 0;
        this.init_loading = true;
        this.is_fetching = false;
        this.data_list = [];
        this.page = 1;
        this.to_id = 0;
        this.chatBox = null;
        __WEBPACK_IMPORTED_MODULE_7__lib_helper__["a" /* WBHelper */].log('From ID: ' + params.get('from_id'));
        this.to_id = params.get('from_id');
    }
    ReadingInboxPage.prototype.initView = function () {
        var thisApp = this;
        thisApp.me = thisApp.auth.user();
        // load the messages
        thisApp.fetchMessages();
        // file on change
        jQ(document).off().on('change', '#messageFile', function () {
            thisApp.setFiles(this);
        });
        // Infinite scroll up
        thisApp.content.ionScroll.subscribe(function ($event) {
            var page = $event.contentHeight;
            var scrolled = $event.scrollTop;
            var direction = thisApp.previousScrollPosition > scrolled ? 'top' : 'bottom';
            thisApp.previousScrollPosition = scrolled;
            // trigger infinite when we are at 10% from top
            if (scrolled < page * 0.30) {
                if (!thisApp.is_fetching && direction == 'top') {
                    __WEBPACK_IMPORTED_MODULE_7__lib_helper__["a" /* WBHelper */].log('Scrolling Up...');
                    // load the messages
                    thisApp.fetchMessages();
                }
            }
        });
    };
    ReadingInboxPage.prototype.ionViewDidEnter = function () {
        var thisApp = this;
        // private messaging
        __WEBPACK_IMPORTED_MODULE_3__lib_config__["a" /* WBConfig */].private_message_on_view = true;
        __WEBPACK_IMPORTED_MODULE_4__lib_socket__["a" /* WBSocket */].emitter.addListener('msg_received', function (received) {
            // make sure this message is not from YOU or else multiple same message will be added to list
            // always check the id where the messages coming from if is really from the current list is viewing
            if (received.from_id == thisApp.to_id) {
                // add to list of message
                thisApp.data_list.push(received);
            }
        });
        // initialize
        thisApp.initView();
    };
    ReadingInboxPage.prototype.ionViewDidLeave = function () {
        __WEBPACK_IMPORTED_MODULE_7__lib_helper__["a" /* WBHelper */].log('Leaving Private Messaging: ' + this.to_id);
        // private messaging
        __WEBPACK_IMPORTED_MODULE_3__lib_config__["a" /* WBConfig */].private_message_on_view = false;
        __WEBPACK_IMPORTED_MODULE_4__lib_socket__["a" /* WBSocket */].emitter.removeEvent('private_message');
    };
    /**
     * Fetch messages
     */
    ReadingInboxPage.prototype.fetchMessages = function () {
        var thisApp = this;
        // the application is still fetch data to server
        if (thisApp.is_fetching) {
            return;
        }
        // fetch data to server
        thisApp.is_fetching = true;
        thisApp.messageProvider.reading(thisApp.to_id, thisApp.page)
            .subscribe(function (response) {
            for (var i = 0; i < response.data.length; i++) {
                thisApp.data_list.unshift(response.data[i]);
            }
            // scroll to bottom
            if (thisApp.page == 1) {
                thisApp.scrollToBottom();
            }
            // update the page
            if (response.data.length) {
                thisApp.page++;
            }
            thisApp.completeFetch();
            thisApp.changeDetectorRef.detectChanges();
        }, function (error) {
            thisApp.completeFetch();
            thisApp.changeDetectorRef.detectChanges();
        });
    };
    /**
     * Send file message
     *
     * @param file
     */
    ReadingInboxPage.prototype.sendFile = function (file) {
        var thisApp = this;
        var loading = __WEBPACK_IMPORTED_MODULE_6__lib_views__["a" /* WBView */].loading(this.loadingCtrl, 'Uploading...');
        // send your message
        thisApp.messageProvider.send(this.to_id, {
            files: {
                msg_file: file
            }
        }, function (response) {
            loading.dismiss();
            thisApp.data_list.push(response.data);
            thisApp.chatBox = null;
        }, function (error) {
            loading.dismiss();
        });
    };
    /**
     * Send text message
     *
     * @param text
     */
    ReadingInboxPage.prototype.sendText = function (text) {
        var thisApp = this;
        // don't send if null
        if (!text || text == '' || text == null) {
            return;
        }
        // send your message
        thisApp.messageProvider.send(this.to_id, {
            inputs: {
                message: text
            }
        }, function (response) {
            thisApp.data_list.push(response.data);
            // reset the chat box input
            thisApp.chatBox = null;
        }, function (error) {
        });
    };
    /**
     * Complete loading contents
     */
    ReadingInboxPage.prototype.completeFetch = function () {
        this.is_fetching = false;
    };
    /**
     * Scroll to bottom
     */
    ReadingInboxPage.prototype.scrollToBottom = function () {
        var thisApp = this;
        var dimensions = this.content.getContentDimensions();
        __WEBPACK_IMPORTED_MODULE_7__lib_helper__["a" /* WBHelper */].log('Scrolling to bottom, Y: ' + dimensions.contentHeight);
        thisApp.content.scrollTo(0, dimensions.contentHeight, 300);
    };
    /**
     * Open the dialog for images
     */
    ReadingInboxPage.prototype.openFileDialog = function () {
        jQ('#messageFile').off().click();
    };
    /**
     * Set the file on change
     *
     * @param input
     */
    ReadingInboxPage.prototype.setFiles = function (input) {
        if (input.files && input.files[0]) {
            this.sendFile(input.files[0]);
        }
    };
    return ReadingInboxPage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Content */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Content */])
], ReadingInboxPage.prototype, "content", void 0);
ReadingInboxPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_8_ionic_image_loader__["a" /* IonicImageLoader */]
        ]
    }),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"E:\Projects\MobileCrossPlatform\Ionic-Framework-Template\src\pages\message\reading.inbox.html"*/'<!--\n* @author Archie, Disono (webmonsph@gmail.com)\n* @git https://github.com/disono/Ionic-Framework-Template\n* @copyright Webmons Development Studio. (webmons.com), 2016-2017\n* @license Apache, 2.0 https://github.com/disono/Ionic-Framework-Template/blob/master/LICENSE\n-->\n\n<ion-header>\n  <ion-navbar>\n    <ion-title>\n      Reading Message\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <ion-list>\n    <ion-item *ngFor="let data_fetch of data_list" text-wrap>\n      <!-- avatar and name (you) -->\n      <ion-avatar item-left *ngIf="data_fetch.sender_type == \'you\'">\n        <img-loader src="{{data_fetch.from_avatar}}" useImg></img-loader>\n      </ion-avatar>\n      <h2 *ngIf="data_fetch.sender_type == \'you\'">{{data_fetch.from_full_name}}</h2>\n\n      <!-- avatar and name (sender) -->\n      <ion-avatar item-right *ngIf="data_fetch.sender_type == \'sender\'">\n        <img-loader src="{{data_fetch.from_avatar}}" useImg></img-loader>\n      </ion-avatar>\n      <h2 *ngIf="data_fetch.sender_type == \'sender\'" style="text-align: right !important;">\n        {{data_fetch.from_full_name}}</h2>\n\n      <!-- date and time -->\n      <p *ngIf="data_fetch.sender_type == \'you\'">{{data_fetch.formatted_created_at}}</p>\n      <p *ngIf="data_fetch.sender_type == \'sender\'" style="text-align: right !important;">\n        {{data_fetch.formatted_created_at}}</p>\n\n      <!-- text message -->\n      <p *ngIf="data_fetch.type == \'text\' && data_fetch.sender_type == \'you\'" class="text-wrap">\n        {{data_fetch.message}}</p>\n      <p *ngIf="data_fetch.type == \'text\' && data_fetch.sender_type == \'sender\'" style="text-align: right !important;">\n        {{data_fetch.message}}</p>\n\n      <!-- image message -->\n      <p *ngIf="data_fetch.type == \'image\' && data_fetch.sender_type == \'you\'">\n        <img-loader src="{{data_fetch.file}}"\n                    width="50%" useImg></img-loader>\n      </p>\n      <p *ngIf="data_fetch.type == \'image\' && data_fetch.sender_type == \'sender\'" style="text-align: right !important;">\n        <img-loader src="{{data_fetch.file}}" width="75%" useImg></img-loader>\n      </p>\n\n      <!-- video message -->\n      <p *ngIf="data_fetch.type == \'video\' && data_fetch.sender_type == \'you\'">\n        <video width="100%" controls>\n          <source src="{{data_fetch.file}}" type="video/mp4">\n        </video>\n      </p>\n      <p *ngIf="data_fetch.type == \'video\' && data_fetch.sender_type == \'sender\'" style="text-align: right !important;">\n        <video width="100%" controls>\n          <source src="{{data_fetch.file}}" type="video/mp4">\n        </video>\n      </p>\n    </ion-item>\n  </ion-list>\n</ion-content>\n\n<ion-footer>\n  <!-- file -->\n  <input type="file" style="display: none;" id="messageFile"\n         accept="image/x-png,image/gif,image/jpeg,video/mp4,video/x-m4v">\n\n  <ion-toolbar>\n    <!-- input box -->\n    <ion-input type="text" value="" [(ngModel)]="chatBox" placeholder="Type your message"></ion-input>\n\n    <ion-buttons end>\n      <!-- upload image / video -->\n      <button ion-button clear (click)="openFileDialog()">\n        <ion-icon ios="ios-cloud-upload" md="md-cloud-upload"></ion-icon>\n      </button>\n\n      <!-- send text message -->\n      <button ion-button clear icon-right (click)="sendText(chatBox)">\n        Send\n        <ion-icon name="send"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-toolbar>\n</ion-footer>\n'/*ion-inline-end:"E:\Projects\MobileCrossPlatform\Ionic-Framework-Template\src\pages\message\reading.inbox.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__providers_message_provider__["a" /* MessageProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_5__providers_auth_provider__["a" /* AuthProvider */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["k" /* ChangeDetectorRef */]])
], ReadingInboxPage);

//# sourceMappingURL=reading.inbox.js.map

/***/ }),

/***/ 289:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserListPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_user_provider__ = __webpack_require__(290);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_auth_provider__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__lib_helper__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ionic_image_loader__ = __webpack_require__(31);
/**
 * @author Archie, Disono (webmonsph@gmail.com)
 * @git https://github.com/disono/Ionic-Framework-Template
 * @copyright Webmons Development Studio. (webmons.com), 2016-2017
 * @license Apache, 2.0 https://github.com/disono/Ionic-Framework-Template/blob/master/LICENSE
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






var UserListPage = (function () {
    function UserListPage(nav, params, auth, viewCtrl, user) {
        this.nav = nav;
        this.params = params;
        this.auth = auth;
        this.viewCtrl = viewCtrl;
        this.user = user;
        this.init();
        this.fetchData();
        this.is_refreshing = true;
    }
    UserListPage.prototype.init = function () {
        this.init_loading = true;
        this.refresher = null;
        this.is_fetching = false;
        this.infiniteScroll = null;
        this.data_list = [];
        this.page = 1;
    };
    /**
     * Pull refresh
     *
     * @param refresher
     */
    UserListPage.prototype.doRefresh = function (refresher) {
        this.refresher = refresher;
        this.page = 1;
        this.fetchData();
        this.is_refreshing = true;
    };
    /**
     * Infinite scroll
     *
     * @param infiniteScroll
     */
    UserListPage.prototype.doInfinite = function (infiniteScroll) {
        this.infiniteScroll = infiniteScroll;
        this.fetchData();
    };
    /**
     * Fetch the data to server
     */
    UserListPage.prototype.fetchData = function () {
        var thisApp = this;
        // the application is still fetch data to server
        if (thisApp.is_refreshing || thisApp.is_fetching) {
            return;
        }
        // fetch data to server
        thisApp.is_fetching = true;
        thisApp.user.index({
            page: thisApp.page,
            role: (thisApp.auth.user().role == 'client') ? 'tel_agent' : ''
        }).subscribe(function (res) {
            // reset data if refreshing
            if (thisApp.is_refreshing) {
                thisApp.data_list = [];
            }
            // format data
            for (var i = 0; i < res.data.length; i++) {
                thisApp.data_list.push(res.data[i]);
            }
            // development
            __WEBPACK_IMPORTED_MODULE_4__lib_helper__["a" /* WBHelper */].log('Page: ' + thisApp.page + ' Data: ' + JSON.stringify(res.data));
            // update the page
            if (res.data.length) {
                thisApp.page++;
            }
            thisApp.completeFetch();
        }, function (error) {
            thisApp.completeFetch();
        });
    };
    /**
     * Fetch completed
     */
    UserListPage.prototype.completeFetch = function () {
        this.init_loading = false;
        this.is_fetching = false;
        this.is_refreshing = false;
        if (this.refresher) {
            this.refresher.complete();
        }
        if (this.infiniteScroll) {
            this.infiniteScroll.complete();
        }
    };
    /**
     * Selected User ID
     *
     * @param id
     */
    UserListPage.prototype.selectedUser = function (id) {
        var thisApp = this;
        if (thisApp.params.get('return_page') == 'modal') {
            thisApp.viewCtrl.dismiss({
                user_id: id
            });
        }
        else if (thisApp.params.get('return_page') == 'page') {
            // do something else
            thisApp.nav.pop();
        }
        else {
            // do something else
        }
    };
    /**
     * Close the modal
     */
    UserListPage.prototype.closeModal = function () {
        this.viewCtrl.dismiss();
    };
    return UserListPage;
}());
UserListPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_5_ionic_image_loader__["a" /* IonicImageLoader */]
        ]
    }),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"E:\Projects\MobileCrossPlatform\Ionic-Framework-Template\src\pages\user\user.list.html"*/'<!--\n* @author Archie, Disono (webmonsph@gmail.com)\n* @git https://github.com/disono/Ionic-Framework-Template\n* @copyright Webmons Development Studio. (webmons.com), 2016-2017\n* @license Apache, 2.0 https://github.com/disono/Ionic-Framework-Template/blob/master/LICENSE\n-->\n\n<ion-header>\n  <ion-navbar>\n    <ion-title>\n      Search Users\n    </ion-title>\n\n    <ion-buttons end>\n      <!-- show this button if modal -->\n      <button *ngIf="params.get(\'return_page\') == \'modal\'" ion-button icon-only (click)="closeModal()">\n        <ion-icon ios="ios-close" md="md-close"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <ion-refresher *ngIf="!init_loading" (ionRefresh)="doRefresh($event)">\n    <ion-refresher-content></ion-refresher-content>\n  </ion-refresher>\n\n  <ion-list>\n    <ion-item *ngFor="let item of data_list" (click)="selectedUser(item.id)">\n      <ion-avatar item-left>\n        <img-loader src="{{item.avatar}}" useImg></img-loader>\n      </ion-avatar>\n\n      <h2>{{item.full_name}}</h2>\n    </ion-item>\n  </ion-list>\n\n  <!-- no orders -->\n  <h1 class="text-center" *ngIf="!data_list.length && !init_loading">\n    No Users!\n  </h1>\n\n  <ion-infinite-scroll *ngIf="!init_loading" (ionInfinite)="doInfinite($event)">\n    <ion-infinite-scroll-content></ion-infinite-scroll-content>\n  </ion-infinite-scroll>\n\n  <h1 class="text-center" *ngIf="init_loading">\n    <ion-spinner icon="spiral"></ion-spinner>\n    Loading...\n  </h1>\n</ion-content>\n'/*ion-inline-end:"E:\Projects\MobileCrossPlatform\Ionic-Framework-Template\src\pages\user\user.list.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__providers_auth_provider__["a" /* AuthProvider */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ViewController */], __WEBPACK_IMPORTED_MODULE_2__providers_user_provider__["a" /* UserProvider */]])
], UserListPage);

//# sourceMappingURL=user.list.js.map

/***/ }),

/***/ 290:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__apd_provider__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lib_helper__ = __webpack_require__(11);
/**
 * @author Archie, Disono (webmonsph@gmail.com)
 * @git https://github.com/disono/Ionic-Framework-Template
 * @copyright Webmons Development Studio. (webmons.com), 2016-2017
 * @license Apache, 2.0 https://github.com/disono/Ionic-Framework-Template/blob/master/LICENSE
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



var UserProvider = (function () {
    function UserProvider(appProvider) {
        this.appProvider = appProvider;
        __WEBPACK_IMPORTED_MODULE_2__lib_helper__["a" /* WBHelper */].log('UserProvider Provider Called.');
    }
    /**
     * User List
     *
     * @param params
     * @returns {any}
     */
    UserProvider.prototype.index = function (params) {
        return this.appProvider.get('users', params, function (res) {
            __WEBPACK_IMPORTED_MODULE_2__lib_helper__["a" /* WBHelper */].log('UserProvider-index: ' + res);
        });
    };
    /**
     * UserProvider
     * Save the data to authenticated user
     *
     * @param id
     * @returns {any}
     */
    UserProvider.prototype.show = function (id) {
        return this.appProvider.get('user/' + id, null, function (res) {
            __WEBPACK_IMPORTED_MODULE_2__lib_helper__["a" /* WBHelper */].log('UserProvider-show: ' + res);
        });
    };
    return UserProvider;
}());
UserProvider = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__apd_provider__["a" /* APDProvider */]])
], UserProvider);

//# sourceMappingURL=user-provider.js.map

/***/ }),

/***/ 291:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(292);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(296);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 296:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(157);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_image_loader__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_status_bar__ = __webpack_require__(246);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_splash_screen__ = __webpack_require__(247);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_component__ = __webpack_require__(342);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_message_provider__ = __webpack_require__(145);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__providers_ecommerce_order_order__ = __webpack_require__(144);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__providers_ecommerce_cart_cart__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__providers_ecommerce_product_product__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__providers_ecommerce_product_category__ = __webpack_require__(284);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__providers_user_provider__ = __webpack_require__(290);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__providers_application_provider__ = __webpack_require__(278);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__providers_auth_provider__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__providers_apd_provider__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_about_about__ = __webpack_require__(272);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__pages_contact_contact__ = __webpack_require__(273);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__pages_home_home__ = __webpack_require__(608);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__pages_user_user_list__ = __webpack_require__(289);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__pages_message_reading_inbox__ = __webpack_require__(288);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__pages_message_inbox__ = __webpack_require__(287);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__pages_ecommerce_order_order_details__ = __webpack_require__(286);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__pages_ecommerce_order_order_list__ = __webpack_require__(285);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__pages_ecommerce_cart_update_quantity_modal__ = __webpack_require__(280);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__pages_ecommerce_cart_success__ = __webpack_require__(279);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__pages_ecommerce_cart_checkout__ = __webpack_require__(277);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__pages_ecommerce_cart_content__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__pages_ecommerce_product_filter_modal__ = __webpack_require__(283);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__pages_ecommerce_product_product_show__ = __webpack_require__(143);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__pages_ecommerce_product_product_list__ = __webpack_require__(142);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__pages_ecommerce_product_category__ = __webpack_require__(609);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__pages_drawer_drawer__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__pages_settings_security__ = __webpack_require__(276);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__pages_settings_general__ = __webpack_require__(275);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36__pages_settings_settings_tab__ = __webpack_require__(274);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37__pages_authentication_forgot__ = __webpack_require__(282);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_38__pages_authentication_register__ = __webpack_require__(281);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_39__pages_authentication_login__ = __webpack_require__(64);
/**
 * @author Archie, Disono (webmonsph@gmail.com)
 * @git https://github.com/disono/Ionic-Framework-Template
 * @copyright Webmons Development Studio. (webmons.com), 2016-2017
 * @license Apache, 2.0 https://github.com/disono/Ionic-Framework-Template/blob/master/LICENSE
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};








































var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_39__pages_authentication_login__["a" /* LoginPage */],
            __WEBPACK_IMPORTED_MODULE_38__pages_authentication_register__["a" /* RegisterPage */],
            __WEBPACK_IMPORTED_MODULE_37__pages_authentication_forgot__["a" /* ForgotPage */],
            __WEBPACK_IMPORTED_MODULE_36__pages_settings_settings_tab__["a" /* SettingsTabPage */],
            __WEBPACK_IMPORTED_MODULE_35__pages_settings_general__["a" /* GeneralPage */],
            __WEBPACK_IMPORTED_MODULE_34__pages_settings_security__["a" /* SecurityPage */],
            __WEBPACK_IMPORTED_MODULE_33__pages_drawer_drawer__["a" /* DrawerPage */],
            __WEBPACK_IMPORTED_MODULE_19__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_17__pages_about_about__["a" /* AboutPage */],
            __WEBPACK_IMPORTED_MODULE_18__pages_contact_contact__["a" /* ContactPage */],
            // ECommerce Declarations
            __WEBPACK_IMPORTED_MODULE_32__pages_ecommerce_product_category__["a" /* ECommerceProductCategoryPage */],
            __WEBPACK_IMPORTED_MODULE_31__pages_ecommerce_product_product_list__["a" /* ECommerceProductListPage */],
            __WEBPACK_IMPORTED_MODULE_30__pages_ecommerce_product_product_show__["a" /* ECommerceProductShowPage */],
            __WEBPACK_IMPORTED_MODULE_29__pages_ecommerce_product_filter_modal__["a" /* ECommerceProductFilterModal */],
            __WEBPACK_IMPORTED_MODULE_28__pages_ecommerce_cart_content__["a" /* ECommerceCartContentPage */],
            __WEBPACK_IMPORTED_MODULE_27__pages_ecommerce_cart_checkout__["a" /* ECommerceCartCheckoutPage */],
            __WEBPACK_IMPORTED_MODULE_26__pages_ecommerce_cart_success__["a" /* ECommerceCartSuccessPage */],
            __WEBPACK_IMPORTED_MODULE_25__pages_ecommerce_cart_update_quantity_modal__["a" /* ECommerceCartItemQuantityModal */],
            __WEBPACK_IMPORTED_MODULE_24__pages_ecommerce_order_order_list__["a" /* ECommerceOrderListPage */],
            __WEBPACK_IMPORTED_MODULE_23__pages_ecommerce_order_order_details__["a" /* ECommerceOrderDetailsPage */],
            // Messenger
            __WEBPACK_IMPORTED_MODULE_22__pages_message_inbox__["a" /* InboxPage */],
            __WEBPACK_IMPORTED_MODULE_21__pages_message_reading_inbox__["a" /* ReadingInboxPage */],
            // User
            __WEBPACK_IMPORTED_MODULE_20__pages_user_user_list__["a" /* UserListPage */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["g" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* MyApp */]),
            __WEBPACK_IMPORTED_MODULE_4_ionic_image_loader__["a" /* IonicImageLoader */].forRoot()
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["e" /* IonicApp */]],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_39__pages_authentication_login__["a" /* LoginPage */],
            __WEBPACK_IMPORTED_MODULE_38__pages_authentication_register__["a" /* RegisterPage */],
            __WEBPACK_IMPORTED_MODULE_37__pages_authentication_forgot__["a" /* ForgotPage */],
            __WEBPACK_IMPORTED_MODULE_36__pages_settings_settings_tab__["a" /* SettingsTabPage */],
            __WEBPACK_IMPORTED_MODULE_35__pages_settings_general__["a" /* GeneralPage */],
            __WEBPACK_IMPORTED_MODULE_34__pages_settings_security__["a" /* SecurityPage */],
            __WEBPACK_IMPORTED_MODULE_33__pages_drawer_drawer__["a" /* DrawerPage */],
            __WEBPACK_IMPORTED_MODULE_19__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_17__pages_about_about__["a" /* AboutPage */],
            __WEBPACK_IMPORTED_MODULE_18__pages_contact_contact__["a" /* ContactPage */],
            // ECommerce Declarations
            __WEBPACK_IMPORTED_MODULE_32__pages_ecommerce_product_category__["a" /* ECommerceProductCategoryPage */],
            __WEBPACK_IMPORTED_MODULE_31__pages_ecommerce_product_product_list__["a" /* ECommerceProductListPage */],
            __WEBPACK_IMPORTED_MODULE_30__pages_ecommerce_product_product_show__["a" /* ECommerceProductShowPage */],
            __WEBPACK_IMPORTED_MODULE_29__pages_ecommerce_product_filter_modal__["a" /* ECommerceProductFilterModal */],
            __WEBPACK_IMPORTED_MODULE_28__pages_ecommerce_cart_content__["a" /* ECommerceCartContentPage */],
            __WEBPACK_IMPORTED_MODULE_27__pages_ecommerce_cart_checkout__["a" /* ECommerceCartCheckoutPage */],
            __WEBPACK_IMPORTED_MODULE_26__pages_ecommerce_cart_success__["a" /* ECommerceCartSuccessPage */],
            __WEBPACK_IMPORTED_MODULE_25__pages_ecommerce_cart_update_quantity_modal__["a" /* ECommerceCartItemQuantityModal */],
            __WEBPACK_IMPORTED_MODULE_24__pages_ecommerce_order_order_list__["a" /* ECommerceOrderListPage */],
            __WEBPACK_IMPORTED_MODULE_23__pages_ecommerce_order_order_details__["a" /* ECommerceOrderDetailsPage */],
            // Messenger
            __WEBPACK_IMPORTED_MODULE_22__pages_message_inbox__["a" /* InboxPage */],
            __WEBPACK_IMPORTED_MODULE_21__pages_message_reading_inbox__["a" /* ReadingInboxPage */],
            // User
            __WEBPACK_IMPORTED_MODULE_20__pages_user_user_list__["a" /* UserListPage */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_16__providers_apd_provider__["a" /* APDProvider */],
            __WEBPACK_IMPORTED_MODULE_14__providers_application_provider__["a" /* ApplicationProvider */],
            __WEBPACK_IMPORTED_MODULE_15__providers_auth_provider__["a" /* AuthProvider */],
            __WEBPACK_IMPORTED_MODULE_13__providers_user_provider__["a" /* UserProvider */],
            // ECommerce Providers
            __WEBPACK_IMPORTED_MODULE_12__providers_ecommerce_product_category__["a" /* ECommerceProductCategories */],
            __WEBPACK_IMPORTED_MODULE_11__providers_ecommerce_product_product__["a" /* ECommerceProduct */],
            __WEBPACK_IMPORTED_MODULE_10__providers_ecommerce_cart_cart__["a" /* ECommerceCart */],
            __WEBPACK_IMPORTED_MODULE_9__providers_ecommerce_order_order__["a" /* ECommerceOrder */],
            // Messenger
            __WEBPACK_IMPORTED_MODULE_8__providers_message_provider__["a" /* MessageProvider */],
            { provide: __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["f" /* IonicErrorHandler */] }
        ]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 342:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(246);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(247);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_auth_provider__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__lib_config__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__lib_views__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_drawer_drawer__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__lib_socket__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__lib_helper__ = __webpack_require__(11);
/**
 * @author Archie, Disono (webmonsph@gmail.com)
 * @git https://github.com/disono/Ionic-Framework-Template
 * @copyright Webmons Development Studio. (webmons.com), 2016-2017
 * @license Apache, 2.0 https://github.com/disono/Ionic-Framework-Template/blob/master/LICENSE
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










var MyApp = (function () {
    function MyApp(platform, authProvider, loadingCtrl, alertCtrl, statusBar, splashScreen) {
        this.platform = platform;
        this.authProvider = authProvider;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.initializeApp();
    }
    /**
     * Initialize the app
     */
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            var thisApp = _this;
            // check if user is authenticated
            // drawer menus
            thisApp.rootPage = __WEBPACK_IMPORTED_MODULE_7__pages_drawer_drawer__["a" /* DrawerPage */];
            // run the application data
            thisApp.run();
            // event listener for syncing application
            __WEBPACK_IMPORTED_MODULE_8__lib_socket__["a" /* WBSocket */].emitter.addListener('sync_application', function () {
                thisApp.run();
            });
        });
    };
    /**
     * Set the default page view
     *
     * @param thisApp
     */
    MyApp.prototype.pageView = function (thisApp) {
        // Okay, so the platform is ready and our plugins are available.
        // Here you can do any higher level native things you might need.
        this.statusBar.styleDefault();
        if (this.splashScreen) {
            this.splashScreen.hide();
        }
        // check if user is authenticated
        // drawer menus
        thisApp.rootPage = __WEBPACK_IMPORTED_MODULE_7__pages_drawer_drawer__["a" /* DrawerPage */];
    };
    /**
     * Run the application
     */
    MyApp.prototype.run = function () {
        var thisApp = this;
        if (!thisApp.authProvider.check()) {
            // set page view
            thisApp.pageView(thisApp);
            return;
        }
        // save the new authenticated user (Sync data)
        var loading = __WEBPACK_IMPORTED_MODULE_6__lib_views__["a" /* WBView */].loading(thisApp.loadingCtrl, 'Syncing...');
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
    };
    /**
     * sync done
     */
    MyApp.prototype.syncDone = function () {
        // set page view
        this.pageView(this);
    };
    /**
     * Initialized required data
     */
    MyApp.prototype.initializeData = function (callback) {
        var thisApp = this;
        // store the FCM token
        if (__WEBPACK_IMPORTED_MODULE_5__lib_config__["a" /* WBConfig */].enableFCM) {
            FCMPlugin.getToken(function (token) {
                // send the token to server
                thisApp.authProvider.fcm_token(thisApp.authProvider.user().id, token).subscribe(function (response) {
                    callback();
                });
            }, function (err) {
                callback();
                __WEBPACK_IMPORTED_MODULE_6__lib_views__["a" /* WBView */].alert(thisApp.alertCtrl, 'FCM Error', 'Error retrieving token: ' + err);
            });
        }
        else {
            callback();
        }
        // watch user's position (really)
        if (__WEBPACK_IMPORTED_MODULE_5__lib_config__["a" /* WBConfig */].watchPosition) {
            __WEBPACK_IMPORTED_MODULE_9__lib_helper__["a" /* WBHelper */].watchPosition(function (position) {
                // register session
                thisApp.sentLocation();
            }, function (error) {
            });
        }
        // web sockets
        thisApp.initSocket();
    };
    /**
     * Waiting for socket
     */
    MyApp.prototype.initSocket = function () {
        var thisApp = this;
        var session = thisApp.authProvider.user();
        if (!__WEBPACK_IMPORTED_MODULE_5__lib_config__["a" /* WBConfig */].enable_web_socket) {
            return;
        }
        __WEBPACK_IMPORTED_MODULE_8__lib_socket__["a" /* WBSocket */].connect(function () {
            // on connected
            // register session
            thisApp.sentLocation();
            // web socket receiver
            thisApp.webSocketReceiver(session);
        }, function () {
            // events
        }, function () {
            // disconnect
            __WEBPACK_IMPORTED_MODULE_8__lib_socket__["a" /* WBSocket */].emit('destroy_session', {
                token_key: session.token_key
            });
        });
    };
    /**
     * Received data from web socket
     *
     * @param session
     */
    MyApp.prototype.webSocketReceiver = function (session) {
        // messenger
        __WEBPACK_IMPORTED_MODULE_8__lib_socket__["a" /* WBSocket */].on('message_session_' + session.id, function (data) {
            if (!__WEBPACK_IMPORTED_MODULE_5__lib_config__["a" /* WBConfig */].private_message_on_view) {
                __WEBPACK_IMPORTED_MODULE_9__lib_helper__["a" /* WBHelper */].notify('New Message (' + data.from_full_name + ')', data.limit_message);
            }
            else {
                __WEBPACK_IMPORTED_MODULE_8__lib_socket__["a" /* WBSocket */].emitter.emitEvent('msg_received', [data]);
            }
        });
        // notification to
        __WEBPACK_IMPORTED_MODULE_8__lib_socket__["a" /* WBSocket */].on('notification_' + session.id, function (data) {
            // notify
            __WEBPACK_IMPORTED_MODULE_9__lib_helper__["a" /* WBHelper */].notify(data.name, data.content);
        });
        // notification channel
        __WEBPACK_IMPORTED_MODULE_8__lib_socket__["a" /* WBSocket */].on('notification_channel_' + session.role, function (data) {
            // notify
            __WEBPACK_IMPORTED_MODULE_9__lib_helper__["a" /* WBHelper */].notify(data.name, data.content);
        });
    };
    /**
     * Sent the current location as session registration
     */
    MyApp.prototype.sentLocation = function () {
        var session = this.authProvider.user();
        session.lat = __WEBPACK_IMPORTED_MODULE_5__lib_config__["a" /* WBConfig */].lat;
        session.lng = __WEBPACK_IMPORTED_MODULE_5__lib_config__["a" /* WBConfig */].lng;
        __WEBPACK_IMPORTED_MODULE_8__lib_socket__["a" /* WBSocket */].emit('register_session', session);
    };
    return MyApp;
}());
MyApp = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        template: "<ion-nav [root]=\"rootPage\"></ion-nav>"
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* Platform */], __WEBPACK_IMPORTED_MODULE_4__providers_auth_provider__["a" /* AuthProvider */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
], MyApp);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 37:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WBConfig; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__helper__ = __webpack_require__(11);
/**
 * @author Archie, Disono (webmonsph@gmail.com)
 * @git https://github.com/disono/Ionic-Framework-Template
 * @copyright Webmons Development Studio. (webmons.com), 2016-2017
 * @license Apache, 2.0 https://github.com/disono/Ionic-Framework-Template/blob/master/LICENSE
 */

var _WBConfig = (function () {
    return {
        // this application
        thisApp: null,
        // is development mode
        dev: true,
        // platform type default is browser mode
        is_browser: true,
        // api for google maps
        api_key_google: '',
        map_box_token: '',
        // facebook authentication (disabled)
        facebook_auth: true,
        // server url
        dev_domain: 'http://your-dev',
        prod_domain: 'http://your-prod',
        server_url: function () {
            return (_WBConfig.dev) ? _WBConfig.dev_domain + ':80/api/v1/' : _WBConfig.prod_domain + '/api/v1/';
        },
        // socket IO
        enable_web_socket: false,
        socket_uri: function () {
            return (_WBConfig.dev) ? _WBConfig.dev_domain + ':3000/' : _WBConfig.prod_domain + ':3000/';
        },
        // Fire-base Cloud Messaging
        enableFCM: false,
        // we will watch the user's position on application sync
        watchPosition: false,
        // GPS
        lat: 0,
        lng: 0,
        watchPositionID: null,
        // socket defaults
        private_message_on_view: false,
        // reset the config
        resetGPS: function () {
            // stop GSP watch
            __WEBPACK_IMPORTED_MODULE_0__helper__["a" /* WBHelper */].stopWatchPosition();
            _WBConfig.lat = 0;
            _WBConfig.lng = 0;
            _WBConfig.watchPositionID = null;
        }
    };
}());
var WBConfig = _WBConfig;
//# sourceMappingURL=config.js.map

/***/ }),

/***/ 38:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return APDProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(157);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(248);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__ = __webpack_require__(343);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__lib_helper__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__lib_security__ = __webpack_require__(271);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__lib_config__ = __webpack_require__(37);
/**
 * @author Archie, Disono (webmonsph@gmail.com)
 * @git https://github.com/disono/Ionic-Framework-Template
 * @copyright Webmons Development Studio. (webmons.com), 2016-2017
 * @license Apache, 2.0 https://github.com/disono/Ionic-Framework-Template/blob/master/LICENSE
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








var APDProvider = APDProvider_1 = (function () {
    function APDProvider(http) {
        this.http = http;
        __WEBPACK_IMPORTED_MODULE_4__lib_helper__["a" /* WBHelper */].log('App Provider Called.');
    }
    APDProvider.me = function () {
        var auth = __WEBPACK_IMPORTED_MODULE_4__lib_helper__["a" /* WBHelper */].getItem('user', true);
        return (!!(auth)) ? auth : null;
    };
    /**
     * Request status response
     *
     * @param response
     * @returns {any}
     */
    APDProvider.requestStatus = function (response) {
        if (response.status < 200 || response.status >= 300) {
            __WEBPACK_IMPORTED_MODULE_4__lib_helper__["a" /* WBHelper */].error('APDProvider-requestStatus' + 'Bad response status: ' + response.status);
            APDProvider_1._handleError('Bad response status: ' + response.status);
        }
        return response.json();
    };
    /**
     * Headers for authenticated
     *
     * @returns {Headers}
     */
    APDProvider.headersAuth = function () {
        var me = APDProvider_1.me();
        __WEBPACK_IMPORTED_MODULE_4__lib_helper__["a" /* WBHelper */].log('headersAuth: ' + JSON.stringify(me));
        // headers
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + __WEBPACK_IMPORTED_MODULE_6__lib_security__["a" /* WBSecurity */].jwtAuth(),
            'token_key': me.token_key,
            'authenticated_id': me.id
        });
        return new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: headers });
    };
    /**
     * Headers for guest
     *
     * @returns {RequestOptions}
     */
    APDProvider.headersGuest = function () {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({
            'Content-Type': 'application/json'
        });
        return new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: headers });
    };
    /**
     * GET request
     *
     * @param uri
     * @param parameters
     * @param successCallback
     * @returns {any}
     */
    APDProvider.prototype.get = function (uri, parameters, successCallback) {
        var thisApp = this;
        var url = __WEBPACK_IMPORTED_MODULE_7__lib_config__["a" /* WBConfig */].server_url() + uri;
        var res_options = (APDProvider_1.me()) ? APDProvider_1.headersAuth() : APDProvider_1.headersGuest();
        // parameters
        var params = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["e" /* URLSearchParams */]();
        if (parameters) {
            jQ.each(parameters, function (i, val) {
                params.set(i, val);
            });
        }
        // append this additional parameters
        res_options.search = params;
        return thisApp.http.get(url, res_options).map(function (response) {
            var res = APDProvider_1.requestStatus(response);
            successCallback(res);
            return res;
        }).catch(APDProvider_1._handleError);
    };
    /**
     * POST request
     *
     * @param uri
     * @param parameters
     * @param successCallback
     * @returns {any}
     */
    APDProvider.prototype.post = function (uri, parameters, successCallback) {
        var thisApp = this;
        var url = __WEBPACK_IMPORTED_MODULE_7__lib_config__["a" /* WBConfig */].server_url() + uri;
        var body = (parameters) ? JSON.stringify(parameters) : null;
        var headers = (APDProvider_1.me()) ? APDProvider_1.headersAuth() : APDProvider_1.headersGuest();
        return thisApp.http.post(url, body, headers).map(function (response) {
            var res = APDProvider_1.requestStatus(response);
            successCallback(res);
            return res;
        }).catch(APDProvider_1._handleError);
    };
    /**
     * Upload
     *
     * Single file: {name: value}
     * Multiple file: {name_1: [value_1, value_2], name_2: [value_1, value_2]}
     *
     * @param uri
     * @param parameters
     * @param successCallback
     * @param errorCallback
     */
    APDProvider.prototype.upload = function (uri, parameters, successCallback, errorCallback) {
        var me = APDProvider_1.me();
        var url = __WEBPACK_IMPORTED_MODULE_7__lib_config__["a" /* WBConfig */].server_url() + uri;
        WBUpload(url, me, __WEBPACK_IMPORTED_MODULE_6__lib_security__["a" /* WBSecurity */].jwtAuth(), APDProvider_1, parameters, successCallback, errorCallback);
    };
    /**
     * Handle errors
     *
     * @param error
     * @returns {any}
     * @private
     */
    APDProvider._handleError = function (error) {
        if (error instanceof String || typeof error.json != 'function') {
            __WEBPACK_IMPORTED_MODULE_4__lib_helper__["a" /* WBHelper */].errorMessage(error);
            __WEBPACK_IMPORTED_MODULE_4__lib_helper__["a" /* WBHelper */].error('APDProvider-_handleError-instanceof: ' + error);
            return __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__["Observable"].throw(error);
        }
        var error_data = error.json();
        if (!error_data.errors) {
            __WEBPACK_IMPORTED_MODULE_4__lib_helper__["a" /* WBHelper */].errorMessage(error);
            __WEBPACK_IMPORTED_MODULE_4__lib_helper__["a" /* WBHelper */].log("APDProvider-_handleError-error_data: Unknown JSON data error.");
            return __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__["Observable"].throw("Unknown JSON data error.");
        }
        __WEBPACK_IMPORTED_MODULE_4__lib_helper__["a" /* WBHelper */].errorMessage(error_data.errors);
        __WEBPACK_IMPORTED_MODULE_4__lib_helper__["a" /* WBHelper */].error('APDProvider-_handleError-Observable.throw: ' + JSON.stringify(error_data.errors));
        return __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__["Observable"].throw(JSON.stringify(error_data.errors));
    };
    return APDProvider;
}());
APDProvider = APDProvider_1 = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]])
], APDProvider);

var APDProvider_1;
//# sourceMappingURL=apd-provider.js.map

/***/ }),

/***/ 49:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WBSocket; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__config__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helper__ = __webpack_require__(11);
/**
 * @author Archie, Disono (webmonsph@gmail.com)
 * @git https://github.com/disono/Ionic-Framework-Template
 * @copyright Webmons Development Studio. (webmons.com), 2016-2017
 * @license Apache, 2.0 https://github.com/disono/Ionic-Framework-Template/blob/master/LICENSE
 */


var _WBSocket = (function () {
    return {
        socket: null,
        emitter: new EventEmitter(),
        /**
         * Connect
         */
        connect: function (connectCallback, eventCallback, disconnectCallback) {
            this.socket = io.connect(__WEBPACK_IMPORTED_MODULE_0__config__["a" /* WBConfig */].socket_uri());
            // on connect
            this.socket.on('connect', function () {
                __WEBPACK_IMPORTED_MODULE_1__helper__["a" /* WBHelper */].log('SocketIO is Connected!');
                connectCallback();
            });
            // event
            this.socket.on('event', function (data) {
                __WEBPACK_IMPORTED_MODULE_1__helper__["a" /* WBHelper */].log('SocketIO Event Received!');
                eventCallback();
            });
            // on disconnect
            this.socket.on('disconnect', function () {
                __WEBPACK_IMPORTED_MODULE_1__helper__["a" /* WBHelper */].log('SocketIO Disconnected!');
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
            return __WEBPACK_IMPORTED_MODULE_1__helper__["a" /* WBHelper */].getItem('user', true);
        }
    };
}());
var WBSocket = _WBSocket;
//# sourceMappingURL=socket.js.map

/***/ }),

/***/ 50:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ECommerceCart; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__apd_provider__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lib_helper__ = __webpack_require__(11);
/**
 * @author Archie, Disono (webmonsph@gmail.com)
 * @git https://github.com/disono/Ionic-Framework-Template
 * @copyright Webmons Development Studio. (webmons.com), 2016-2017
 * @license Apache, 2.0 https://github.com/disono/Ionic-Framework-Template/blob/master/LICENSE
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



var ECommerceCart = (function () {
    function ECommerceCart(appProvider) {
        this.appProvider = appProvider;
        __WEBPACK_IMPORTED_MODULE_2__lib_helper__["a" /* WBHelper */].log('ECommerce Cart Called.');
    }
    /**
     * Product categories
     *
     * @returns {any}
     */
    ECommerceCart.prototype.content = function () {
        return this.appProvider.get('e-commerce/cart', null, function (res) {
            __WEBPACK_IMPORTED_MODULE_2__lib_helper__["a" /* WBHelper */].log('Product content: ' + res);
        });
    };
    /**
     * Add item to cart
     *
     * @param product_id
     * @returns {any}
     */
    ECommerceCart.prototype.add = function (product_id) {
        return this.appProvider.get('e-commerce/cart/add/' + product_id, null, function (res) {
            __WEBPACK_IMPORTED_MODULE_2__lib_helper__["a" /* WBHelper */].log('Product add: ' + res);
        });
    };
    /**
     * Update quantity
     *
     * @param id
     * @param quantity
     * @returns {any}
     */
    ECommerceCart.prototype.update = function (id, quantity) {
        return this.appProvider.get('e-commerce/cart/update/' + id + '/' + quantity, null, function (res) {
            __WEBPACK_IMPORTED_MODULE_2__lib_helper__["a" /* WBHelper */].log('Product update: ' + res);
        });
    };
    /**
     * Delete item on cart
     *
     * @param id
     * @returns {any}
     */
    ECommerceCart.prototype.destroy = function (id) {
        return this.appProvider.get('e-commerce/cart/destroy/' + id, null, function (res) {
            __WEBPACK_IMPORTED_MODULE_2__lib_helper__["a" /* WBHelper */].log('Product add: ' + res);
        });
    };
    /**
     * Clear items on cart
     *
     * @returns {any}
     */
    ECommerceCart.prototype.clear = function () {
        return this.appProvider.get('e-commerce/cart/clear', null, function (res) {
            __WEBPACK_IMPORTED_MODULE_2__lib_helper__["a" /* WBHelper */].log('Product clear: ' + res);
        });
    };
    /**
     * Apply voucher code on cart
     *
     * @param code
     * @returns {any}
     */
    ECommerceCart.prototype.voucher = function (code) {
        return this.appProvider.post('e-commerce/cart/voucher/' + code, null, function (res) {
            __WEBPACK_IMPORTED_MODULE_2__lib_helper__["a" /* WBHelper */].log('Product clear: ' + res);
        });
    };
    /**
     * Remove voucher code
     *
     * @returns {any}
     */
    ECommerceCart.prototype.removeVoucher = function () {
        return this.appProvider.get('e-commerce/cart/voucher/remove', null, function (res) {
            __WEBPACK_IMPORTED_MODULE_2__lib_helper__["a" /* WBHelper */].log('Product clear: ' + res);
        });
    };
    /**
     * Place your order
     *
     * @param parameters
     * @returns {any}
     */
    ECommerceCart.prototype.place = function (parameters) {
        return this.appProvider.post('e-commerce/place', parameters, function (res) {
            __WEBPACK_IMPORTED_MODULE_2__lib_helper__["a" /* WBHelper */].log('Product place: ' + res);
        });
    };
    return ECommerceCart;
}());
ECommerceCart = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__apd_provider__["a" /* APDProvider */]])
], ECommerceCart);

//# sourceMappingURL=cart.js.map

/***/ }),

/***/ 608:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/**
 * @author Archie, Disono (webmonsph@gmail.com)
 * @git https://github.com/disono/Ionic-Framework-Template
 * @copyright Webmons Development Studio. (webmons.com), 2016-2017
 * @license Apache, 2.0 https://github.com/disono/Ionic-Framework-Template/blob/master/LICENSE
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


var HomePage = (function () {
    function HomePage(nav) {
        this.nav = nav;
    }
    HomePage.prototype.ionViewDidEnter = function () {
    };
    return HomePage;
}());
HomePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"E:\Projects\MobileCrossPlatform\Ionic-Framework-Template\src\pages\home\home.html"*/'<!--\n* @author Archie, Disono (webmonsph@gmail.com)\n* @git https://github.com/disono/Ionic-Framework-Template\n* @copyright Webmons Development Studio. (webmons.com), 2016-2017\n* @license Apache, 2.0 https://github.com/disono/Ionic-Framework-Template/blob/master/LICENSE\n-->\n\n<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n\n    <ion-title>Home</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n\n</ion-content>\n'/*ion-inline-end:"E:\Projects\MobileCrossPlatform\Ionic-Framework-Template\src\pages\home\home.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */]])
], HomePage);

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 609:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ECommerceProductCategoryPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/**
 * @author Archie, Disono (webmonsph@gmail.com)
 * @git https://github.com/disono/Ionic-Framework-Template
 * @copyright Webmons Development Studio. (webmons.com), 2016-2017
 * @license Apache, 2.0 https://github.com/disono/Ionic-Framework-Template/blob/master/LICENSE
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


var ECommerceProductCategoryPage = (function () {
    function ECommerceProductCategoryPage(nav) {
        this.nav = nav;
    }
    return ECommerceProductCategoryPage;
}());
ECommerceProductCategoryPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"E:\Projects\MobileCrossPlatform\Ionic-Framework-Template\src\pages\ecommerce\product\category.html"*/'<!--\n* @author Archie, Disono (webmonsph@gmail.com)\n* @git https://github.com/disono/Ionic-Framework-Template\n* @copyright Webmons Development Studio. (webmons.com), 2016-2017\n* @license Apache, 2.0 https://github.com/disono/Ionic-Framework-Template/blob/master/LICENSE\n-->\n\n<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n\n    <ion-title>\n      Category\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n\n</ion-content>\n'/*ion-inline-end:"E:\Projects\MobileCrossPlatform\Ionic-Framework-Template\src\pages\ecommerce\product\category.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */]])
], ECommerceProductCategoryPage);

//# sourceMappingURL=category.js.map

/***/ }),

/***/ 62:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DrawerPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__about_about__ = __webpack_require__(272);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__contact_contact__ = __webpack_require__(273);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__settings_settings_tab__ = __webpack_require__(274);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ecommerce_product_product_list__ = __webpack_require__(142);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ecommerce_cart_content__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ecommerce_order_order_list__ = __webpack_require__(285);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__message_inbox__ = __webpack_require__(287);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__authentication_login__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__providers_auth_provider__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__lib_socket__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_ionic_image_loader__ = __webpack_require__(31);
/**
 * @author Archie, Disono (webmonsph@gmail.com)
 * @git https://github.com/disono/Ionic-Framework-Template
 * @copyright Webmons Development Studio. (webmons.com), 2016-2017
 * @license Apache, 2.0 https://github.com/disono/Ionic-Framework-Template/blob/master/LICENSE
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













var DrawerPage = DrawerPage_1 = (function () {
    function DrawerPage(auth, modalCtrl, alertCtrl) {
        this.auth = auth;
        this.modalCtrl = modalCtrl;
        this.alertCtrl = alertCtrl;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_5__ecommerce_product_product_list__["a" /* ECommerceProductListPage */];
        var thisApp = this;
        __WEBPACK_IMPORTED_MODULE_11__lib_socket__["a" /* WBSocket */].emitter.addListener('sync_application', function () {
            thisApp.setMenus();
        });
    }
    DrawerPage.prototype.ionViewDidEnter = function () {
        this.setMenus();
    };
    DrawerPage.prototype.setMenus = function () {
        var pages = [];
        if (this.auth.check()) {
            pages.push({ title: 'My Cart', component: __WEBPACK_IMPORTED_MODULE_6__ecommerce_cart_content__["a" /* ECommerceCartContentPage */] });
            pages.push({ title: 'My Orders', component: __WEBPACK_IMPORTED_MODULE_7__ecommerce_order_order_list__["a" /* ECommerceOrderListPage */] });
            // messenger
            pages.push({ title: 'Messages', component: __WEBPACK_IMPORTED_MODULE_8__message_inbox__["a" /* InboxPage */] });
        }
        else {
            pages.push({ title: 'Login', component: __WEBPACK_IMPORTED_MODULE_9__authentication_login__["a" /* LoginPage */] });
        }
        // e-commerce
        pages.push({ title: 'Products', component: __WEBPACK_IMPORTED_MODULE_5__ecommerce_product_product_list__["a" /* ECommerceProductListPage */] });
        pages.push({ title: 'Contact', component: __WEBPACK_IMPORTED_MODULE_3__contact_contact__["a" /* ContactPage */] });
        pages.push({ title: 'About', component: __WEBPACK_IMPORTED_MODULE_2__about_about__["a" /* AboutPage */] });
        // logout button
        if (this.auth.check()) {
            pages.push({ title: 'Logout', component: null });
        }
        this.pages = pages;
    };
    DrawerPage.prototype.openPage = function (page) {
        var thisApp = this;
        if (page.title == 'Login') {
            // show the login page (modal)
            var loginModal = thisApp.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_9__authentication_login__["a" /* LoginPage */], {
                return_page: 'modal',
                nav: thisApp.nav
            });
            loginModal.onDidDismiss(function (data) {
                if (data) {
                    thisApp.setMenus();
                }
            });
            loginModal.present();
            return;
        }
        else if (page.title == 'Logout') {
            thisApp.logout();
            return;
        }
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    };
    /**
     * Profile settings
     */
    DrawerPage.prototype.profile = function () {
        this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_4__settings_settings_tab__["a" /* SettingsTabPage */]);
    };
    /**
     * Logout
     */
    DrawerPage.prototype.logout = function () {
        var thisApp = this;
        thisApp.alertCtrl.create({
            title: 'Confirm Logout?',
            message: 'Do you agree to logout?',
            buttons: [
                {
                    text: 'Logout',
                    handler: function () {
                        thisApp.auth.logout();
                        // use this.app.getRootNav() for default navigation
                        thisApp.nav.setRoot(DrawerPage_1);
                        // let's set the menu after the page loads
                        thisApp.setMenus();
                    }
                },
                {
                    text: 'No',
                    handler: function () {
                        // do nothing
                    }
                }
            ]
        }).present();
    };
    return DrawerPage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Nav */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Nav */])
], DrawerPage.prototype, "nav", void 0);
DrawerPage = DrawerPage_1 = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_12_ionic_image_loader__["a" /* IonicImageLoader */]
        ]
    }),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"E:\Projects\MobileCrossPlatform\Ionic-Framework-Template\src\pages\drawer\drawer.html"*/'<!--\n* @author Archie, Disono (webmonsph@gmail.com)\n* @git https://github.com/disono/Ionic-Framework-Template\n* @copyright Webmons Development Studio. (webmons.com), 2016-2017\n* @license Apache, 2.0 https://github.com/disono/Ionic-Framework-Template/blob/master/LICENSE\n-->\n\n<ion-menu [content]="content">\n  <ion-header no-shadow>\n    <ion-toolbar>\n      <ion-title>Menu</ion-title>\n    </ion-toolbar>\n  </ion-header>\n\n  <ion-content>\n    <!-- profile details -->\n    <ion-card *ngIf="auth.check()" style="box-shadow: none !important;">\n      <ion-item class="profile-item">\n        <div class="profile-picture">\n          <img-loader src="{{auth.user().avatar}}" (click)="profile()" menuClose useImg></img-loader>\n        </div>\n\n        <h4 class="profile-name">{{auth.user().full_name}}</h4>\n        <p *ngIf="auth.user().email">{{auth.user().email}}</p>\n      </ion-item>\n\n      <ion-item class="profile-item">\n        <button menuClose ion-button block outline (click)="profile()">\n          Profile Settings\n        </button>\n      </ion-item>\n    </ion-card>\n\n    <!-- menu list -->\n    <ion-list>\n      <ion-item menuClose *ngFor="let p of pages" (click)="openPage(p)" no-lines>\n        {{p.title}}\n      </ion-item>\n    </ion-list>\n  </ion-content>\n</ion-menu>\n\n<ion-nav #content [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"E:\Projects\MobileCrossPlatform\Ionic-Framework-Template\src\pages\drawer\drawer.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_10__providers_auth_provider__["a" /* AuthProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ModalController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */]])
], DrawerPage);

var DrawerPage_1;
//# sourceMappingURL=drawer.js.map

/***/ }),

/***/ 63:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ECommerceProduct; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__apd_provider__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lib_helper__ = __webpack_require__(11);
/**
 * @author Archie, Disono (webmonsph@gmail.com)
 * @git https://github.com/disono/Ionic-Framework-Template
 * @copyright Webmons Development Studio. (webmons.com), 2016-2017
 * @license Apache, 2.0 https://github.com/disono/Ionic-Framework-Template/blob/master/LICENSE
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



var ECommerceProduct = (function () {
    function ECommerceProduct(appProvider) {
        this.appProvider = appProvider;
        __WEBPACK_IMPORTED_MODULE_2__lib_helper__["a" /* WBHelper */].log('ECommerce Product Called.');
    }
    /**
     * Product categories
     *
     * @returns {any}
     */
    ECommerceProduct.prototype.index = function (parameters) {
        return this.appProvider.get('e-commerce/product', parameters, function (res) {
            __WEBPACK_IMPORTED_MODULE_2__lib_helper__["a" /* WBHelper */].log('Product: ' + res);
        });
    };
    /**
     * Get product details
     *
     * @param id
     * @returns {any}
     */
    ECommerceProduct.prototype.show = function (id) {
        return this.appProvider.get('e-commerce/product/show/' + id, null, function (res) {
            __WEBPACK_IMPORTED_MODULE_2__lib_helper__["a" /* WBHelper */].log('Product show: ' + res);
        });
    };
    return ECommerceProduct;
}());
ECommerceProduct = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__apd_provider__["a" /* APDProvider */]])
], ECommerceProduct);

//# sourceMappingURL=product.js.map

/***/ }),

/***/ 64:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lib_views__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_auth_provider__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__register__ = __webpack_require__(281);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__forgot__ = __webpack_require__(282);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__lib_socket__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__lib_config__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__drawer_drawer__ = __webpack_require__(62);
/**
 * @author Archie, Disono (webmonsph@gmail.com)
 * @git https://github.com/disono/Ionic-Framework-Template
 * @copyright Webmons Development Studio. (webmons.com), 2016-2017
 * @license Apache, 2.0 https://github.com/disono/Ionic-Framework-Template/blob/master/LICENSE
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









var LoginPage = LoginPage_1 = (function () {
    function LoginPage(nav, app, alertCtrl, loadingCtrl, auth, params, viewCtrl) {
        this.nav = nav;
        this.app = app;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.auth = auth;
        this.params = params;
        this.viewCtrl = viewCtrl;
        this.wb_config = __WEBPACK_IMPORTED_MODULE_7__lib_config__["a" /* WBConfig */];
        __WEBPACK_IMPORTED_MODULE_7__lib_config__["a" /* WBConfig */].thisApp = this;
        this.init();
    }
    /**
     * Initialize
     */
    LoginPage.prototype.init = function () {
        this.inputs = {
            email: '',
            password: ''
        };
    };
    /**
     * Login
     *
     * @param $event
     * @param inputs
     */
    LoginPage.prototype.doLogin = function ($event, inputs) {
        // $event.preventDefault();
        var thisApp = this;
        // check for values
        if (!inputs.email || !inputs.password) {
            __WEBPACK_IMPORTED_MODULE_2__lib_views__["a" /* WBView */].alert(thisApp.alertCtrl, 'Required Inputs', 'Email and password is required.');
            return;
        }
        // show loading
        var loading = __WEBPACK_IMPORTED_MODULE_2__lib_views__["a" /* WBView */].loading(thisApp.loadingCtrl, 'Authenticating');
        // login
        thisApp.auth.login(inputs).subscribe(function (response) {
            loading.dismiss();
            // check the users role
            thisApp._checkRole(response, thisApp);
        }, function (e) {
            loading.dismiss();
            __WEBPACK_IMPORTED_MODULE_2__lib_views__["a" /* WBView */].alert(thisApp.alertCtrl, 'Invalid', e);
        });
    };
    /**
     * Facebook authentication
     */
    LoginPage.prototype.doFacebook = function () {
        var thisApp = this;
        // show loading
        var loading = __WEBPACK_IMPORTED_MODULE_2__lib_views__["a" /* WBView */].loading(thisApp.loadingCtrl, 'Creating profile...');
        // check is authenticated
        thisApp.auth.facebook(function (response) {
            loading.dismiss();
            // check the users role
            __WEBPACK_IMPORTED_MODULE_7__lib_config__["a" /* WBConfig */].thisApp._checkRole(response, __WEBPACK_IMPORTED_MODULE_7__lib_config__["a" /* WBConfig */].thisApp);
        }, function (error) {
            loading.dismiss();
            __WEBPACK_IMPORTED_MODULE_2__lib_views__["a" /* WBView */].alert(thisApp.alertCtrl, 'Registration unsuccessful', error);
        }, function () {
            loading.dismiss();
        });
    };
    /**
     * Check role
     *
     * @param response
     * @param thisApp
     * @private
     */
    LoginPage.prototype._checkRole = function (response, thisApp) {
        // data
        var data = response.data;
        // show the main menu
        if (data.role == 'client') {
            thisApp.init();
            // set the default call page
            LoginPage_1.setPageType(thisApp);
        }
        else {
            __WEBPACK_IMPORTED_MODULE_2__lib_views__["a" /* WBView */].alert(thisApp.alertCtrl, 'Not Allowed', 'This Email/Username and password is not allowed to login.');
            thisApp.auth.logout();
        }
    };
    /**
     * Call the default page to call on successful login
     *
     * @param thisApp
     */
    LoginPage.setPageType = function (thisApp) {
        // emit to sync data
        __WEBPACK_IMPORTED_MODULE_6__lib_socket__["a" /* WBSocket */].emitter.emitEvent('sync_application');
        // set the main page or back to previous page (modal)
        if (thisApp.params.get('return_page') == 'modal') {
            thisApp.viewCtrl.dismiss();
        }
        else if (thisApp.params.get('return_page') == 'page') {
            thisApp.nav.pop();
        }
        else {
            thisApp.nav.setRoot(__WEBPACK_IMPORTED_MODULE_8__drawer_drawer__["a" /* DrawerPage */]);
        }
    };
    /**
     * Register
     */
    LoginPage.prototype.goToRegister = function () {
        if (this.params.get('return_page') == 'modal') {
            this.viewCtrl.dismiss();
            this.params.get('nav').push(__WEBPACK_IMPORTED_MODULE_4__register__["a" /* RegisterPage */], {
                return_page: 'page'
            });
        }
        else {
            this.nav.push(__WEBPACK_IMPORTED_MODULE_4__register__["a" /* RegisterPage */]);
        }
    };
    /**
     * Forgot password
     */
    LoginPage.prototype.goToReset = function () {
        this.nav.push(__WEBPACK_IMPORTED_MODULE_5__forgot__["a" /* ForgotPage */]);
    };
    /**
     * Close the modal
     */
    LoginPage.prototype.closeModal = function () {
        this.viewCtrl.dismiss();
    };
    return LoginPage;
}());
LoginPage = LoginPage_1 = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"E:\Projects\MobileCrossPlatform\Ionic-Framework-Template\src\pages\authentication\login.html"*/'<!--\n* @author Archie, Disono (webmonsph@gmail.com)\n* @git https://github.com/disono/Ionic-Framework-Template\n* @copyright Webmons Development Studio. (webmons.com), 2016-2017\n* @license Apache, 2.0 https://github.com/disono/Ionic-Framework-Template/blob/master/LICENSE\n-->\n\n<ion-header>\n  <ion-navbar>\n    <ion-title>Login</ion-title>\n\n    <ion-buttons end>\n      <!-- show this button if modal -->\n      <button *ngIf="params.get(\'return_page\') == \'modal\'" ion-button icon-only (click)="closeModal()">\n        <ion-icon ios="ios-close" md="md-close"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <!-- facebook login button -->\n  <button type="button" *ngIf="wb_config.facebook_auth" ion-button block color="facebook-color" (click)="doFacebook()">\n    <ion-icon ios="logo-facebook" md="logo-facebook"></ion-icon>\n    Continue with Facebook\n  </button>\n\n  <form (submit)="doLogin($event, inputs)">\n    <ion-list>\n      <ion-item no-lines>\n        <ion-label floating>Email</ion-label>\n        <ion-input type="email" [(ngModel)]="inputs.email" name="email"></ion-input>\n      </ion-item>\n\n      <ion-item no-lines>\n        <ion-label floating>Password</ion-label>\n        <ion-input type="password" [(ngModel)]="inputs.password" name="password"></ion-input>\n      </ion-item>\n\n      <ion-item no-lines>\n        <button ion-button block outline type="submit">Login</button>\n      </ion-item>\n    </ion-list>\n\n    <button type="button" ion-button block clear dark (click)="goToRegister()">Register</button>\n    <button type="button" ion-button block clear dark (click)="goToReset()">Forgot Password</button>\n  </form>\n</ion-content>\n'/*ion-inline-end:"E:\Projects\MobileCrossPlatform\Ionic-Framework-Template\src\pages\authentication\login.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* App */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_3__providers_auth_provider__["a" /* AuthProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ViewController */]])
], LoginPage);

var LoginPage_1;
//# sourceMappingURL=login.js.map

/***/ }),

/***/ 89:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ECommerceCartContentPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_ecommerce_product_product__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_auth_provider__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_ecommerce_cart_cart__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__product_product_show__ = __webpack_require__(143);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__lib_helper__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__checkout__ = __webpack_require__(277);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__update_quantity_modal__ = __webpack_require__(280);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__lib_views__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_ionic_image_loader__ = __webpack_require__(31);
/**
 * @author Archie, Disono (webmonsph@gmail.com)
 * @git https://github.com/disono/Ionic-Framework-Template
 * @copyright Webmons Development Studio. (webmons.com), 2016-2017
 * @license Apache, 2.0 https://github.com/disono/Ionic-Framework-Template/blob/master/LICENSE
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











var ECommerceCartContentPage = (function () {
    function ECommerceCartContentPage(nav, product, auth, cart, actionSheetCtrl, modalCtrl, loadingCtrl) {
        this.nav = nav;
        this.product = product;
        this.auth = auth;
        this.cart = cart;
        this.actionSheetCtrl = actionSheetCtrl;
        this.modalCtrl = modalCtrl;
        this.loadingCtrl = loadingCtrl;
        this.init();
        this.fetchData();
        this.is_refreshing = true;
    }
    ECommerceCartContentPage.prototype.init = function () {
        this.init_loading = true;
        this.refresher = null;
        this.is_fetching = false;
        this.data_list = [];
    };
    /**
     * Pull refresh
     *
     * @param refresher
     */
    ECommerceCartContentPage.prototype.doRefresh = function (refresher) {
        this.refresher = refresher;
        this.fetchData();
        this.is_refreshing = true;
    };
    /**
     * Fetch the data to server
     */
    ECommerceCartContentPage.prototype.fetchData = function () {
        var thisApp = this;
        // the application is still fetch data to server
        if (thisApp.is_refreshing || thisApp.is_fetching) {
            return;
        }
        // fetch data to server
        thisApp.is_fetching = true;
        thisApp.cart.content().subscribe(function (res) {
            var data = res.data;
            thisApp.cart_details = res.data;
            // new data
            thisApp.data_list = data.item;
            // development
            __WEBPACK_IMPORTED_MODULE_6__lib_helper__["a" /* WBHelper */].log('Data: ' + JSON.stringify(data.item));
            thisApp.completeFetch();
        }, function (error) {
            thisApp.completeFetch();
        });
    };
    /**
     * Fetch completed
     */
    ECommerceCartContentPage.prototype.completeFetch = function () {
        this.init_loading = false;
        this.is_fetching = false;
        this.is_refreshing = false;
        if (this.refresher) {
            this.refresher.complete();
        }
    };
    /**
     * Remove to cart
     *
     * @param product_id
     */
    ECommerceCartContentPage.prototype.removeToCart = function (product_id) {
        var thisApp = this;
        thisApp.actionSheetCtrl.create({
            title: 'Are you sure to delete this item to cart?',
            buttons: [
                {
                    text: 'YES delete this item on my cart.',
                    role: 'destructive',
                    handler: function () {
                        var loading = __WEBPACK_IMPORTED_MODULE_9__lib_views__["a" /* WBView */].loading(thisApp.loadingCtrl, 'Removing item on cart...');
                        thisApp.cart.destroy(product_id).subscribe(function (response) {
                            loading.dismiss();
                            __WEBPACK_IMPORTED_MODULE_6__lib_helper__["a" /* WBHelper */].showToast('Your item is successfully remove to cart.');
                            // refresh
                            thisApp.fetchData();
                        }, function (error) {
                            loading.dismiss();
                            __WEBPACK_IMPORTED_MODULE_6__lib_helper__["a" /* WBHelper */].error('Subscribe Error: ' + error);
                        });
                    }
                }, {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function () {
                        __WEBPACK_IMPORTED_MODULE_6__lib_helper__["a" /* WBHelper */].log('Cancel clicked');
                    }
                }
            ]
        }).present();
    };
    /**
     * Update the quantity
     *
     * @param product_id
     */
    ECommerceCartContentPage.prototype.updateQuantity = function (product_id) {
        var _this = this;
        var thisApp = this;
        __WEBPACK_IMPORTED_MODULE_6__lib_helper__["a" /* WBHelper */].log('Update Quantity Modal');
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_8__update_quantity_modal__["a" /* ECommerceCartItemQuantityModal */], {
            id: product_id
        });
        modal.onDidDismiss(function (data) {
            if (data) {
                __WEBPACK_IMPORTED_MODULE_6__lib_helper__["a" /* WBHelper */].log(data);
                thisApp.fetchData();
                _this.is_refreshing = true;
            }
        });
        modal.present();
    };
    /**
     * Clear items on cart
     */
    ECommerceCartContentPage.prototype.clearCart = function () {
        var thisApp = this;
        thisApp.actionSheetCtrl.create({
            title: 'Are you sure to clear your cart?',
            buttons: [
                {
                    text: 'YES clear and delete ALL items on my cart.',
                    role: 'destructive',
                    handler: function () {
                        var loading = __WEBPACK_IMPORTED_MODULE_9__lib_views__["a" /* WBView */].loading(thisApp.loadingCtrl, 'Removing all items on cart...');
                        thisApp.cart.clear().subscribe(function (response) {
                            loading.dismiss();
                            __WEBPACK_IMPORTED_MODULE_6__lib_helper__["a" /* WBHelper */].showToast('Your cart is successfully cleared.');
                            // refresh
                            thisApp.fetchData();
                        }, function (error) {
                            loading.dismiss();
                            __WEBPACK_IMPORTED_MODULE_6__lib_helper__["a" /* WBHelper */].error('Subscribe Error: ' + error);
                        });
                    }
                }, {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function () {
                        __WEBPACK_IMPORTED_MODULE_6__lib_helper__["a" /* WBHelper */].log('Cancel clicked');
                    }
                }
            ]
        }).present();
    };
    /**
     * Show product details
     *
     * @param id
     */
    ECommerceCartContentPage.prototype.showProduct = function (id) {
        __WEBPACK_IMPORTED_MODULE_6__lib_helper__["a" /* WBHelper */].log('Product: ' + id);
        this.nav.push(__WEBPACK_IMPORTED_MODULE_5__product_product_show__["a" /* ECommerceProductShowPage */], {
            id: id
        });
    };
    /**
     * Proceed to checkout
     */
    ECommerceCartContentPage.prototype.checkout = function () {
        this.nav.push(__WEBPACK_IMPORTED_MODULE_7__checkout__["a" /* ECommerceCartCheckoutPage */]);
    };
    return ECommerceCartContentPage;
}());
ECommerceCartContentPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_10_ionic_image_loader__["a" /* IonicImageLoader */]
        ]
    }),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"E:\Projects\MobileCrossPlatform\Ionic-Framework-Template\src\pages\ecommerce\cart\content.html"*/'<!--\n* @author Archie, Disono (webmonsph@gmail.com)\n* @git https://github.com/disono/Ionic-Framework-Template\n* @copyright Webmons Development Studio. (webmons.com), 2016-2017\n* @license Apache, 2.0 https://github.com/disono/Ionic-Framework-Template/blob/master/LICENSE\n-->\n\n<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n\n    <ion-title>\n      My Cart\n    </ion-title>\n\n    <ion-buttons end>\n      <button ion-button icon-only (click)="clearCart()">\n        <ion-icon ios="ios-trash" md="md-trash"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<ion-content class="bg-product-list">\n  <!-- refresh items -->\n  <ion-refresher *ngIf="!init_loading" (ionRefresh)="doRefresh($event)">\n    <ion-refresher-content></ion-refresher-content>\n  </ion-refresher>\n\n  <!-- list of items on cart -->\n  <div *ngIf="!init_loading">\n    <ion-list>\n      <ion-item *ngFor="let data_fetch of data_list">\n        <ion-avatar item-left>\n          <img-loader src="{{data_fetch.product.cover}}" (click)="showProduct(data_fetch.id)" useImg></img-loader>\n        </ion-avatar>\n\n        <h2 (click)="showProduct(data_fetch.id)">{{data_fetch.name}}</h2>\n        <p>Quantity: <span>{{data_fetch.qty}}</span> Price: <span color="danger"\n                                                                  [innerHTML]="data_fetch.formatted_price"></span></p>\n\n        <ion-grid>\n          <ion-row>\n            <ion-col width-50>\n              <button ion-button clear block small color="danger" icon-left (click)="removeToCart(data_fetch.id)">\n                <ion-icon ios="ios-trash" md="md-trash"></ion-icon>\n                Remove\n              </button>\n            </ion-col>\n\n            <ion-col width-50>\n              <button ion-button clear block small color="primary" icon-left (click)="updateQuantity(data_fetch.id)">\n                <ion-icon ios="ios-open" md="md-open"></ion-icon>\n                Quantity\n              </button>\n            </ion-col>\n          </ion-row>\n        </ion-grid>\n      </ion-item>\n    </ion-list>\n\n    <!-- no items -->\n    <h1 class="text-center" *ngIf="!data_list.length">No Items On Your Cart!</h1>\n  </div>\n\n  <!-- loading -->\n  <h1 class="text-center" *ngIf="init_loading">\n    <ion-spinner icon="spiral"></ion-spinner>\n    Loading...\n  </h1>\n</ion-content>\n\n<!-- checkout -->\n<ion-footer *ngIf="data_list.length">\n  <ion-toolbar>\n    <ion-grid>\n      <ion-row>\n        <ion-col width-50>\n          Estimated Total\n        </ion-col>\n\n        <ion-col width-50>\n          <strong><span [innerHTML]="cart_details.formatted_total"></span></strong>\n        </ion-col>\n      </ion-row>\n    </ion-grid>\n  </ion-toolbar>\n\n  <ion-toolbar>\n    <button ion-button block color="danger" (click)="checkout()">\n      Proceed to Checkout\n    </button>\n  </ion-toolbar>\n</ion-footer>\n'/*ion-inline-end:"E:\Projects\MobileCrossPlatform\Ionic-Framework-Template\src\pages\ecommerce\cart\content.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__providers_ecommerce_product_product__["a" /* ECommerceProduct */], __WEBPACK_IMPORTED_MODULE_3__providers_auth_provider__["a" /* AuthProvider */], __WEBPACK_IMPORTED_MODULE_4__providers_ecommerce_cart_cart__["a" /* ECommerceCart */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ModalController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */]])
], ECommerceCartContentPage);

//# sourceMappingURL=content.js.map

/***/ })

},[291]);
//# sourceMappingURL=main.js.map