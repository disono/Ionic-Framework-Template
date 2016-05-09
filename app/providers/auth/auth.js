import {Injectable} from 'angular2/core';
import {Http, URLSearchParams, Headers, RequestOptions} from 'angular2/http';
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

/*
 Generated class for the Auth provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class Auth {
	static get parameters() {
		return [[Http]]
	}

	constructor(http) {
		this.http = http;
	}

	login(options) {
		var url = WBCONFIG.server_url() + 'auth/login';
		var parameters = new URLSearchParams();
		jQ.each(options.parameters, function (i, val) {
			parameters.set(i, val);
		});

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

	register(options) {
		var url = WBCONFIG.server_url() + 'auth/register';
		let body = JSON.stringify(options.parameters);
		let headers = new Headers({'Content-Type': 'application/json'});
		let res_options = new RequestOptions({headers: headers});

		return this.http.post(url, body, res_options)
			.map(function (response) {
				if (response.status < 200 || response.status >= 300) {
					throw new Error('Bad response status: ' + response.status);
				}

				return response.json();
			})
			.catch(this._handleError);
	}

	update(options, callback) {
		var url = WBCONFIG.server_url() + 'user/update';
		var inputs = options.parameters;

		if (!options.parameters || !inputs.id || !inputs.first_name || !inputs.last_name || !inputs.email || !inputs.phone || isNaN(inputs.phone)) {
			throw new Error('Please fill all the required inputs.');
		}

		// create a new FormData object.
		var formData = new FormData();

		// files
		if (inputs.image) {
			var file = inputs.image.files[0];
			formData.append('image', file);
		}
		formData.append('first_name', inputs.first_name);
		formData.append('last_name', inputs.last_name);
		formData.append('email', inputs.email);
		formData.append('phone', inputs.phone);
		formData.append('id', inputs.id);

		// set up the request.
		var xhr = new XMLHttpRequest();
		// open the connection.
		xhr.open('POST', url, true);

		// set up a handler for when the request finishes.
		xhr.onload = function () {
			// success
			callback(xhr);
		};

		// send the data.
		xhr.send(formData);
	}

	check() {
		return (WBHELPER.getItem('user', false)) ? true : false;
	}

	user() {
		return WBHELPER.getItem('user', true);
	}

	_handleError(error) {
		return Observable.throw(error.json().error || 'Server error.');
	}
}