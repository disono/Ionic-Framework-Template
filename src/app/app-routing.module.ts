import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

import {AuthGuardService} from "./services/auth/auth.guard.service";

import {LoginPage} from "./pages/auth/login/login.page";
import {ForgotPage} from "./pages/auth/forgot/forgot.page";
import {RegisterPage} from "./pages/auth/register/register.page";
import {TabPage} from "./pages/user/settings/tab/tab.page";

const routes: Routes = [
    {path: 'auth/login', component: LoginPage},
    {path: 'auth/forgot', component: ForgotPage},
    {path: 'auth/register', component: RegisterPage},
    {
        path: 'auth/verify/email',
        loadChildren: './pages/auth/email/email.module#EmailPageModule',
        canActivate: [AuthGuardService]
    },
    {
        path: 'auth/verify/sms',
        loadChildren: './pages/auth/sms/sms.module#SMSPageModule',
        canActivate: [AuthGuardService]
    },

    {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
    {
        path: 'dashboard',
        loadChildren: './pages/dashboard/dashboard.module#DashboardPageModule',
        canActivate: [AuthGuardService]
    },

    {
        path: 'page/:slug',
        loadChildren: './pages/page/page-details/page-details.module#PageDetailsPageModule',
    },

    {
        path: 'user/settings',
        component: TabPage,
        children: [
            {
                path: '',
                redirectTo: '/user/settings/general',
                pathMatch: 'full'
            },
            {
                path: 'general',
                children: [
                    {
                        path: '',
                        loadChildren: './pages/user/settings/general/general.module#GeneralPageModule',
                        canActivate: [AuthGuardService]
                    }
                ]
            },
            {
                path: 'security',
                children: [
                    {
                        path: '',
                        loadChildren: './pages/user/settings/security/security.module#SecurityPageModule',
                        canActivate: [AuthGuardService]
                    }
                ]
            }
        ]
    },
    {path: 'page-details', loadChildren: './pages/page/page-details/page-details.module#PageDetailsPageModule'}

];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {

}
