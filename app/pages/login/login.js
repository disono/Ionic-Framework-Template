import {Page, NavController, Alert, Loading} from 'ionic-angular';
import {FormBuilder, Validators} from 'angular2/common';
import {HomePage} from '../home/home';
import {RegisterPage} from '../register/register';
import {Auth} from '../../providers/auth/auth';

/**
 * @author Archie Disono on 2016-05-08.
 * @url http://webmons.com
 * @license Apache 2.0
 */
@Page({
    templateUrl: 'build/pages/login/login.html',
    providers: [
        Auth
    ]
})
export class LoginPage {
    static get parameters() {
        return [[NavController], [FormBuilder], [Auth]];
    }

    constructor(nav, fb, auth) {
        var thisApp = this;
        thisApp.nav = nav;
        thisApp.auth = auth;

        // form values
        thisApp.loginForm = fb.group({
            email: ["", Validators.required],
            password: ["", Validators.required]
        });
    }

    doLogin(event) {
        var thisApp = this;
        var value = thisApp.loginForm.value;
        var nav = thisApp.nav;
        event.preventDefault();

        // check for values
        if (!value.email || !value.password) {
            thisApp.doAlert('Required Inputs', 'User and password is required.');
            return;
        }

        // login
        thisApp.loadingData = Loading.create({
            content: 'Authenticating...'
        });
        thisApp.nav.present(thisApp.loadingData);

        thisApp.auth.login({
            parameters: value
        }).subscribe(function (res) {
            thisApp.loadingData.dismiss();

            setTimeout(function () {
                if (res.role == 'client') {
                    nav.rootNav.setRoot(HomePage);
                }
            }, 800);
        }, function (e) {
            thisApp.doAlert('Error', 'Invalid email or password.');

            setTimeout(function () {
                thisApp.loadingData.dismiss();
            }, 800);
        });
    }

    goToRegister() {
        this.nav.push(RegisterPage);
    }

    doAlert(title, message) {
        let alert = Alert.create({
            title: title,
            message: message,
            buttons: ['Ok']
        });
        this.nav.present(alert);
    }
}
