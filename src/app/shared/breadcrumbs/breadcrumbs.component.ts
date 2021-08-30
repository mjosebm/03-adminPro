import { Component, OnDestroy } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnDestroy{

  public titulo: string;
  public tituloSubs$: Subscription;

  constructor(private router: Router) {
    this.titulo = 'Sin Título';

    this.tituloSubs$ = this.getDataRuta().subscribe(({ titulo }) => {   //Desestructurar... Extraer la propiedad titulo del argumento que estoy obteniendo del subscribe
      this.titulo = titulo;
      document.title = `AdminPro - ${titulo}`;
    });
   
  }
  ngOnDestroy(): void {
    this.tituloSubs$.unsubscribe();
  }

  getDataRuta(){
    
    return this.router.events.pipe(
      filter((event: any) => event instanceof ActivationEnd),
      filter((event: ActivationEnd) => event.snapshot.firstChild === null),
      map((event: ActivationEnd) => event.snapshot.data),
    )

  }

}
