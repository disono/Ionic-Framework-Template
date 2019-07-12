/**
 * @author          Archie, Disono (webmonsph@gmail.com)
 * @link            https://webmons.com
 * @copyright       Archie Disono - Webmons Development Studio. (webmons.com), 2018
 * @license         Apache, 2.0 https://github.com/disono/Ionic-Framework-Template/blob/master/LICENSE
 */

import {NavigatorHelper} from "./navigator";

export class FileHelper {
    private navigatorHelper = new NavigatorHelper();

    constructor() {

    }

    /**
     * Copy text to clipboard
     *
     * @param value
     * @param message
     */
    copyToClipboard(value, message) {
        const el = document.createElement('textarea');
        el.value = value;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
        this.navigatorHelper.toast(message);
    }

    /**
     * URI to blob
     *
     * @param dataURI
     */
    b64toBlob(dataURI) {
        // convert base64/URLEncoded data component to raw binary data held in a string
        let byteString;
        if (dataURI.split(',')[0].indexOf('base64') >= 0) {
            byteString = atob(dataURI.split(',')[1]);
        } else {
            byteString = encodeURI(dataURI.split(',')[1]);
        }

        // separate out the mime component
        let mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
        // write the bytes of the string to a typed array
        let ia = new Uint8Array(byteString.length);

        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }

        return new Blob([ia], {type: mimeString});
    }
}