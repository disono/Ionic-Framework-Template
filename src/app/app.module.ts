import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';

import {MyApp} from './app.component';
import {HomePage} from '../pages/home/home';

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {UserProvider} from "../providers/user";
import {AuthProvider} from "../providers/auth";
import {AuthSocialProvider} from "../providers/authSocial";
import {ApplicationProvider} from "../providers/application";
import {BaseProvider} from "../providers/base";
import {DrawerMenu} from "../pages/menu/drawer/drawer";
import {LoginPage} from "../pages/authentication/login/login";
import {RegisterPage} from "../pages/authentication/register/register";
import {RecoverPage} from "../pages/authentication/recovery/forgot";
import {AboutPage} from "../pages/page/about/about";
import {PrivacyPage} from "../pages/page/privacy/privacy";
import {ShowPage} from "../pages/page/show/show";
import {TermsPage} from "../pages/page/terms/terms";
import {VerifyPage} from "../pages/authentication/verify/verify";
import {GeneralSettingsPage} from "../pages/user/settings/general";
import {SecuritySettingsPage} from "../pages/user/settings/security";
import {SettingsTabPage} from "../pages/user/settings/settings.tab";
import {PageProvider} from "../providers/page";

@NgModule({
  declarations: [
    MyApp,
    HomePage,

    DrawerMenu,

    LoginPage,
    RegisterPage,
    RecoverPage,
    VerifyPage,

    AboutPage,
    PrivacyPage,
    ShowPage,
    TermsPage,

    SettingsTabPage,
    GeneralSettingsPage,
    SecuritySettingsPage,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,

    DrawerMenu,

    LoginPage,
    RegisterPage,
    RecoverPage,
    VerifyPage,

    AboutPage,
    PrivacyPage,
    ShowPage,
    TermsPage,

    SettingsTabPage,
    GeneralSettingsPage,
    SecuritySettingsPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,

    BaseProvider,
    AuthProvider,
    AuthSocialProvider,
    ApplicationProvider,
    UserProvider,

    PageProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {
}
