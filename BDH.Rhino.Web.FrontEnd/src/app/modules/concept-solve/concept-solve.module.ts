import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConceptSolveRoutingModule } from './concept-solve-routing.module';
import { ConceptSolveComponent } from './page/concept-solve.component';
import { SharedModule } from '@app/shared/shared.module';
import { ConceptenComponent } from './page/concepten/concepten.component';


@NgModule({
  declarations: [
    ConceptSolveComponent,
    ConceptenComponent
  ],
  imports: [
    SharedModule,
    ConceptSolveRoutingModule
  ]
})
export class ConceptSolveModule { }
