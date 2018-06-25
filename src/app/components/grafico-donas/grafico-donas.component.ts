import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-grafico-donas',
  templateUrl: './grafico-donas.component.html',
  styleUrls: ['./grafico-donas.component.css']
})
export class GraficoDonasComponent implements OnInit {
  @Input() data:number[];
  @Input() chartLabels:string[];
  @Input() chartType:string;
  @Input() title:string;
  constructor() { 
    
  }

  ngOnInit() {
    console.log(this.data);
  }

}
