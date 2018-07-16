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



// services



@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    LoginModule,
    PagesModule,
    APP_ROUTES,
    FormsModule,
    HttpClientModule,
    CommonModule
  ],
  providers: [SettingsService, UsuarioService , SidebarService],
  bootstrap: [AppComponent]
})
export class AppModule { }
