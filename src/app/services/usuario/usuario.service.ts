import { Injectable } from '@angular/core';
import {  Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import {urlService} from '../../config/config';
import { Observable, Subscription} from 'rxjs'; import { map, retry, filter, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo.service';
import { EventEmitter } from '@angular/core';
import { ObserveOnOperator } from '../../../../node_modules/rxjs/internal/operators/observeOn';
@Injectable()
export class UsuarioService {

  usuario: Usuario;
  token: string = null;
  menu: any[] = [];
  public notificacion = new EventEmitter<boolean>();
  public menuEmitter = new EventEmitter<boolean>();

  constructor(public http: HttpClient , public router: Router, public subirArchivo: SubirArchivoService)
  {
    this.cargarStorage();
  }

  limpiar() {
    this.usuario = null;
    this.token = null;
    this.menu = null;
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('menu');
  }

  logout() {
    this.limpiar();
    this.router.navigate(['/login']);
    this.notificacion.emit(true);
  }

  loginGoogle(token: string) {
    const url = `${urlService}/login/google`;
    return this.http.post(url, {token})
      .pipe(
        map(
          (resp: any) => {
            this.guardarStorage(resp.usuario._id, resp.token, resp.usuario, resp.menu );
            this.menuEmitter.emit(true);
          }
        ),
        catchError(
          error => {
            console.log(error);
            return Observable.throw(error)
          }
        )
      )
    ;
  }

  login(usuario: Usuario, recordar: boolean = false) {
    const url = `${urlService}/login`;
    return this.http.post(url, usuario)
      .pipe(
        map(
          (resp: any) => {
            this.guardarStorage(resp.usuario._id, resp.token, resp.usuario, resp.menu );
            this.menuEmitter.emit(true);
            if (recordar === true) {
              localStorage.setItem('email', resp.usuario.email);
            }
            return true;
          }
        ),
        catchError(
          error => {
            console.log(error);
            swal('Error en el login', error.error.message, 'warning');
            return Observable.throw(error);
          }
        )
      )
  }

  crearUsuario(usuario: Usuario) {
    const url = `${urlService}/usuarios`;
    return this.http.post(url, usuario).pipe(
      map(
        (resp: any) => {
          swal('Usuario creado', resp.usuarioGuardado.email, 'success');
        }
      ),
      catchError(
        error => {
          console.log(error.error.error.message);
          swal(error.error.message, error.error.error.message, 'warning');
          return Observable.throw(error);
        }
      )
    )
  }

  guardarStorage( id: string, token: string, usuario: Usuario , menu: any) {
    this.limpiar();
    localStorage.setItem('token', token);
    localStorage.setItem('id', id);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    localStorage.setItem('menu', JSON.stringify(menu));
    this.usuario = usuario;
    this.token = token;
    this.menu = menu;
  }

  estaLogueado() {
    return (this.token !== null) ? true : false;
  }

  cargarStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
      this.menu = JSON.parse(localStorage.getItem('menu'));
    } else {
      this.usuario = null;
      this.token = null;
      this.menu = null;
    }
  }

  actualizarUsuario(usuario: Usuario) {
    let url = `${urlService}/usuarios/${usuario._id}`;
    url += '?token=' + this.token;
    return this.http.put(url, usuario).pipe(map(
      (resp: any) => {
        const usuario: Usuario = resp.usuario;
        if(this.usuario._id === resp.usuario._id) {
          console.log(resp);
          this.guardarStorage(usuario._id , this.token, usuario, resp.menu);
        }
        swal('Usuario actualizado', usuario.nombre, 'success');
        return true;
      }
    ));
  }
  cambiarImagen(file: File, id: string) {
    this.subirArchivo.subirArchivo(file, 'usuarios', id)
      .then( (resp: any) => {
        this.usuario.img = resp.usuarioActualizado.img;
        swal('Imagen actualizada', this.usuario.nombre , 'success');
        this.guardarStorage(id, this.token, this.usuario, resp.menu);
      }).catch(resp => console.log(resp));
  }

  cargarUsuarios(desde: number = 0) {
    const url = `${urlService}/usuarios?desde=${desde}`;
    return this.http.get(url);
  }

  buscarUsuario(termino: string) {
    const url = `${urlService}/busqueda/coleccion/usuarios/${termino}`;
    return this.http.get(url)
      .pipe(
        map((res: any) => res.resultado
      ));
  }

  borrarUsuario(id: string) {
    const url = `${urlService}/usuarios/${id}?token=${this.token}`;
    return this.http.delete(url).pipe(
      map( resp => {
        swal('Usuario borrado');
      })
    );
  }

  renuevaToken() {
    let url = `${urlService}/login/renuevaToken?token=${this.token}`;
    return this.http.get(url).pipe(
      map(
        (resp: any) => {
          this.token = resp.token;
          localStorage.setItem('token', this.token);
          return true;
        }
      ),
      catchError(
        error => {
          swal('No fue posible renovar token', 'loguese otra vez', 'warning');
          this.limpiar();
          this.router.navigate(['/login']);
          return Observable.throw(error);
        }
      )
    )
  }

}
