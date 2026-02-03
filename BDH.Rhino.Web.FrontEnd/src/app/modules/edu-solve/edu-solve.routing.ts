import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EduSolveComponent } from './page/edu-solve.component';

const routes: Routes = [
    { path: '', pathMatch: 'full', component: EduSolveComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EduSolveRoutingModule { 

}
