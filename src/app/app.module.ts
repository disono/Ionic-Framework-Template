import {NgModule} from "@angular/core";
import {IonicApp, IonicModule} from "ionic-angular";
import {MyApp} from "./app.component";
import {DrawerPage} from "../pages/drawer/drawer";
import {HomePage} from "../pages/home/home";
import {AboutPage} from "../pages/about/about";
import {ContactPage} from "../pages/contact/contact";
import {SettingsTabPage} from "../pages/settings/settings-tab";
import {SecurityPage} from "../pages/settings/security";
import {GeneralPage} from "../pages/settings/general";
import {Auth} from "../providers/auth";
import {User} from "../providers/user";
import {LoginPage} from "../pages/authentication/login";
import {RegisterPage} from "../pages/authentication/register";
import {ForgotPage} from "../pages/authentication/forgot";

@NgModule({
  declarations: [
    MyApp,

    LoginPage,
    RegisterPage,
    ForgotPage,

    DrawerPage,
    HomePage,
    SettingsTabPage,
    GeneralPage,
    SecurityPage,
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

    DrawerPage,
    HomePage,
    SettingsTabPage,
    GeneralPage,
    SecurityPage,
    AboutPage,
    ContactPage
  ],
  providers: [
    Auth,
    User
  ]
})
export class AppModule {
}
