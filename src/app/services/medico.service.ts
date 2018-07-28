import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {urlService} from '../config/config';
import { Router, Route, ActivatedRoute } from '../../../node_modules/@angular/router';
import { map, switchAll } from '../../../node_modules/rxjs/operators';
import { UsuarioService } from './usuario/usuario.service';
import { Medico } from '../models/medico.model';
@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  totalM: number;

  constructor(public http: HttpClient, public usuario: UsuarioService) {}

  cargarMedicos(desde: number) {
    const url = `${urlService}/medico?desde=${desde}`;
    return this.http.get(url);
  }

  cargarMedico(id: string) {
    const url =  `${urlService}/medico/${id}`;
    return this.http.get(url).pipe(
      map((resp: any) => resp.medico
    ));
  }

  buscarMedico(palabra: string) {
    let url = `${urlService}/busqueda/coleccion/medicos/${palabra}`;
    return this.http.get(url);
  }

  borrarMedico(id: string) {
    let url =  `${urlService}/medico/${id}?token=${this.usuario.token}`;
    return this.http.delete(url).pipe(
      map(
        resp => {
          swal('Medico Borrado','', 'success');
        }
      )
    )
  }

  guardarMedico(medico: Medico) {
    if (!medico._id ) {
      let url = `${urlService}/medico/${medico.hospital}?token=${this.usuario.token}`;
      return this.http.post(url , medico).pipe(
      map(
        (resp: any) => {
          swal('Medico creado', medico.nombre, 'success');
          return resp.medicoGuardado;
        }
      )
    );
    } else {
      console.log(medico);
      let url = `${urlService}/medico/${medico._id}?token=${this.usuario.token}`;
      return this.http.put(url, medico).pipe(
        map (
          (resp: any) => {
            swal('Medico actualizado', medico.nombre, 'success');
            return resp.medicoActualizado;
          }
        )
      )
    }
  }
}
