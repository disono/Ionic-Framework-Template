/**
 * @description Security helpers
 * @file security.ts
 *
 * @author Archie Disono
 * @url https://github.com/disono/Ionic-Framework-Template
 * @license Apache 2.0
 */
"use strict";
var _WBSecurity = (function () {
  return {
    jwt: function (secret, id) {
      var token = null;
      var current = new Date();
      current.setMinutes(current.getMinutes() - 15);
      if (!secret) {
        console.error('JWT Token is null: ' + secret);
        return null;
      }
      try {
        var header = {
          "alg": "HS256",
          "typ": "JWT"
        };
        var wordArrayHeader = CryptoJS.enc.Utf8.parse(JSON.stringify(header));
        var base64Header = CryptoJS.enc.Base64.stringify(wordArrayHeader);
        var dataIat = current;
        var dateNbf = current;
        var dataExp = current;
        var sub = id;
        var iat = Math.floor(dataIat.getTime() / 1000);
        var nbf = Math.floor(dateNbf.minusHours(1).getTime() / 1000);
        var exp = Math.floor(dataExp.addHours(2).getTime() / 1000);
        var jti = CryptoJS.MD5("jti." + sub + "." + iat);
        var payload = {
          "sub": sub,
          "iat": iat,
          "exp": exp,
          "nbf": nbf,
          "jti": jti
        };
        var wordArrayPayload = CryptoJS.enc.Utf8.parse(JSON.stringify(payload));
        var base64Payload = CryptoJS.enc.Base64.stringify(wordArrayPayload);
        var signature = CryptoJS.HmacSHA256(base64Header + "." + base64Payload, secret);
        var base64Sign = CryptoJS.enc.Base64.stringify(signature);
        token = base64Header + "." + base64Payload + "." + base64Sign;
      }
      catch (e) {
        console.error(e);
      }
      console.log(token);
      return token;
    }
  };
}());
exports.WBSecurity = _WBSecurity;
