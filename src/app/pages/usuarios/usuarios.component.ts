import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
declare var swal : any;
@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  cargando: boolean = true;
  desde: number = 0;
  total: number = 0;
  constructor(public usuarioS: UsuarioService, public modalUploadService: ModalUploadService) { }

  ngOnInit() {
    this.cargarUsuarios();
    this.modalUploadService.notificacion.subscribe(
      resp => {
        this.cargarUsuarios();
        console.log(resp);
        swal('Imagen del usuario actualizada', resp.usuarioActualizado.nombre + ' imagen actualizada ' , 'success' );
      }
    );
  }

  cargarUsuarios() {
    this.cargando = true;
    this.usuarioS.cargarUsuarios(this.desde).subscribe(
      (resp: any) => {
        this.total = resp.cantidad;
        this.usuarios = resp.usuarios;
        this.cargando = false;
      }
    );
  }

  cambiarDesde(valor: number) {
    let desde = this.desde + valor;
    if (desde >= this.total) {
      return;
    }
    if(desde < 0 ){
      return;
    }
    this.desde += valor;
    this.cargarUsuarios();
  }

  buscarUsuario(termino: string) {
    if (termino.length <= 0) {
      this.cargarUsuarios();
      return;
    }
    this.cargando = true;
     this.usuarioS.buscarUsuario(termino).subscribe(
       (usuarios: Usuario[]) => {
         this.usuarios = usuarios;
         this.cargando = false;
       }
     );
  }

  borrarUsuario(usuario: Usuario) {
    console.log(usuario);
    if (this.usuarioS.usuario._id === Usuario._id) {
      return;
    }

    swal({
      title:'Estas seguro?',
      text: 'Esta a punto de borrar a '+usuario.nombre,
      icon: 'warning',
      buttons: true,
      dangerMode: true
    }).then( (borrar) => {
      if ( borrar) {
        this.usuarioS.borrarUsuario(usuario._id).subscribe(
          res => this.cargarUsuarios()
          // tslint:disable-next-line:semicolon
    // tslint:disable-next-line:semicolon
    ));
  }

  guardarUsuario(usuario: Usuario) {
    this.usuarioS.actualizarUsuario(usuario).subscribe(
      (usuario: any) => {
        this.cargarUsuarios();
      }
    )
  }

  mostrarModal(id: string) {
    this.modalUploadService.mostrarModal('usuarios', id);
  }

}
