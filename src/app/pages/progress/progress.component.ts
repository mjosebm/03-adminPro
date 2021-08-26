import { Component, } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styles: [
  ]
})
export class ProgressComponent {
  progreso1: number = 25;
  progreso2: number = 45;


  get getPorcentaje1() {
    return `${this.progreso1}%`;
  }

  get getPorcentaje2() {
    return `${this.progreso2}%`;
  }

  cambioValor1(valor: number) {
    this.progreso1 = valor;
  }

  cambioValor2(valor: number) {
    this.progreso2 = valor;
  }
}
