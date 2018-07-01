import {Routes,RouterModule} from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';


const PAGESRoutes:Routes = [
       {
              path:'',
              component:PagesComponent,
              children:[
                     {
                            path: 'dashboard',
                            component: DashboardComponent,
                            data: {title: 'Dashboard'}
                     },
                     {
                            path: 'progress',
                            component: ProgressComponent,
                            data: {title: 'Progress'}
                     },
                     {
                            path: 'graficas1',
                            component: Graficas1Component,
                            data: {title: 'Graphics'}
                     },
                     {
                            path: 'account-settings',
                            component: AccountSettingsComponent,
                            data: {title: 'Theme Settings'}
                     },
                     {
                        path: 'promesas',
                        component: PromesasComponent,
                        data: {title: 'Promises'}
                     },
                     {
                        path: 'rxjs',
                        component: RxjsComponent,
                        data: {title: 'Rxjs'}
                     },
                     {
                        path: '',
                        redirectTo: '/dashboard',
                        pathMatch: 'full'
                     }
              ]
       }
];

export const PAGES_ROUTES = RouterModule.forChild(PAGESRoutes);