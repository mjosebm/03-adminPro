import { Component, OnDestroy } from '@angular/core';
import { Observable, interval, Subscription } from 'rxjs';
import { retry, take, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnDestroy{

public intervalSubs : Subscription;

  constructor() {

    //Por qué no funciona? Violation "Added non-passive event listener to a scroll-blocking wheel event"

    // this.retornaObservable().pipe(
    //   retry(2) //Entre parentesis se pone el número de veces que se desea reintentar. 
    // ).subscribe(
    //   valor => console.log('Subs: ', valor),
    //   (error) => console.warn('Error', error),
    //   () => console.info('Obs terminado')
    // );

    //Ejercicio 2 (Interval)
    // this.retornaIntervalo()
    //   .subscribe(console.log);


    //Ejercicio 3(Interval with filter)
    // this.retornaIntervaloPares()
    //   .subscribe(console.log);

    //Ejercicio 4( Usando Unsubscribe)
    this.intervalSubs = this.retornaIntervalo3().subscribe(console.log);


  }
  ngOnDestroy(): void {
   this.intervalSubs.unsubscribe();
  }

  retornaIntervalo3(): Observable<number> {
    return interval(500)
      .pipe(
        map(valor => valor + 1),
        filter(valor => (valor % 2 === 0) ? true : false),
      );
  }

  retornaIntervaloPares(): Observable<number> {
    return interval(500)
      .pipe(
        map(valor => valor + 1),
        filter(valor => (valor % 2 === 0) ? true : false),
        take(10),
      );
  }


  retornaIntervalo(): Observable<string> {

    return interval(1000)
      .pipe(
        take(4),
        map(valor => 'Hola Mundo ' + (valor + 1))
      )
  }


  retornaObservable(): Observable<number> {
    let i = -1;
    return new Observable<number>(observer => {

      const intervalo = setInterval(() => {

        i++;
        observer.next(i);

        if (i === 4) {
          clearInterval(intervalo);
          observer.complete();
        }

        if (i === 2) {
          observer.error('i llego al valor de 2')
        }


      }, 1000)

    });
  }
}
