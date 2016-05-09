import {App, Platform} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {LoginPage} from './pages/login/login';

/**
 * @author Archie Disono on 2016-05-08.
 * @url http://webmons.com
 * @license Apache 2.0
 */

@App({
	template: '<ion-nav [root]="rootPage"></ion-nav>',
	config: {}
})
export class MyApp {
	static get parameters() {
		return [[Platform]];
	}

	constructor(platform) {
		this.rootPage = LoginPage;

		platform.ready().then(() => {
			// Okay, so the platform is ready and our plugins are available.
			// Here you can do any higher level native things you might need.
			StatusBar.styleDefault();
		});
	}
}
