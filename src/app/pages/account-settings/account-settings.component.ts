import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { SettingsService } from '../../services/settings.service';


@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {
  // HACER REFERENCIA AL DOM
  constructor(@Inject(DOCUMENT) private _document, public _settingService: SettingsService) {

   }

  ngOnInit() {
    this.getChecked();
  }

  changeColor(theme: string, link:any){
    /*
    this.check(link);
    let url: string = `assets/css/colors/${theme}.css`;
    this._document.getElementById('theme').setAttribute('href', url);
    */
   const url: string = `assets/css/colors/${theme}.css`;
   this._settingService.setSettings(theme, url);
   this.check(link);
  }

  check(link:any){
    const selectors: any = document.getElementsByClassName('selector');
    for(let ref of selectors){
      ref.classList.remove('working');
    }
    link.classList.add('working');
  }

  getChecked(): void {

      const selectors: any[] = this._document.getElementsByClassName('selector');
      for(const ref of selectors) {
        if (ref.getAttribute('data-theme') === this._settingService.setting.theme) {
          ref.classList.add('working');
          break;
      }
    }
}
}
