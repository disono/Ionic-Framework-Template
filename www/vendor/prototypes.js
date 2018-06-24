/**
 * @author 		Archie, Disono (webmonsph@gmail.com)
 * @url 		https://github.com/disono/Ionic-Framework-Template
 * @copyright 	Webmons Development Studio. (webmons.com), 2016-2018
 * @license 	Apache, 2.0 https://github.com/disono/Ionic-Framework-Template/blob/master/LICENSE
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
