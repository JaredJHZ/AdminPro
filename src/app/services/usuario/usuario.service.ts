import { Injectable } from '@angular/core';
import {  Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import {urlService} from '../../config/config';
import { Observable, Subscription} from 'rxjs'; import { map, retry, filter } from 'rxjs/operators';
import { Router } from '@angular/router';
@Injectable()
export class UsuarioService {

  usuario: Usuario;
  token: string = null;

  constructor(public http: HttpClient , public router: Router)
  {
    this.cargarStorage();
  }

  logout() {
    this.usuario = null;
    this.token = null;
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    this.router.navigate(['/login']);
  }

  loginGoogle(token: string) {
    let url = `${urlService}/login/google`;
    return this.http.post(url, {token})
      .pipe(
        map(
          resp => {
            this.guardarStorage(resp.usuario._id, resp.token, resp.usuario );
          }
        )
      )
    ;
  }

  login(usuario: Usuario, recordar: boolean = false) {
    let url = `${urlService}/login`;
    return this.http.post(url, usuario)
      .pipe(
        map(
          (resp: any) => {
            this.guardarStorage(resp.usuario._id, resp.token, resp.usuario );
            if (recordar === true) {
              localStorage.setItem('email', resp.usuario.email);
            }
            return true;
          }
        )
      )
  }

  crearUsuario(usuario: Usuario) {
    let url = `${urlService}/usuarios`;
    return this.http.post(url, usuario).pipe(
      map(
        (resp: any) => {
          console.log(resp);
          swal('Usuario creado', resp.usuarioGuardado.email, 'success');
        }
      )
    )
  }

  guardarStorage( id: string, token: string, usuario: Usuario ) {
    localStorage.setItem('token',token);
    localStorage.setItem('id', id);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    this.usuario = usuario;
    this.token = token;
  }

  estaLogueado() {
    return (this.token !== null) ? true : false;
  }

  cargarStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.token = JSON.parse(localStorage.getItem('usuario'));
    } else {
      this.usuario = null;
      this.token = null;
    }
  }

}
