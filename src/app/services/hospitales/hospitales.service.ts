import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { urlService } from '../../config/config';
import { UsuarioService } from '../usuario/usuario.service';
import { Hospital } from '../../models/hospital.model';
import { map } from '../../../../node_modules/rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HospitalesService {

  constructor(public http: HttpClient, public usuario: UsuarioService) { }

  getHospitales(desde: number = 0) {
    let url = `${urlService}/hospital?desde=${desde}`;
    return this.http.get(url);
  }

  borrarHospital(id: string) {
    let url = `${urlService}/hospital/${id}?token=${this.usuario.token}`;
    return this.http.delete(url);
  }

  actualizarHospital(hospital : Hospital) {
    let url = `${urlService}/hospital/${hospital._id}?token=${this.usuario.token}`;
    return this.http.put(url, hospital)
      .pipe(
        map(
          (resp: any) => {
            swal('Hospital actualizado', 'Se actualizo el' + resp.hospitalActualizado.nombre,'success');
          }
        )
      );
  }

  buscarHospital(palabra: string) {
    let url = `${urlService}/busqueda/coleccion/hospitales/${palabra}`;
    return this.http.get(url)
      .pipe(
        map(
          (resp: any) => {
            return resp.resultado;
          }
        )
      )
  }

  agregarHospital(hospital: Hospital) {
    const url = `${urlService}/hospital?token=${this.usuario.token}`;
    return this.http.post(url, hospital)
      .pipe(map((resp: any) => resp.hospitalGuardado));
  }

  obtenerHospital(id: string) {
    const url = `${urlService}/hospital/${id}`;
    return this.http.get(url).pipe(map((resp: any) => resp.hospital));
  }

}
