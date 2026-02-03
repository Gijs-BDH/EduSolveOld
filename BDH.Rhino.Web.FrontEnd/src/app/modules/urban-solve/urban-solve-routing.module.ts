import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UrbanSolveComponent } from './page/urban-solve.component';

const routes: Routes = [
  {
    path: '',
    component: UrbanSolveComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UrbanSovleRoutingModule { }