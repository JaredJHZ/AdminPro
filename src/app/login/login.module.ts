import {NgModule} from '@angular/core';
import {LoginComponent} from './login.component';
import { RegisterComponent } from './register.component';
import { FormsModule } from '@angular/forms';

@NgModule(
      { declarations:[LoginComponent,RegisterComponent],
       exports:[LoginComponent,RegisterComponent],
       imports:[FormsModule]

}
)export class LoginModule{}