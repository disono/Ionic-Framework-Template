import {Component, OnInit} from '@angular/core';
import {Events} from "@ionic/angular";

@Component({
    selector: 'app-tab',
    templateUrl: './tab.page.html',
    styleUrls: ['./tab.page.scss'],
})
export class TabPage implements OnInit {

    constructor(private events: Events) {

    }

    ngOnInit() {

    }

    ionViewDidLeave() {
        this.events.publish('tabSettingLeave', true);
    }

}
