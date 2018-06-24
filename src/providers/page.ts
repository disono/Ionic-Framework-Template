/**
 * @author          Archie, Disono (webmonsph@gmail.com)
 * @link            https://webmons.com
 * @copyright       Webmons Development Studio. (webmons.com), 2018
 * @license         Apache, 2.0 https://github.com/disono/Ionic-Framework-Template/blob/master/LICENSE
 */

import {Injectable} from '@angular/core';
import {WBHelper} from "../libraries/helper";
import {BaseProvider} from "./base";

@Injectable()
export class PageProvider {

  constructor(private base: BaseProvider) {
    WBHelper.log('Page Provider');
  }

  show(slug) {
    return this.base.get('p/' + slug, null, function (res) {
      WBHelper.log('Page-show: ' + res);
    });
  }

}
