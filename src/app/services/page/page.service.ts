import {Injectable} from '@angular/core';
import {NavigatorHelper} from "../../disono/navigator";
import {BaseService} from "../base/base.service";

@Injectable({
    providedIn: 'root'
})
export class PageService {
    private navigatorHelper = new NavigatorHelper();

    constructor(private base: BaseService) {

    }

    details(slug) {
        let self = this;
        return this.base.get('p/' + slug, null, function (response) {
            self.navigatorHelper.log('PageService-details');
        });
    }

}
