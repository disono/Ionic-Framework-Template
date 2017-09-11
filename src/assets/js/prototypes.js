/**
 * @author Archie, Disono (webmonsph@gmail.com)
 * @git https://github.com/disono/Ionic-Framework-Template
 * @copyright Webmons Development Studio. (webmons.com), 2016-2017
 * @license Apache, 2.0 https://github.com/disono/Ionic-Framework-Template/blob/master/LICENSE
 */

// jQuery compatibility
var jQ = jQuery.noConflict();

// add hours
Date.prototype.addHours = function (h) {
  this.setTime(this.getTime() + (h * 60 * 60 * 1000));
  return this;
};

// minus hours
Date.prototype.minusHours = function (h) {
  this.setTime(this.getTime() - (h * 60 * 60 * 1000));
  return this;
};

// datetime difference
var WBDateTimeDiff = function (sqlServerTime) {
  // let's use the server server_timestamp
  var server_time = new Date(WBSQLDateToJS(sqlServerTime));
  var current_time = new Date();

  // let's check the difference on date-time(seconds)
  // between our phone and server date-time
  // cast string to number +your_string
  return parseInt((current_time - server_time) / 1000);
};

/**
 * SQL date-time to JS date-time
 *
 * @param sqlDate
 * @returns {Date}
 */
var WBSQLDateToJS = function (sqlDate) {
  return new Date(Date.parse(sqlDate.replace(/-/g, "/")));
};

/**
 * Upload
 *
 * @param url
 * @param me
 * @param jwt
 * @param app_provider
 * @param parameters
 * @param successCallback
 * @param errorCallback
 * @constructor
 */
var WBUpload = function (url, me, jwt, app_provider, parameters, successCallback, errorCallback) {
  var xhr = new XMLHttpRequest();
  var formData = new FormData();

  // open the connection.
  xhr.open('POST', url, true);

  // files to upload
  if (parameters.files) {
    jQ.each(parameters.files, function (i, val) {
      if (Array.isArray(val)) {
        // multiple files upload
        for (var num = 0; num < val.length; num++) {
          formData.append(i + '[]', val[num]);
        }
      } else {
        // single upload
        formData.append(i, val);
      }
    });
  }

  // inputs
  if (parameters.inputs) {
    jQ.each(parameters.inputs, function (i, val) {
      formData.append(i, val);
    });
  }

  // load to server
  // set up a handler for when the request finishes.
  xhr.onload = function () {
    var response = this.response;

    if (response) {
      var res = JSON.parse(response);

      if (res.success) {
        successCallback(res);
      } else {
        errorCallback(res);
        app_provider._handleError(res.errors);
      }
    }
  };

  if (me) {
    // add headers for JWT token
    xhr.setRequestHeader("Authorization", "Bearer " + jwt);
    xhr.setRequestHeader("token_key", me.token_key);
    xhr.setRequestHeader("authenticated_id", me.id);
  }

  // send the data.
  xhr.send(formData);
};
