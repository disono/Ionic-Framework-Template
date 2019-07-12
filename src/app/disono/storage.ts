/**
 * @author          Archie, Disono (webmonsph@gmail.com)
 * @link            https://webmons.com
 * @copyright       Archie Disono - Webmons Development Studio. (webmons.com), 2018
 * @license         Apache, 2.0 https://github.com/disono/Ionic-Framework-Template/blob/master/LICENSE
 */

import {Configurations} from "../../environments/config";

declare let window;

export class StorageHelper {
    private config = new Configurations();

    constructor() {

    }

    /**
     * Set app name
     */
    public app() {
        return this.config.app + '_';
    }

    /***
     * Get data
     *
     * @param key
     * @param value
     * @param isJson
     */
    public set(key, value, isJson = false) {
        if (isJson === true) {
            value = JSON.stringify(value);
        }

        window.localStorage.setItem(this.app() + key, value);
    }

    /**
     * Set data
     *
     * @param key
     * @param isJson
     */
    public fetch(key, isJson = false) {
        let value = window.localStorage.getItem(this.app() + key);

        if (isJson === true && value != null) {
            value = JSON.parse(value);
        }

        return value;
    }

    /**
     * Delete data
     *
     * @param key
     */
    public remove(key) {
        window.localStorage.removeItem(this.app() + key);
    }

    /**
     * Delete all data
     */
    public clear() {
        window.localStorage.clear();
    }
}