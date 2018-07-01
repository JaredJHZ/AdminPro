import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  menu: any[]=[
    {
      title: 'main',
      icon: 'mdi mdi-gauge',
      submenu: [
        {
        title: 'Dashboard',
        url: '/dashboard'
        },
        {
          title: 'ProgressBar',
          url: '/progress'
        },
        {
            title: 'Graphics',
            url: '/graficas1'
        },
        {
          title: 'Promesas',
          url: '/promesas'
        },
        {
          title: 'Rxjs',
          url: '/rxjs'
        }
      ]
    }
  ]
  constructor() { }
}
