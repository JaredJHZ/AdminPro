import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription} from 'rxjs'; import { map, retry, filter } from 'rxjs/operators';
@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  constructor() {
    this.subscription = this.regresaObservable()
    .pipe(
      retry()
    ).subscribe(
      numero => console.log(numero),
      error => console.error('Error en el observable', error),
      () => console.log('termino la wea')
    );

  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  regresaObservable(): Observable<any> {
    let contador = 0;
    return new Observable(
      observer => {
        const intervalo = setInterval(
          () => {
            contador++;
            const salida = {
              valor: contador
            };
            observer.next(salida);
          } , 1000);
      }).pipe(
        map(
          (resp: any) => {
            return resp.valor;
          }
        ),
        filter(
          (value: any, index: number) => {
            if (( (value % 2) === 1) ) {
              return true;
            } else { return false; }
          }
        )
      );
  }

}
