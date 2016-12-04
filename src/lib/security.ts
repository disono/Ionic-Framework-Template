declare let CryptoJS;

declare global {
  interface Date {
    addHours(hour: any): any;
    minusHours(hour: any): any;
  }
}

let _WBSecurity = (function () {
  return {
    jwt: function(secret, id) {
      let token = null;

      try {
        let header = {
          "alg": "HS256",
          "typ": "JWT"
        };
        let wordArrayHeader = CryptoJS.enc.Utf8.parse(JSON.stringify(header));
        let base64Header = CryptoJS.enc.Base64.stringify(wordArrayHeader);

        let dataIat = new Date();
        let dateNbf = dataIat;
        let dataExp = dataIat;

        let sub = id;
        let iat = parseInt((dataIat.getTime() / 1000).toFixed(0));
        let nbf = parseInt((dateNbf.minusHours(1).getTime() / 1000).toFixed(0));
        let exp = parseInt((dataExp.addHours(2).getTime() / 1000).toFixed(0));
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
