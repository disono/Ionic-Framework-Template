import {Injectable} from "@angular/core";
import {Http, URLSearchParams} from "@angular/http";
import "rxjs/add/operator/map";
import "rxjs/Rx";
import {Observable} from "rxjs/Observable";
import {WBCONFIG} from "./../../lib/config";
import {WBHELPER} from "./../../lib/helpers";

/**
 * @author Archie Disono on 2016-05-08.
 * @url http://webmons.com
 * @license Apache 2.0
 */
@Injectable()
export class User {
  constructor(private http: Http) {
    this.http = http;
  }

  get(id) {
    var url = WBCONFIG.server_url() + 'user/' + id;
    var parameters = new URLSearchParams();

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
    WBHELPER.errorMessage(error.json().errors);
    return Observable.throw(error.json().errors || 'Server error.');
  }
}
