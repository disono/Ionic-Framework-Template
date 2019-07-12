import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {PageService} from "../../../services/page/page.service";

@Component({
    selector: 'app-page-details',
    templateUrl: './page-details.page.html',
    styleUrls: ['./page-details.page.scss'],
})
export class PageDetailsPage implements OnInit {
    private title = 'Page Details';
    private content = null;

    constructor(
        private activatedRoute: ActivatedRoute,
        private pageService: PageService
    ) {

    }

    ngOnInit() {

    }

    ionViewDidEnter() {
        this.fetchDetails(this.activatedRoute.snapshot.paramMap.get('slug'))
    }

    fetchDetails(slug) {
        let self = this;
        self.pageService.details(slug).subscribe(response => {
            self.title = response.data.name;
            self.content = response.data.content;
        }, e => {

        });
    }

}
