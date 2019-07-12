import {Component, OnInit} from '@angular/core';
import {Events} from "@ionic/angular";

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.page.html',
    styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

    constructor(private events: Events) {

    }

    ngOnInit() {

    }

    ionViewDidEnter() {
        this.events.publish('eventShowMenu', true);
    }

}
