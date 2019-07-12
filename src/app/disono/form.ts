/**
 * @author          Archie, Disono (webmonsph@gmail.com)
 * @link            https://webmons.com
 * @copyright       Archie Disono - Webmons Development Studio. (webmons.com), 2018
 * @license         Apache, 2.0 https://github.com/disono/Ionic-Framework-Template/blob/master/LICENSE
 */
import {Configurations} from "../../environments/config";
import {FileHelper} from "./file";

declare let navigator;
declare let Camera;

export class FormHelper {
    private configuration = new Configurations();

    /**
     * Set default values
     *
     * @param params_defaults
     * @param options
     */
    defaults(params_defaults, options) {
        for (let prop in params_defaults) {
            // Note: if options would contain some undefined or unnecessary values, you should check for undefined instead.
            options[prop] = (typeof options[prop] !== 'undefined') ? options[prop] : params_defaults[prop];
        }

        params_defaults = options;

        return params_defaults;
    }

    /**
     * Select photo
     *
     * @param options
     */
    selectPhoto(options) {
        let self = this;

        return new Promise((resolve, reject) => {
            if (self.configuration.browser) {
                return reject('Camera selection is not supported on browser.');
            }

            options = self.defaults({
                imgId: null,
                quality: 40,

                // PHOTOLIBRARY, CAMERA
                sourceType: Camera.PictureSourceType.PHOTOLIBRARY
            }, options);

            navigator.camera.getPicture(function (fileURI) {
                if (!fileURI || fileURI == '') {
                    return reject('Failed to capture the image, please try again.');
                }

                let img = "data:image/jpeg;base64," + fileURI;
                if (options.imgId) {
                    try {
                        // set to image
                        setTimeout(function () {
                            self._setImgSrc(document.getElementById(options.imgId), img);
                        }, 300);
                    } catch (e) {
                        return reject('Image src failed to set, ' + e);
                    }
                }

                try {
                    // set to input
                    let blog = new FileHelper().b64toBlob(img);
                    resolve({
                        image: blog,
                        filename: 'image_' + Math.round((new Date()).getTime() / 1000) + '.jpg'
                    });
                } catch (e) {
                    reject('Failed to convert to blob, ' + e);
                }
            }, function (e) {
                // handle errors
                reject(e.message);
            }, {
                quality: options.quality,
                destinationType: Camera.DestinationType.DATA_URL,
                sourceType: options.sourceType,
                mediaType: Camera.MediaType.PICTURE,
                encodingType: Camera.EncodingType.JPEG
            });
        });
    }

    private _setImgSrc(image, img) {
        image.src = img;
    }
}