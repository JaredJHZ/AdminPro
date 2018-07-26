import { Pipe, PipeTransform } from '@angular/core';
import { urlService } from '../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo: string = 'usuario'): any {
    

    let url = urlService + '/img';

    if (img === undefined){
     url += '/' + tipo + '/xxxx';
    } else {
      if ( img.indexOf('https') >= 0 ) {
        return img;
      }
      if (!img) {
         return url += `/${tipo}/xxxxx`;
      }
      switch ( tipo ) {
        case 'usuario':
        url += `/usuarios/${img}`;
          break;
        case 'medico':
        url += `/medicos/${img}`;
          break;
        case 'hospital':
        url += `/hospitales/${img}`;
          break;
        default : 
        url += '/usuarios/xxxxx';
      }
    }
    return url;
  }

}
