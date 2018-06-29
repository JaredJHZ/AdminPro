import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { Setting } from '../Interfaces/settings.interface';


export class SettingsService {

  setting: Setting = {
    theme: 'default',
    urlTheme: 'assets/css/colors/default.css'
  };
  constructor(@Inject(DOCUMENT) private _document) {
    this.getSettings();
   }

  getSettings(): void {
    if(localStorage.getItem('settings')) {
      this.setting = JSON.parse(localStorage.getItem('settings'));
    }
    this.setSettings();
  }

  setSettings(theme?: string, url?: string): void {
    if (url != null && theme != null) {
      this.setting = {
        theme: theme,
        urlTheme : url
      };
    }
    this._document.getElementById('theme').setAttribute('href', this.setting.urlTheme);
    this.saveSettings();
  }

  saveSettings(): void {
    localStorage.setItem('settings', JSON.stringify(this.setting));
  }

}