import {NgModule} from '@angular/core';
import {DashboardComponent} from './dashboard/dashboard.component';
import {Graficas1Component} from './graficas1/graficas1.component';
import {ProgressComponent} from './progress/progress.component';
import { SharedModule } from '../shared/shared.module';
import { PagesComponent } from './pages.component';
import {PAGES_ROUTES} from './pages.routes';
import {FormsModule} from '@angular/forms';
import { IncrementadorComponent } from '../components/incrementador/incrementador.component';

// charts
import {ChartsModule} from 'ng2-charts';
import { GraficoDonasComponent } from '../components/grafico-donas/grafico-donas.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { CommonModule } from '@angular/common';
import { RxjsComponent } from './rxjs/rxjs.component';

// pipes

import {PipesModule} from '../pipes/pipes.module';
import { ProfileComponent } from './profile/profile.component';

@NgModule(
      {declarations: [DashboardComponent,
      Graficas1Component,
       ProgressComponent,
      PagesComponent,
      IncrementadorComponent,
      GraficoDonasComponent, 
      AccountSettingsComponent, 
      PromesasComponent, RxjsComponent, ProfileComponent],
       exports: [DashboardComponent,Graficas1Component,ProgressComponent],
       imports: [SharedModule, PAGES_ROUTES, FormsModule, ChartsModule, CommonModule, PipesModule]

}
)export class PagesModule{}