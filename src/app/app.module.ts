import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {FCM} from '@ionic-native/fcm/ngx';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common'

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';

import {BaseService} from "./services/base/base.service";
import {AuthGuardService} from "./services/auth/auth.guard.service";
import {AuthSocialService} from "./services/auth/auth.social.service";
import {SettingsService} from "./services/app/settings.service";
import {PageService} from "./services/page/page.service";

import {Configurations} from "../environments/config";
import {StorageHelper} from "./disono/storage";
import {FileHelper} from "./disono/file";
import {NavigatorHelper} from "./disono/navigator";
import {SecurityHelper} from "./disono/security";
import {DateHelper} from "./disono/date";
import {FormHelper} from "./disono/form";
import {ViewHelper} from "./disono/view";
import {ListenerHelper} from "./disono/listener";
import {SocketHelper} from "./socket/socket";

import {LoginPage} from "./pages/auth/login/login.page";
import {ForgotPage} from "./pages/auth/forgot/forgot.page";
import {RegisterPage} from "./pages/auth/register/register.page";
import {TabPage} from "./pages/user/settings/tab/tab.page";

@NgModule({
    declarations: [
        AppComponent,
        LoginPage, ForgotPage, RegisterPage,
        TabPage,
    ],
    imports: [
        BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule,
        CommonModule,
        FormsModule, ReactiveFormsModule
    ],
    providers: [
        StatusBar,
        SplashScreen,
        FCM,
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},

        Configurations,
        StorageHelper,
        FileHelper,
        NavigatorHelper,
        SecurityHelper,
        DateHelper,
        FormHelper,
        ViewHelper,
        ListenerHelper,
        SocketHelper,

        BaseService,
        SettingsService,
        AuthGuardService,
        AuthSocialService,
        PageService,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {

}
