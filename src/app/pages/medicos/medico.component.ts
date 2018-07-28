import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '../../../../node_modules/@angular/router';
import {Medico} from '../../models/medico.model';
import {NgForm} from '@angular/forms';
import { MedicoService } from '../../services/medico.service';
import {Hospital} from '../../models/hospital.model';
import {HospitalesService} from '../../services/hospitales/hospitales.service';
import {ModalUploadService} from '../../components/modal-upload/modal-upload.service';
@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {

  medico: Medico = new Medico('', '', '', '', '');
  hospitales: Hospital[];
  hospital: Hospital = new Hospital('');

  constructor( public aRoute: ActivatedRoute ,
    public medicoS: MedicoService, public hospitalesS: HospitalesService, public router: Router, public upload: ModalUploadService) {
      aRoute.params.subscribe( params => {

        let id = params['id'];
        if ( id !== 'nuevo' ) {
          this.cargarMedico( id );
        }
      });
  }

  ngOnInit() {
    this.hospitalesS.getHospitales(0).subscribe(
      (hospitales: any) => {
        this.hospitales = hospitales.hospitales
      }
    );
    this.upload.notificacion.subscribe(
      (resp: any) => {
        this.medico = resp.medicoGuardado;
      }
    )
  }

  guardarMedico(f: NgForm) {
    if (f.invalid) {
      return;
    }
    console.log(this.medico);
    this.medicoS.guardarMedico(this.medico).subscribe(
      (medico) => {
        this.medico._id = medico._id;
        this.router.navigate(['/medico', medico._id]);
      }
    )
  }

  cambioHospital(id: string) {
    this.hospitalesS.obtenerHospital(id).subscribe(
      (hospital: Hospital) => {
        this.hospital = hospital;
        this.medico.hospital = this.hospital._id;
      }
    )
  }

  cargarMedico( id: string ) {
    this.medicoS.cargarMedico( id )
          .subscribe( (medico: any) => {
            this.medico = medico;
            this.hospital._id = this.medico.hospital;
          });
  }

  cambiarFoto() {
    this.upload.mostrarModal('medicos', this.medico._id);
  }

}
