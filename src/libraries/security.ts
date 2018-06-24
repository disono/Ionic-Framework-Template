/**
 * @author          Archie, Disono (webmonsph@gmail.com)
 * @link            https://webmons.com
 * @copyright       Webmons Development Studio. (webmons.com), 2018
 * @license         Apache, 2.0 https://github.com/disono/Ionic-Framework-Template/blob/master/LICENSE
 */

import {WBHelper} from "./helper";

declare let CryptoJS;
declare let WBDateTimeDiff;
declare let moment;

declare global {
  interface Date {
    addHours(hour: any): any;

    minusHours(hour: any): any;
  }
}

let _WBSecurity = (function () {
  return {
    /**
     * Create JWT
     *
     * @param secret
     * @param id
     * @param current_time
     *
     * @returns {any}
     */
    jwt: function (secret, id, current_time) {
      let token = null;
      let current = moment(new Date(current_time)).toDate();

      if (!secret) {
        return null;
      }

      try {
        let header = {
          "alg": "HS256",
          "typ": "JWT"
        };
        let wordArrayHeader = CryptoJS.enc.Utf8.parse(JSON.stringify(header));
        let base64Header = CryptoJS.enc.Base64.stringify(wordArrayHeader);

        let dataIat = current;
        let dateNbf = current;
        let dataExp = current;

        let sub = id;
        let iat = Math.floor(dataIat.getTime() / 1000);
        let nbf = Math.floor(dateNbf.minusHours(1).getTime() / 1000);
        let exp = Math.floor(dataExp.addHours(2).getTime() / 1000);
        let jti = CryptoJS.MD5("jti." + sub + "." + iat);

        let payload = {
          // This holds the identifier for the token (defaults to user id)
          "sub": sub,
          // When the token was issued (unix timestamp)
          "iat": iat,
          // The token expiry date (unix timestamp)
          "exp": exp,
          // The earliest point in time that the token can be used (unix timestamp)
          "nbf": nbf,
          // A unique identifier for the token (md5 of the sub and iat claims)
          "jti": jti
        };
        let wordArrayPayload = CryptoJS.enc.Utf8.parse(JSON.stringify(payload));
        let base64Payload = CryptoJS.enc.Base64.stringify(wordArrayPayload);

        let signature = CryptoJS.HmacSHA256(base64Header + "." + base64Payload, secret);
        let base64Sign = CryptoJS.enc.Base64.stringify(signature);
        token = base64Header + "." + base64Payload + "." + base64Sign;
      } catch (e) {
        WBHelper.error(e);
      }

      return token;
    },

    /**
     * JWT auth
     *
     * @returns {any}
     */
    jwtAuth: function () {
      let auth = WBHelper.getItem('user', true);
      return (auth) ? _WBSecurity.jwt(auth.token.secret, auth.id, _WBSecurity.getDateTimeDiff(auth.jwt_server_difference)) : null;
    },

    /**
     * Server time difference on seconds
     *
     * @param sqlServerTime
     *
     * @returns {number}
     */
    getSecondsDiff: function (sqlServerTime) {
      return WBDateTimeDiff(sqlServerTime);
    },

    /**
     * Get the datetime difference
     *
     * @param seconds
     *
     * @returns {Date}
     */
    getDateTimeDiff: function (seconds) {
      let current_time = new Date();

      seconds = parseInt(seconds);
      if (seconds > 0) {
        // add seconds
        current_time = new Date(current_time.setSeconds(current_time.getSeconds() - seconds))
      } else {
        // subtract seconds
        current_time = new Date(current_time.setSeconds(current_time.getSeconds() + Math.abs(seconds)));
      }

      return current_time;
    },

    /**
     * Save auth
     *
     * @param newAuth
     */
    saveAuth: function (newAuth) {

      // let's check if old data is present
      // we must retain the tokens then save it
      let currentAuth = WBHelper.getItem('user', true);
      if (currentAuth) {
        newAuth.token = currentAuth.token;
        newAuth.server_timestamp = currentAuth.server_timestamp;
        newAuth.jwt_server_difference = _WBSecurity.getSecondsDiff(newAuth.server_timestamp);
      } else {
        // server time difference in seconds
        // refresh data if old auth is not available
        newAuth.jwt_server_difference = _WBSecurity.getSecondsDiff(newAuth.server_timestamp);
      }

      // save
      WBHelper.setItem('user', newAuth, true);
    }
  };
}());

export let WBSecurity = _WBSecurity;
