import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {TabPage} from './tab.page';

const routes: Routes = [
    {
        path: '',
        component: TabPage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
    ],
    declarations: [TabPage]
})
export class TabRoutingModule {
}
