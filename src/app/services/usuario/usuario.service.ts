import { Injectable } from '@angular/core';
import {  Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import {urlService} from '../../config/config';
import { Observable, Subscription} from 'rxjs'; import { map, retry, filter } from 'rxjs/operators';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo.service';
@Injectable()
export class UsuarioService {

  usuario: Usuario;
  token: string = null;

  constructor(public http: HttpClient , public router: Router, public subirArchivo: SubirArchivoService)
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
    const url = `${urlService}/login/google`;
    return this.http.post(url, {token})
      .pipe(
        map(
          (resp: any) => {
            this.guardarStorage(resp.usuario._id, resp.token, resp.usuario );
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
    const url = `${urlService}/usuarios`;
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
    localStorage.setItem('token', token);
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
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    } else {
      this.usuario = null;
      this.token = null;
    }
  }

  actualizarUsuario(usuario: Usuario) {
    let url = `${urlService}/usuarios/${usuario._id}`;
    url += '?token=' + this.token;
    return this.http.put(url, usuario).pipe(map(
      (resp: any) => {
        const usuario: Usuario = resp.usuario;
        if(this.usuario._id === resp.usuario._id) {
          this.guardarStorage(usuario.id , this.token, usuario);
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
        this.guardarStorage(id, this.token, this.usuario);
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

}
