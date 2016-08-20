import {Page, NavController, Alert, Loading} from 'ionic-angular';
import {FormBuilder, Validators} from 'angular2/common';
import {LoginPage} from '../login/login';
import {Auth} from '../../providers/auth/auth';

/**
 * @author Archie Disono on 2016-05-08.
 * @url http://webmons.com
 * @license Apache 2.0
 */
@Page({
    templateUrl: 'build/pages/register/register.html',
    providers: [
        Auth
    ]
})
export class RegisterPage {
    static get parameters() {
        return [[NavController], [FormBuilder], [Auth]];
    }

    constructor(nav, fb, auth) {
        var thisApp = this;
        thisApp.nav = nav;
        thisApp.auth = auth;

        // form values
        thisApp.registerForm = fb.group({
            first_name: ["", Validators.required],
            last_name: ["", Validators.required],
            username: ["", Validators.required],
            phone: ["", Validators.required],
            email: ["", Validators.required],
            password: ["", Validators.required]
        });
    }

    doRegister(event) {
        var thisApp = this;
        var value = thisApp.registerForm.value;
        event.preventDefault();

        // check for values
        if (!value.email || !value.password) {
            thisApp.doAlert('Required Inputs', 'Please fill all the required fields.');
            return;
        }

        // register
        thisApp.loadingData = Loading.create({
            content: 'Creating profile...'
        });
        thisApp.nav.present(thisApp.loadingData);

        thisApp.auth.register({
            parameters: value
        }).subscribe(function (res) {
            thisApp.loadingData.dismiss();

            setTimeout(function () {
                thisApp.goToLogin();
            }, 800);
        }, function (e) {
            setTimeout(function () {
                thisApp.loadingData.dismiss();
            }, 800);
        });
    }

    goToLogin() {
        this.nav.push(LoginPage);
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
