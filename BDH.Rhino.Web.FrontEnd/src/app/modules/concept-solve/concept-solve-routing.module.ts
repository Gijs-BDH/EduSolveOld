import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConceptSolveComponent } from './page/concept-solve.component';

const routes: Routes = [
    { path: '', pathMatch: 'full', component: ConceptSolveComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConceptSolveRoutingModule { }
