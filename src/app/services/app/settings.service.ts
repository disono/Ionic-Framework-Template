import {Injectable} from '@angular/core';
import {NavigatorHelper} from "../../disono/navigator";
import {StorageHelper} from "../../disono/storage";
import {BaseService} from "../base/base.service";

@Injectable({
    providedIn: 'root'
})
export class SettingsService {
    private navigatorHelper = new NavigatorHelper();
    private storageHelper = new StorageHelper();

    constructor(private base: BaseService) {

    }

    settings() {
        let self = this;
        return this.base.get('application/settings', null, function (response) {
            self.navigatorHelper.log('SettingsService-settings');
            self.storageHelper.set('settings', response.data, true);
        });
    }

    countries() {
        let self = this;
        return this.base.get('application/countries', null, function (response) {
            self.navigatorHelper.log('SettingsService-country');
        });
    }

    cities(country_id) {
        let self = this;
        return this.base.get('application/cities/' + country_id, null, function (response) {
            self.navigatorHelper.log('SettingsService-city');
        });
    }
}
