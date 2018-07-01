import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: []
})
export class BreadcrumbsComponent implements OnInit {

  title: string;

  constructor(public router: Router, private titleP: Title, private meta: Meta) {
   this.getDataRoute().subscribe(
     (title) => {
       this.title = title;
       this.titleP.setTitle(title);
       const metaTag: MetaDefinition = {
         name: 'description',
         content: title
       };
       this.meta.updateTag(metaTag);

     }
   );
  }

  ngOnInit() {
  }

  getDataRoute() { 
    return this.router.events
    .pipe(
      filter(
        (evento) => evento instanceof ActivationEnd
      ),
      filter(
        (evento: ActivationEnd) =>  evento.snapshot.firstChild === null),
      map( data => data.snapshot.routeConfig.data.title)
    );
  }

}
