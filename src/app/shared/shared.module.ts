import {NgModule} from '@angular/core';
import {BreadcrumbsComponent} from './breadcrumbs/breadcrumbs.component';
import {HeaderComponent} from './header/header.component';
import {NopagefoundComponent} from './nopagefound/nopagefound.component';
import {SidebarComponent} from './sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PipesModule } from '../pipes/pipes.module';
@NgModule(
      {
            declarations: [
                NopagefoundComponent,
                HeaderComponent,
                SidebarComponent,
                BreadcrumbsComponent,
                NopagefoundComponent
            ],
            exports: [
                NopagefoundComponent,
                HeaderComponent,
                SidebarComponent,
                BreadcrumbsComponent,
                NopagefoundComponent
            ],
            imports:[RouterModule, CommonModule, PipesModule]
        }
)export class SharedModule{}