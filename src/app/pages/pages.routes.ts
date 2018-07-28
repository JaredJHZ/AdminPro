import {Routes,RouterModule} from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { LoginGuardGuard } from '../services/guards/login-guard.guard';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import {MedicosComponent} from './medicos/medicos.component';
import {MedicoComponent} from './medicos/medico.component';
import {BusquedaComponent} from '../pages/busqueda/busqueda.component';
import {AdminGuard} from '../services/guards/admin.guard';
const PAGESRoutes: Routes = [
       {
              path: '',
              component: PagesComponent,
              canActivate: [LoginGuardGuard],
              children: [
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
                        path: 'perfil',
                        component: ProfileComponent, 
                        data : {title: 'Perfil de usuario'}
                     },
                     {
                        path: 'busqueda/:termino',
                        component: BusquedaComponent,
                        data : {title: 'Buscador'}
                     },
                     // mantenimientos
                     {
                        path: 'usuarios',
                        component: UsuariosComponent,
                        data : {title: 'Mantenimiento de usuarios'},
                        canActivate: [AdminGuard]
                     },
                     {
                         path: 'hospitales',
                         component: HospitalesComponent,
                         data: {title:' Mantenimiento de hospitales'}
                        ,
                        {
                            path: 'medicos',
                            component: MedicosComponent,
                            data : {title : 'Mantenimiento de medicos'}
                        },
                        {
                            path: 'medico/:id',
                            component: MedicoComponent,
                            data : 'Actualizar Medico'
                        },
                     {
                        path: '',
                        redirectTo: '/dashboard',
                        pathMatch: 'full',
                        data : {title: 'Dashboard'}
                     }
              ]
       }
];

export const PAGES_ROUTES = RouterModule.forChild(PAGESRoutes);