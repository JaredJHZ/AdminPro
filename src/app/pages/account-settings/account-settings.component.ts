import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';


@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {
  //HACER REFERENCIA AL DOM
  constructor(@Inject(DOCUMENT) private _document) { }

  ngOnInit() {
  }

  changeColor(theme:string, link:any){
    this.check(link);
    let url:string = `assets/css/colors/${theme}.css`;
    this._document.getElementById('theme').setAttribute('href',url);
  }

  check(link:any){
    let selectors:any = document.getElementsByClassName('selector');
    for(let ref of selectors){
      ref.classList.remove('working');
    }
    link.classList.add('working');
  }

}
