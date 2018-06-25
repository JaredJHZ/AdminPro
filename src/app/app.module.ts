import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {LoginModule} from './login/login.module';
import {PagesModule} from './pages/pages.module';


//routes
import { APP_ROUTES } from './app.routes';



@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    LoginModule,
    PagesModule,
    APP_ROUTES
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
