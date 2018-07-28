import {Routes, Route, RouterModule} from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { ProgressComponent } from './pages/progress/progress.component';
import { Graficas1Component } from './pages/graficas1/graficas1.component';
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';
import { PagesComponent } from './pages/pages.component';
import { RegisterComponent } from './login/register.component';
import { LoginGuardGuard } from './services/guards/login-guard.guard';
const APPROUTES:Routes = [
       {
              path:'login',
              component:LoginComponent,
              data : {title: 'login'}
       },
       {
              path:'register',
              component:RegisterComponent,
              data: {title: 'register'}
       },
       {
        path:'',
        component: PagesComponent,
        canActivate: [LoginGuardGuard],
        loadChildren: './pages/pages.module#PagesModule'
       },
       {
              path:'**',
              component:NopagefoundComponent,
              data : {title: 'No Page'}
       }

];

export const APP_ROUTES = RouterModule.forRoot(APPROUTES,{useHash:true});