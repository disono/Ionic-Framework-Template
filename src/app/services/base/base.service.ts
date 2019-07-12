/**
 * @author          Archie, Disono (webmonsph@gmail.com)
 * @link            https://webmons.com
 * @copyright       Archie Disono - Webmons Development Studio. (webmons.com), 2018
 * @license         Apache, 2.0 https://github.com/disono/Ionic-Framework-Template/blob/master/LICENSE
 */

import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {Configurations} from "../../../environments/config";
import {StorageHelper} from "../../disono/storage";
import {SecurityHelper} from "../../disono/security";
import {DateHelper} from "../../disono/date";

declare let device;

@Injectable({
    providedIn: 'root'
})
export class BaseService {
    private config = new Configurations();
    private storageHelper = new StorageHelper();
    private securityHelper = new SecurityHelper();
    private dateHelper = new DateHelper();

    constructor(private http: HttpClient) {

    }

    /**
     * Extract data
     *
     * @param response
     * @private
     */
    private static extractData(response) {
        return BaseService.handleError(response);
    }

    /**
     * Handle errors from server
     *
     * @param response
     * @private
     */
    private static handleError(response) {
        if (response.success === false) {
            throw throwError(response.errors);
        }

        return response;
    }

    /**
     * Critical errors
     *
     * @param error
     * @private
     */
    private static handle500Error(error: HttpErrorResponse) {
        return throwError(BaseService.extractErrors(error));
    }

    /**
     * Error formatting
     *
     * @param e
     * @private
     */
    private static extractErrors(e) {
        if (typeof e.error !== 'undefined') {
            return e.error.errors;
        }

        if (typeof e.name !== 'undefined' && typeof e.message !== 'undefined') {
            return e.name + ': ' + e.message;
        }

        return e;
    }

    /**
     * GET
     *
     * @param path
     * @param parameters
     * @param callback
     * @param absolutePath
     */
    get(path, parameters, callback, absolutePath = false): Observable<any> {
        let self = this;
        let url = (absolutePath) ? path : self.config.uri() + path;

        // parameters
        let params = new HttpParams();
        for (let key in parameters) {
            if (parameters.hasOwnProperty(key)) {
                let val = (parameters[key] === null) ? '' : parameters[key];
                params = params.append(key, val);
            }
        }

        return this.http
            .get(url, {
                headers: this.httpHeaders(),
                params: params
            })
            .pipe(
                map(function (response) {
                    let data = BaseService.extractData(response);
                    callback(data);
                    return data;
                }),
                catchError(BaseService.handle500Error)
            );
    }

    /**
     * POST
     *
     * @param path
     * @param parameters
     * @param callback
     * @param absolutePath
     */
    post(path, parameters, callback, absolutePath = false) {
        let self = this;
        let url = (absolutePath) ? path : self.config.uri() + path;

        return this.http
            .post(url, parameters, {
                headers: this.httpHeaders()
            })
            .pipe(
                map(function (response) {
                    let data = BaseService.extractData(response);
                    callback(data);
                    return data;
                }),
                catchError(BaseService.handle500Error)
            );
    }

    /**
     * UPLOAD
     *
     * Usage
     * Format:              {inputs: {}, files: single/multiple}
     * Single files:        {name: {val: file, filename: string}
     * Multiple files:      {name_1: [{val: file, filename: string}, {val: file, filename: string}],
     *                          name_2: [{val: file, filename: string}, {val: file, filename: string}]}
     *
     * @param path
     * @param parameters
     * @param callback
     * @param absolutePath
     */
    upload(path, parameters, callback, absolutePath = false) {
        let self = this;
        let url = (absolutePath) ? path : self.config.uri() + path;
        let headers = this.headerUpload();
        let formData = new FormData();

        // files to upload
        if (typeof parameters.files !== 'undefined' && parameters.files) {
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
                        if (files[key].val) {
                            formData.append(key, files[key].val, files[key].filename);
                        }
                    }
                }
            }
        }

        // other form inputs
        if (typeof parameters.inputs !== 'undefined' && parameters.inputs) {

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
            .pipe(
                map(function (response) {
                    let data = BaseService.extractData(response);
                    callback(data);
                    return data;
                }),
                catchError(BaseService.handle500Error)
            );
    }

    /**
     * Authenticated user
     */
    private me() {
        return this.storageHelper.fetch('user', true);
    }

    /**
     * Headers (Guest and Auth)
     *
     * @private
     */
    private httpHeaders() {
        let me = this.me();
        if (me) {
            return this.authHeaders(me);
        }

        return this.guestHeaders();
    }

    /**
     * Upload Headers
     *
     * @private
     */
    private headerUpload() {
        let me = this.me();
        if (!me) {
            return new HttpHeaders();
        }

        return new HttpHeaders()
            .append("Accept", "application/json")
            .append('Authorization', "Bearer " + this.securityHelper.token())
            .append('source', 'mobile')
            .append('app-name', this.appName())
            .append('tkey', String(me.token.key))
            .append('uid', String(me.id))
            .append('dtm', this.dateHelper.getTimezone())
            .append('did', (typeof device !== 'undefined') ? device.uuid : '');
    }

    /**
     * Authenticated Headers
     *
     * @private
     */
    private authHeaders(me) {
        if (!me) {
            return this.guestHeaders();
        }

        if (!me.token) {
            return this.guestHeaders();
        }

        return new HttpHeaders()
            .append('Content-Type', 'application/json')
            .append('Authorization', "Bearer " + this.securityHelper.token())
            .append('source', 'mobile')
            .append('app-name', this.appName())
            .append('tkey', String(me.token.key))
            .append('uid', String(me.id))
            .append('dtm', this.dateHelper.getTimezone())
            .append('did', (typeof device !== 'undefined') ? device.uuid : '');
    }

    /**
     * Guest headers
     *
     * @private
     */
    private guestHeaders() {
        return new HttpHeaders()
            .append('Content-Type', 'application/json')
            .append('dtm', this.dateHelper.getTimezone())
            .append('did', (typeof device !== 'undefined') ? device.uuid : '');
    }

    private appName() {
        let settings = this.storageHelper.fetch('settings', true);
        return settings ? settings.socketIOAppName.value : '';
    }
}
