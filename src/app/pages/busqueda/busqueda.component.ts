import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {urlService} from '../../config/config';
import {Medico} from '../../models/medico.model';
import {Usuario} from '../../models/usuario.model';
import {Hospital} from '../../models/hospital.model';
@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: []
})
export class BusquedaComponent implements OnInit {

  medicos: Medico[] = [];
  hospitales: Hospital[] = [];
  usuarios: Usuario[] = [];
  termino: string;

  constructor(public activatedRoute: ActivatedRoute , public http: HttpClient ) { 
    this.activatedRoute.params.subscribe(
      (params) => {
        let termino = params['termino'];
        this.termino = termino;
        this.buscar(termino);
      }
    )
  }

  ngOnInit() {
  }

  buscar(termino: string) {
    let url = `${urlService}/busqueda/todo/${termino}`;
    this.http.get(url)
      .subscribe((resp: any) => {
        this.medicos = resp.medicos;
        this.usuarios = resp.usuarios;
        this.hospitales = resp.hospitales;
      });
  }

}
