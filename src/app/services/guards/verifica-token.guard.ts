import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../usuario/usuario.service';
import { resolve } from '../../../../node_modules/@types/q';

@Injectable({
  providedIn: 'root'
})
export class VerificaTokenGuard implements CanActivate {
  constructor(public usuarioS: UsuarioService, public router: Router){}
  canActivate(): Promise<boolean> | boolean {
    let token = this.usuarioS.token;
    let payload = JSON.parse(atob(token.split('.')[1]));
    let expirado = this.expirado(payload.exp);

    if (expirado) {
      this.router.navigate(['/login']);
      return false;
    }
    return this.verificaRenueva(payload.exp);
  }

  expirado(fecha: number) {
    let ahora = new Date().getTime() / 1000;
    if (fecha < ahora) {
      return true;
    } else {
      return false;
    }
  }

  verificaRenueva(fecha: number ): Promise<boolean> {
    return new Promise( (resolve, reject) => {
      let tokenExp = new Date(fecha * 1000);
      let ahora = new Date();
      ahora.setTime( ahora.getTime() + (3 * 60 * 60 * 1000) );
      if (tokenExp.getTime() > ahora.getTime()) {
        resolve(true);
      } else {
        this.usuarioS.renuevaToken().subscribe(
          (resp) => {
            console.log('Token renovado');
            resolve(true);
          },
          () => {
            reject(false);
            this.router.navigate(['/login']);
          }
        );
      }

    });
  }
}
