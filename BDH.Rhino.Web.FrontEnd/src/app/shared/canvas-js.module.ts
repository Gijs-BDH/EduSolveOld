import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import * as CanvasJSAngularChart from '@lib/canvas-js/canvasjs.angular.component';

var CanvasJSChart = CanvasJSAngularChart.CanvasJSChart;

@NgModule({
  declarations: [
    CanvasJSChart
  ],
  imports: [
    CommonModule
  ],
  exports:[
    CanvasJSChart
  ]
})
export class CanvasJsModule { }
