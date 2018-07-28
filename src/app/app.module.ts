import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {LoginModule} from './login/login.module';
import {PagesModule} from './pages/pages.module';
import {HttpClientModule} from '@angular/common/http';

// routes
import { APP_ROUTES } from './app.routes';
import { SettingsService } from './services/settings.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {UsuarioService} from './services/usuario/usuario.service';
import { SidebarService } from './services/sidebar.service';
import { CommonModule } from '@angular/common';
import { MedicoComponent } from './pages/medicos/medico.component';
import { ImagenPipe } from './pipes/imagen.pipe';
import { PagesComponent } from './pages/pages.component';
import { SharedModule } from './shared/shared.module';
import { PipesModule } from './pipes/pipes.module';



// services



@NgModule({
  declarations: [AppComponent, PagesComponent],
  imports: [
    BrowserModule,
    LoginModule,
    APP_ROUTES,
    FormsModule,
    HttpClientModule,
    CommonModule,
    SharedModule,
    PipesModule
  ],
  providers: [SettingsService, UsuarioService , SidebarService],
  bootstrap: [AppComponent]
})
export class AppModule { }
