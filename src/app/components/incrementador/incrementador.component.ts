import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styleUrls: ['./incrementador.component.css']
})
export class IncrementadorComponent implements OnInit {
  @Input() percent:number;
  @Input() legend:string;
  @Output() changeValue: EventEmitter<number> = new EventEmitter();
  @ViewChild('txtValue') txtValue: ElementRef;
  constructor() {

   }

  ngOnInit() {

  }

  onChange(newValue:number){
    if(newValue>100){
      newValue = 100;
    }else if(newValue <= 0){
      newValue = 0;
    }
    this.percent = newValue;
    this.changeValue.emit(this.percent);

    //let barra:any = document.getElementsByName('progress')[0];
    this.txtValue.nativeElement.value= this.percent;
  }

changeValues(value:number){
if((this.percent+value)>-1 && (this.percent + value) < 101){
      this.percent+=value;
      this.changeValue.emit(this.percent);
      this.txtValue.nativeElement.focus();
    }
  }

}
