import {NgModule} from '@angular/core';
import {LoginComponent} from './login.component';
import { RegisterComponent } from './register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@NgModule(
      { declarations:[LoginComponent,RegisterComponent],
       exports:[LoginComponent,RegisterComponent],
       imports:[FormsModule, ReactiveFormsModule, CommonModule, RouterModule]

}
)export class LoginModule{}