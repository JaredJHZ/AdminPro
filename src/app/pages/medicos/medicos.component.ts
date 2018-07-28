import { Component, OnInit } from '@angular/core';
import { MedicoService } from '../../services/medico.service';
import { Medico } from '../../models/medico.model';
import {Router} from '@angular/router';
declare var swal as any;
@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {

  medicosT: number = 0;
  medicos: Medico[];
  desde: number = 0;

  constructor(public medicosS: MedicoService, public router: Router) { }

  ngOnInit() {
    this.getMedicos(this.desde);
  }

  getMedicos(desde: number) {
    this.medicosS.cargarMedicos(this.desde).subscribe(
      (resp: any) => {
        this.medicos = resp.medicos;
        this.medicosT = resp.cantidad;
      }
    );
  }

  editarMedico(id: string){
    this.router.navigate(['/medico', id]);
  }

  agregarMedico() {
    this.router.navigate(['/medico','nuevo']);
  }

  buscarMedico(palabra: string) {
    if( palabra.length > 0 ) {
      this.medicosS.buscarMedico(palabra).subscribe(
        (resp: any) => {
          this.medicos = resp.resultado;
        }
      );
    }else {
      this.getMedicos(this.desde);
    }
  }

  aumentar(desde: number) {
    if ((this.desde + desde) <= -1) {
      return;
    }
    if ((this.desde + desde >= this.medicosT)) {
      return;
    }
    this.desde += desde;
    this.getMedicos(this.desde);
  }

  borrar(id: string) {
    swal({
      title:'Estas seguro?',
      text: 'Esta a punto de borrar a '+id,
      icon: 'warning',
      buttons: true,
      dangerMode: true
    }).then( (borrar) => {
        this.medicosS.borrarMedico(id).subscribe(resp => this.getMedicos(this.desde));
    });
  }

}
