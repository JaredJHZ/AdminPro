import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {LoginModule} from './login/login.module';
import {PagesModule} from './pages/pages.module';


//routes
import { APP_ROUTES } from './app.routes';
import { SettingsService } from './services/settings.service';

//services



@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    LoginModule,
    PagesModule,
    APP_ROUTES
  ],
  providers: [SettingsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
