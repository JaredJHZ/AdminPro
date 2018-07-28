import { Injectable } from '@angular/core';
import { UsuarioService } from './usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any[] = [];
  constructor(public usuarioS: UsuarioService) {
    this.usuarioS.notificacion.subscribe(
      (resp) => {
        if (resp){
          this.menu = null;
        }
      }
    )
    this.usuarioS.menuEmitter.subscribe(
      (resp) => {
        if (resp) {
          this.menu = this.usuarioS.menu;
        }
      }
    )
   }

   cargar() {
     this.menu = this.usuarioS.menu;
   }
}