import {NgModule} from '@angular/core';
import {LoginComponent} from './login.component';
import { RegisterComponent } from './register.component';

@NgModule(
      { declarations:[LoginComponent,RegisterComponent],
       exports:[LoginComponent,RegisterComponent],
       imports:[]

}
)export class LoginModule{}