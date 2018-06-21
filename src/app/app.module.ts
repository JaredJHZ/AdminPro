import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import {LoginModule} from './login/login.module';
import {PagesModule} from './pages/pages.module';
import {SharedModule} from './shared/shared.module';

//routes
import { APP_ROUTES } from './app.routes';
import { PagesComponent } from './pages/pages.component';
import { RegisterComponent } from './login/register.component';
@NgModule({
  declarations: [AppComponent, PagesComponent, RegisterComponent],
  imports: [
    BrowserModule,
    LoginModule,
    PagesModule,
    SharedModule,
    APP_ROUTES
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
