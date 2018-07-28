import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {UsuarioService} from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(public usuarioS: UsuarioService ){

  }

  canActivate(): boolean{
    if (this.usuarioS.usuario.role === 'ADMIN_ROLE') {
      return true;
    } else {
      this.usuarioS.logout();
      return false;
    }
  }
}
