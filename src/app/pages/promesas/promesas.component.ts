import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-promesass',
  templateUrl: './promesas.component.html',
  styles: []
})
export class PromesasComponent implements OnInit {

  bandera: boolean;
  constructor() { }

  ngOnInit() {
    this.contarHastaTres().then(
      (value) => {
        this.bandera = value;
      }
    ).catch((error) => console.error('error'));
  }

  contarHastaTres(): Promise<boolean> {
    return new Promise( (resolve, reject) => {
      let contador = 0;
      const interval = setInterval(() => {
        contador++;
        if (contador === 3) {
          clearInterval(interval);
          resolve(true);
        }
      }, 1000);
    });
  }

}
