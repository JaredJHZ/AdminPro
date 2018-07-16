import { Pipe, PipeTransform } from '@angular/core';
import { urlService } from '../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo: string = 'usuario'): any {
    if ( img.indexOf('https') >= 0 ) {
      return img;
    }

    let url = urlService + '/img';
    if (!img) {
       url += '/usuarios/xxxxx';
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
    return url;
  }

}
