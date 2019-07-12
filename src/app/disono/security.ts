/**
 * @author          Archie, Disono (webmonsph@gmail.com)
 * @link            https://webmons.com
 * @copyright       Archie Disono - Webmons Development Studio. (webmons.com), 2018
 * @license         Apache, 2.0 https://github.com/disono/Ionic-Framework-Template/blob/master/LICENSE
 */

import Base64 from "crypto-js/enc-base64";
import Utf8 from "crypto-js/enc-utf8";
import MD5 from "crypto-js/md5";
import HmacSHA256 from 'crypto-js/hmac-sha256';
import * as moment from 'moment';

import './extend.prototypes';
import {StorageHelper} from "./storage";

export class SecurityHelper {
    private storageHelper = new StorageHelper();

    constructor() {

    }

    /**
     * Encode JWT
     *
     * @param tokenLog
     * @param id
     */
    public encodeJWT(tokenLog, id) {
        if (!tokenLog) {
            return null;
        }

        let self = this;
        let token = null;
        const current = new Date();

        try {
            const header = {
                "alg": "HS256",
                "typ": "JWT"
            };

            const wordArrayHeader = Utf8.parse(JSON.stringify(header));
            const base64Header = self.base64URL(wordArrayHeader);

            const dataIat = moment(current);
            const dateNbf = moment(current);
            const dataExp = moment(current);

            const iss = id;
            const sub = 'uid';
            const iat = dataIat.unix();
            const nbf = dateNbf.subtract(5, 'minutes').unix();
            const exp = dataExp.add(5, 'minutes').unix();
            const jti = MD5("jti." + iss + "." + sub + "." + iat + "." + tokenLog.token).toString();

            const payload = {
                // The issuer of the token
                "iss": iss,
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

            const wordArrayPayload = Utf8.parse(JSON.stringify(payload));
            const base64Payload = self.base64URL(wordArrayPayload);

            const signature = HmacSHA256(base64Header + "." + base64Payload, tokenLog.secret);
            const base64Sign = self.base64URL(signature);
            token = base64Header + "." + base64Payload + "." + base64Sign;
        } catch (e) {

        }

        return token;
    }

    public token() {
        let auth = this.storageHelper.fetch('user', true);
        return (auth) ? this.encodeJWT(auth.token, auth.id) : null;
    }

    public saveAuth(newAuth) {
        // let's check if old data is present
        // we must retain the tokens then save it
        let currentAuth = this.storageHelper.fetch('user', true);
        if (currentAuth) {
            newAuth.token = currentAuth.token;
            newAuth.server_timestamp = currentAuth.server_timestamp;
        }

        // save
        this.storageHelper.set('user', newAuth, true);
    }

    public base64URL(source) {
        // Encode in classical base64
        let encodedSource = Base64.stringify(source);

        // Remove padding equal characters
        encodedSource = encodedSource.replace(/=+$/, '');

        // Replace characters according to base64url specifications
        encodedSource = encodedSource.replace(/\+/g, '-');
        encodedSource = encodedSource.replace(/\//g, '_');

        return encodedSource;
    }
}