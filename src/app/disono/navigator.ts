/**
 * @author          Archie, Disono (webmonsph@gmail.com)
 * @link            https://webmons.com
 * @copyright       Archie Disono - Webmons Development Studio. (webmons.com), 2018
 * @license         Apache, 2.0 https://github.com/disono/Ionic-Framework-Template/blob/master/LICENSE
 */

import {Configurations} from "../../environments/config";
import {FormHelper} from "./form";

declare let window;
declare let navigator;

export class NavigatorHelper {
    private config = new Configurations();
    private formHelper = new FormHelper();

    constructor() {

    }

    /**
     * Log to console
     *
     * @param message
     */
    log(message) {
        if (!this.config.browser || !message) {
            return;
        }

        console.log('WB Log: ' + new Date() + ': ' + message);
    }

    /**
     * Log error console
     *
     * @param message
     */
    error(message) {
        if (!this.config.browser || !message) {
            return;
        }

        console.log('WB Error: ' + new Date() + ': ' + message);
    }

    /**
     * Toast
     *
     * @param message
     */
    toast(message) {
        let self = this;
        if (self.config.browser) {
            self.log(message);
            return;
        }

        window.plugins.toast.showWithOptions({
                message: message,
                duration: "short",
                position: "bottom"
            },
            function () {

            },
            function (e) {
                self.error(e);
            });
    }

    /**
     * Show alert message
     *
     * @param options
     */
    alert(options) {
        let self = this;
        if (self.config.browser) {
            self.log('Alert: ' + options.title + ', ' + options.desc);
            return;
        }

        options = this.formHelper.defaults({
            btnOk: 'Ok',
            title: '',
            desc: '',
            callback: function () {

            }
        }, options);

        navigator.notification.alert(
            options.desc,
            options.callback,
            options.title,
            options.btnOk
        );
    }

    /**
     * Show confirm message
     *
     * @param options
     */
    confirm(options) {
        let self = this;
        if (self.config.browser) {
            self.log('Alert: ' + options.title + ', ' + options.desc);
            return;
        }

        options = this.formHelper.defaults({
            btnOk: 'Yes,No',
            title: '',
            desc: '',
            callback: function (i) {

            }
        }, options);

        navigator.notification.confirm(
            options.desc,
            options.callback,
            options.title,
            options.btnOk
        );
    }

    /**
     * Show error message
     *
     * @param e
     */
    failed(e) {
        let errorText = 'Unknown error occurred, or please check your network connection.';

        if (!e) {
            this.toast(errorText);
            return errorText;
        }

        if (typeof e === 'string' || e instanceof String) {
            this.toast(e);
            return e;
        }

        if (typeof e === 'object') {
            for (let key in e) {
                if (e.hasOwnProperty(key)) {
                    errorText = e[key].toString();
                    this.toast(errorText);
                    return errorText;
                }
            }

            return errorText;
        }

        this.toast(e);
        return e;
    }

    /**
     * Set errors messages from server
     *
     * @param errors
     * @param inputsMsg
     */
    inputErrors(errors, inputsMsg) {
        if (typeof errors === 'object') {
            for (let key in errors) {
                if (errors.hasOwnProperty(key)) {
                    inputsMsg[key].valid = false;
                    inputsMsg[key].msg = errors[key].toString();
                }
            }
        }

        return inputsMsg;
    }
}