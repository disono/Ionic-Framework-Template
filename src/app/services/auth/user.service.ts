import {Injectable} from '@angular/core';
import {BaseService} from "../base/base.service";
import {NavigatorHelper} from "../../disono/navigator";

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private navigatorHelper = new NavigatorHelper();

    constructor(private base: BaseService) {

    }

    updateGeneralSettings(params) {
        let self = this;
        return self.base.upload('user/setting/update', params, function (response) {
            self.navigatorHelper.log('UserService-updateSettings');
        });
    }

    updateSecurity(params) {
        let self = this;
        return self.base.post('user/security/update', params, function (response) {
            self.navigatorHelper.log('UserService-updateSecurity');
        });
    }

}
