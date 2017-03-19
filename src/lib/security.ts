import {WBHelper} from "./helper";
/**
 * @description Security helpers
 * @file security.ts
 *
 * @author Archie Disono
 * @url https://github.com/disono/Ionic-Framework-Template
 * @license Apache 2.0
 */

declare let CryptoJS;
declare let WBDateTimeDiff;

declare global {
  interface Date {
    addHours(hour: any): any;
    minusHours(hour: any): any;
  }
}

let _WBSecurity = (function () {
  return {
    jwt: function (secret, id, current_time) {
      let token = null;
      // minus 5 minutes
      let current = new Date(current_time.getTime() - 5 * 60000);

      if (!secret) {
        console.error('JWT Token is null: ' + secret);
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
        console.error(e);
      }

      console.log(token);
      return token;
    },

    /**
     * JWT auth
     *
     * @returns {any}
     */
    jwtAuth: function () {
      let auth = WBHelper.getItem('user', true);
      if (!auth) {
        console.log('Not authenticated.');
        return null;
      }

      console.log('Auth Timestamp: ' + auth.jwt_server_difference);
      return _WBSecurity.jwt(auth.secret_key, auth.id, _WBSecurity.getDateTimeDiff(auth.jwt_server_difference));
    },

    /**
     * Server time difference on seconds
     *
     * @param sqlServerTime
     * @returns {number}
     */
    getSecondsDiff: function (sqlServerTime) {
      return WBDateTimeDiff(sqlServerTime);
    },

    /**
     * Get the datetime difference
     *
     * @param seconds
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
     * @param user_data
     */
    saveAuth: function (user_data) {
      // let's check if old data is present
      // we must retain the tokens then save it
      let oldAuth = WBHelper.getItem('user', true);
      if (oldAuth) {
        user_data.secret_key = oldAuth.secret_key;
        user_data.token_key = oldAuth.token_key;
        user_data.server_timestamp = oldAuth.server_timestamp;
        user_data.jwt_server_difference = oldAuth.jwt_server_difference;
      } else {
        // server time difference in seconds
        // refresh data if old auth is not available
        user_data.jwt_server_difference = _WBSecurity.getSecondsDiff(user_data.server_timestamp);
      }

      // save
      WBHelper.setItem('user', user_data, true);
    }
  };
}());

export let WBSecurity = _WBSecurity;
