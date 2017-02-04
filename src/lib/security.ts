/**
 * @description Security helpers
 * @file security.ts
 *
 * @author Archie Disono
 * @url https://github.com/disono/Ionic-Framework-Template
 * @license Apache 2.0
 */

declare let CryptoJS;

declare global {
  interface Date {
    addHours(hour: any): any;
    minusHours(hour: any): any;
  }
}

let _WBSecurity = (function () {
  return {
    jwt: function (secret, id) {
      let token = null;
      let current = new Date();
      current.setMinutes(current.getMinutes() - 15);

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
          "sub": sub,
          "iat": iat,
          "exp": exp,
          "nbf": nbf,
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
    }
  };
}());

export let WBSecurity = _WBSecurity;
