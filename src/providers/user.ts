/**
 * @author          Archie, Disono (webmonsph@gmail.com)
 * @link            https://webmons.com
 * @copyright       Webmons Development Studio. (webmons.com), 2018
 * @license         Apache, 2.0 https://github.com/disono/Ionic-Framework-Template/blob/master/LICENSE
 */

import {Injectable} from '@angular/core';
import {WBHelper} from "../libraries/helper";
import {BaseProvider} from "./base";
import {WBSecurity} from "../libraries/security";

@Injectable()
export class UserProvider {

  constructor(private base: BaseProvider) {
    WBHelper.log('User Provider');
  }

  profile(username) {
    return this.base.get('u/' + username, null, function (res) {
      WBHelper.log('User-profile: ' + res);
    });
  }

  updateSettings(params) {
    return this.base.upload('user/setting/update', params, function (res) {
      WBHelper.log('User-updateSettings: ' + res);
      WBSecurity.saveAuth(res.data);
    });
  }

  updateSecurity(params) {
    return this.base.post('user/security/update', params, function (res) {
      WBHelper.log('User-updateSecurity: ' + res);
      WBSecurity.saveAuth(res.data);
    });
  }

}
