import { Component, OnInit } from '@angular/core';
import { Hospital } from '../../models/hospital.model';
import { HospitalesService } from '../../services/hospitales/hospitales.service';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
declare var swal: any;
@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {

  totalH: number;
  cargando: boolean = true;
  hospitales: Hospital[];
  desde: number;

  constructor(public hospitalesS: HospitalesService, public modal: ModalUploadService) {
    this.desde = 0;
    this.cargarHospitales(this.desde);
   }

  ngOnInit() {
    this.modal.notificacion.subscribe(
      (resp) => {
        swal('Imagen subida', '','success');
        this.cargarHospitales(this.desde);
      }
    )
  }

  cargarHospitales(desde: number) {
   this.hospitalesS.getHospitales(desde).subscribe(
     (resp: any) =>{
      this.hospitales = resp.hospitales;
      this.totalH = resp.cantidad;
      this.cargando = false;
     });
  }

  aumentar(cantidad: number) {
    if((this.desde + cantidad) <= -1 || (this.desde + cantidad ) >= this.totalH) {
      return;
    }
    this.desde += cantidad;
    this.cargarHospitales(this.desde);
  }

  borrar(id: string) {
    swal({
      title:'Estas seguro?',
      text: 'Esta a punto de borrar a '+id,
      icon: 'warning',
      buttons: true,
      dangerMode: true
    }).then(
      (borrar) => {
        if (borrar) {
          this.hospitalesS.borrarHospital(id).subscribe(() => this.cargarHospitales(this.desde));
        }
      }
    );
}

actualizarHospital(hospital: Hospital) {
  this.hospitalesS.actualizarHospital(hospital)
    .subscribe();
}

buscarHospital(palabra: string ) {
  if(palabra.length > 1) {
    this.hospitalesS.buscarHospital(palabra).subscribe(
      hospitales => this.hospitales = hospitales
    );
  } else {
    this.cargarHospitales(this.desde);
  }
}

mostrarModal(id: string ){
  this.modal.mostrarModal('hospitales', id);
}

agregarHospital() {
  swal({
    text: 'Agregar hospital',
    content: "input",
    button:{
      text: "Agregar hospital",
      closeModal: false,
    }
  }).then(
    (nombre) => {
      let hospital = new Hospital(nombre);
      this.hospitalesS.agregarHospital(hospital)
        .subscribe(
          (hospitalG) => {
            return swal('Hospital creado correctamente', hospitalG.nombre, 'success');
          }
        );
    }
  )
}
}
