import {Injectable} from 'angular2/core';
import {Http, URLSearchParams} from 'angular2/http';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';
import {WBCONFIG} from './../../lib/config';
import {WBHELPER} from './../../lib/helpers';

/**
 * @author Archie Disono on 2016-05-08.
 * @url http://webmons.com
 * @license Apache 2.0
 */
@Injectable()
export class User {
  static get parameters() {
    return [[Http]]
  }

  constructor(http) {
    this.http = http;
  }

  get(id) {
    var url = WBCONFIG.server_url() + '';
    var parameters = new URLSearchParams();
    parameters.set('id', id);

    return this.http.get(url, {
          search: parameters
        })
        .map(function (response) {
          if (response.status < 200 || response.status >= 300) {
            throw new Error('Bad response status: ' + response.status);
          }

          var data = response.json();
          WBHELPER.setItem('user', data.data, true);

          return data;
        })
        .catch(this._handleError);
  }

  _handleError(error) {
    return Observable.throw(error.json().error || 'Server error.');
  }
}