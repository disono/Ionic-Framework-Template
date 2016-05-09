import {Page, NavController} from 'ionic-angular';
import {LoginPage} from './../../pages/login/login';

/**
 * @author Archie Disono on 2016-05-08.
 * @url http://webmons.com
 * @license Apache 2.0
 */

/*
 Generated class for the HomePage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Page({
	templateUrl: 'build/pages/home/home.html'
})
export class HomePage {
	static get parameters() {
		return [[NavController]];
	}

	constructor(nav) {
		this.nav = nav;

		this.nav.setRoot(LoginPage);
	}
}
