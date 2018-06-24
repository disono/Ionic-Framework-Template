/**
 * @author          Archie, Disono (webmonsph@gmail.com)
 * @link            https://webmons.com
 * @copyright       Webmons Development Studio. (webmons.com), 2018
 * @license         Apache, 2.0 https://github.com/disono/Ionic-Framework-Template/blob/master/LICENSE
 */

import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import 'rxjs/Rx';
import {WBHelper} from "../libraries/helper";
import {WBConfig} from "../config";
import {WBSecurity} from "../libraries/security";

@Injectable()
export class BaseProvider {

  constructor(public http: HttpClient) {
    console.log('Base Provider');
  }

  /**
   * Authenticated user
   *
   * @returns {string}
   */
  static me() {
    return WBHelper.getItem('user', true);
  }

  /**
   * Error
   *
   * @param response
   * @returns {any}
   * @private
   */
  static _handleError(response) {
    if (response.success === false) {
      throw Observable.throw(response.errors);
    }

    return response;
  }


  /**
   * 500 error
   *
   * @param e
   * @private
   */
  static _handle500Error(e) {
    return Observable.throw(BaseProvider._extractErrors(e));
  }

  /**
   * Extract error messages
   *
   * @param e
   * @returns {string}
   * @private
   */
  static _extractErrors(e) {
    return (e.error) ? ((e.error.errors) ? e.error.errors : (e.name + ': ' + e.message)) : e;
  }

  /**
   * Headers for upload
   *
   * @returns {HttpHeaders}
   */
  headerUpload() {
    let me = BaseProvider.me();
    if (!me) {
      return new HttpHeaders();
    }

    return new HttpHeaders()
      .append('Authorization', "Bearer " + String(WBSecurity.jwtAuth()))
      .append('token_key', String(me.token.key))
      .append('authenticated_id', String(me.id));
  }

  /**
   * HttpHeaders for authenticated
   *
   * @returns {HttpHeaders}
   */
  headersAuth() {
    let me = BaseProvider.me();
    if (!me) {
      return this.headersGuest();
    }

    if (!me.token) {
      return this.headersGuest();
    }

    return new HttpHeaders()
      .append('Content-Type', 'application/json')
      .append('Authorization', "Bearer " + String(WBSecurity.jwtAuth()))
      .append('token_key', String(me.token.key))
      .append('authenticated_id', String(me.id));
  }

  /**
   * HttpHeaders for guest
   *
   * @returns {HttpHeaders}
   */
  headersGuest() {
    return new HttpHeaders()
      .append('Content-Type', 'application/json');
  }

  /**
   * GET
   *
   * @param uri
   * @param parameters
   * @param callbackSuccess
   * @returns {Promise<T | ErrorObservable>}
   */
  get(uri, parameters, callbackSuccess) {
    let url = WBConfig.url() + uri;
    let headers = this.headersAuth();

    // parameters
    let params = new HttpParams();
    for (let key in parameters) {
      if (parameters.hasOwnProperty(key)) {
        let _val = (parameters[key] === null) ? '' : parameters[key];
        params = params.append(key, _val);
      }
    }

    return this.http
      .get(url, {
        headers: headers,
        params: params
      })
      .map(function (response) {
        let _response = BaseProvider._handleError(response);

        callbackSuccess(_response);
        return _response;
      })
      .catch(BaseProvider._handle500Error);
  }

  /**
   * POST
   *
   * @param uri
   * @param parameters
   * @param callbackSuccess
   * @returns {Promise<T | ErrorObservable>}
   */
  post(uri, parameters, callbackSuccess) {
    let url = WBConfig.url() + uri;
    let headers = this.headersAuth();

    return this.http
      .post(url, parameters, {
        headers: headers
      })
      .map(function (response) {
        let _response = BaseProvider._handleError(response);

        callbackSuccess(_response);
        return _response;
      })
      .catch(BaseProvider._handle500Error);
  }

  /**
   * Upload
   *
   * Single files: {name: {val: file, filename: string}
   * Multiple files: {name_1: [{val: file, filename: string}, {val: file, filename: string}], name_2: [{val: file, filename: string}, {val: file, filename: string}]}
   *
   * @param uri
   * @param parameters
   * @param callbackSuccess
   */
  upload(uri, parameters, callbackSuccess) {
    let url = WBConfig.url() + uri;
    let headers = this.headerUpload();
    let formData = new FormData();

    // files to upload
    if (parameters.files) {
      let files = parameters.files;

      for (let key in files) {
        if (files.hasOwnProperty(key)) {
          if (Array.isArray(files[key])) {
            // multiple files upload
            for (let num = 0; num < files[key].length; num++) {
              // make has values
              if (files[key][num].val) {
                formData.append(key + '[]', files[key][num].val, files[key][num].filename);
              }
            }
          } else {
            // single upload
            if (files[key]) {
              formData.append(key, files[key].val, files[key].filename);
            }
          }
        }
      }
    }

    // other form inputs
    if (parameters.inputs) {
      for (let key in parameters.inputs) {
        if (parameters.inputs.hasOwnProperty(key)) {
          formData.append(key, parameters.inputs[key]);
        }
      }
    }

    return this.http
      .post(url, formData, {
        headers: headers
      })
      .map(function (response) {
        let res = BaseProvider._handleError(response);

        callbackSuccess(res);
        return res;
      })
      .catch(BaseProvider._handle500Error);
  }

}
