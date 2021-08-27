import { Component, Input, ViewChild } from '@angular/core';
import * as Chart from 'chart.js';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: [
  ]
})
export class DonaComponent {
  @Input('title') titulo: string = "Sin Título"; 
  @Input('labels') labels : string[] = ['Vacío'];
  @Input('data') data : number[] = [300];
  @Input('colors') backgroundColor : string[] = ['#6857E6'];
  canvas: any;
  ctx: any;
  @ViewChild('mychart') mychart: any;

  ngAfterViewInit() {
    this.canvas = this.mychart.nativeElement;
    this.ctx = this.canvas.getContext('2d');

    new Chart(this.ctx, {
      type: 'doughnut',
      data: {
        labels: this.labels,
        datasets: [{
          data: this.data,
          backgroundColor: this.backgroundColor
        }]
      },
    });
  }
}
