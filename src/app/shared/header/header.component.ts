import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { Usuario } from '../../models/usuario.model';
import { Router } from '../../../../node_modules/@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {
  usuario: Usuario;
  constructor(public _usuarioS: UsuarioService, public router: Router) {
    this.usuario = this._usuarioS.usuario;
   }
  ngOnInit() {
  }
  buscar(termino: string) {
    this.router.navigate(['/busqueda', termino]);
  }

}
