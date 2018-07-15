import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/usuario/usuario.service';
import { Usuario } from '../models/usuario.model';

declare function init_plugins();
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls:['./login.component.css']
})
export class LoginComponent implements OnInit {

  auth2: any;
  recuerdame: boolean = false;
  email: string;
  constructor(private router: Router, public _usuarioService: UsuarioService) { }

  ngOnInit() {
    init_plugins();
    this.googleIn();

    if( localStorage.getItem('email')){
      this.email = localStorage.getItem('email');
    } else {
      this.email = '';
    }
    if (this.email.length > 0){
      this.recuerdame = true;
    }
  }

  googleIn() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id:'436512794014-hh9bhv78r2ji10l48a1pfm58f3pc7qv3.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin'
        scope: 'email profile'
      });
      this.attachSignIn(document.getElementById('google'));
    });
  }

  attachSignIn( element ) {
    this.auth2.attachClickHandler(element, {} , (googleUser) => {
      const token = googleUser.getAuthResponse().id_token;
      this._usuarioService.loginGoogle(token)
        .subscribe(
          (resp) => {
            window.location.href = '#/dashboard';
          }
        );
      console.log(token);
    });
  }

  ingresar(forma: NgForm): void {
   if (forma.invalid) {
     return;
   }
   let usuario = new Usuario(null, forma.value.email, forma.value.password);
   this._usuarioService.login(usuario, forma.value.recuerdame)
    .subscribe(
      (resp) => {
       if(resp === true) {
        this.router.navigate(['/dashboard']);
       } else {
         swal('Error', 'Contraseña incorrecta', 'warning');
       }
      }
    )
  }

}
