/**
 * @author          Archie, Disono (webmonsph@gmail.com)
 * @link            https://webmons.com
 * @copyright       Archie Disono - Webmons Development Studio. (webmons.com), 2018
 * @license         Apache, 2.0 https://github.com/disono/Ionic-Framework-Template/blob/master/LICENSE
 */

import {LoadingController} from '@ionic/angular';

export class ViewHelper {
    // @ts-ignore
    private loadingController = new LoadingController();

    async loadingPresent(message) {
        const loadingElement = await this.loadingController.create({
            message: message ? message : 'Loading...',
            spinner: 'crescent'
        });

        return await loadingElement.present();
    }

    async loadingDismiss() {
        return await this.loadingController.dismiss();
    }
}