import {Injectable} from "@angular/core";
import {Http, Headers, RequestOptions} from "@angular/http";
import "rxjs/add/operator/map";
import "rxjs/Rx";
import {Observable} from "rxjs/Observable";
import {WBCONFIG} from "../lib/config";
import {WBHELPER} from "../lib/helper";
import {WBSecurity} from "../lib/security";
import {Auth} from "./auth";

/**
 * @author Archie Disono on 2016-05-08.
 * @url http://webmons.com
 * @license Apache 2.0
 */
@Injectable()
export class User {

  constructor(public http: Http, public auth: Auth) {
    this.http = http;
  }

  /**
   * User
   *
   * @param id
   * @returns {Promise<ErrorObservable>|Promise<T>}
   */
  show(id) {
    let url = WBCONFIG.server_url() + 'user/' + id;
    let user = this.auth.user();

    // headers
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + WBSecurity.jwt(user.secret_key, user.id),
      'token_key': user.token_key,
      'authenticated_id': user.id
    });

    let res_options = new RequestOptions({headers: headers});

    return this.http.get(url, res_options)
      .map(function (response) {
        if (response.status < 200 || response.status >= 300) {
          User._handleError('Bad response status: ' + response.status);
        }

        return response.json();
      })
      .catch(User._handleError);
  }

  /**
   * Handle errors
   *
   * @param error
   * @returns {ErrorObservable}
   */
  static _handleError(error) {
    if (error instanceof String || typeof error.json != 'function') {
      WBHELPER.errorMessage(error);

      return;
    }

    WBHELPER.errorMessage(error.json().errors);
    return Observable.throw(error.json().errors);
  }

}
