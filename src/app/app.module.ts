import {NgModule, ErrorHandler} from "@angular/core";
import {IonicApp, IonicModule, IonicErrorHandler} from "ionic-angular";
import {MyApp} from "./app.component";
import {LoginPage} from "../pages/authentication/login";
import {RegisterPage} from "../pages/authentication/register";
import {ForgotPage} from "../pages/authentication/forgot";
import {DrawerPage} from "../pages/drawer/drawer";
import {HomePage} from "../pages/home/home";
import {SettingsTabPage} from "../pages/settings/settings-tab";
import {GeneralPage} from "../pages/settings/general";
import {SecurityPage} from "../pages/settings/security";
import {AboutPage} from "../pages/about/about";
import {ContactPage} from "../pages/contact/contact";
import {AppProvider} from "../providers/app-provider";
import {Auth} from "../providers/auth";
import {User} from "../providers/user";

@NgModule({
  declarations: [
    MyApp,

    LoginPage,
    RegisterPage,
    ForgotPage,

    SettingsTabPage,
    GeneralPage,
    SecurityPage,

    DrawerPage,

    HomePage,
    AboutPage,
    ContactPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,

    LoginPage,
    RegisterPage,
    ForgotPage,

    SettingsTabPage,
    GeneralPage,
    SecurityPage,

    DrawerPage,

    HomePage,
    AboutPage,
    ContactPage
  ],
  providers: [
    AppProvider,
    Auth,
    User,

    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {
}
