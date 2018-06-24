/**
 * @author          Archie, Disono (webmonsph@gmail.com)
 * @link            https://webmons.com
 * @copyright       Webmons Development Studio. (webmons.com), 2018
 * @license         Apache, 2.0 https://github.com/disono/Ionic-Framework-Template/blob/master/LICENSE
 */

import {Injectable} from '@angular/core';
import {BaseProvider} from "./base";
import {AuthProvider} from "./auth";
import {WBHelper} from "../libraries/helper";

@Injectable()
export class AuthSocialProvider {

  constructor(private base: BaseProvider, private auth: AuthProvider) {
    WBHelper.log('AuthSocial Provider');
  }

  facebook() {

  }

}
