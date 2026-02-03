import { NgModule } from '@angular/core';

import { EduSolveRoutingModule } from './edu-solve.routing';
import { EduSolveComponent } from './page/edu-solve.component';
import { SharedModule } from '@shared/shared.module';
import { GridSizeComponent } from './page/grid-size/grid-size.component';
import { ClustersComponent } from './page/clusters/clusters.component';
import { DiagnosticsComponent } from './page/diagnostics/diagnostics.component';
import { PersistanceComponent } from './page/persistence/persistence.component';
import { BulkSolutionsComponent } from './page/bulk-solutions/bulk-solutions.component';
import { SolverComponent } from './page/solver/solver.component';
import { BulkSolutionsFilterComponent } from './page/bulk-solutions-filter/bulk-solutions-filter.component';
import { BouwconceptComponent } from './page/bouwconcept/bouwconcept.component';
import { ShapeDialogComponent } from './page/clusters/shape-dialog/shape-dialog.component';
import { ConnectionsDialogComponent } from './page/clusters/connections-dialog/connections-dialog.component';
import { ViewComponent } from './page/view/view.component';
import { BriefbuilderComponent } from './page/briefbuilder/briefbuilder.component';


@NgModule({
  declarations: [
    EduSolveComponent,
    GridSizeComponent,
    ClustersComponent,
    DiagnosticsComponent,
    PersistanceComponent,
    BulkSolutionsComponent,
    SolverComponent,
    BulkSolutionsFilterComponent,
    BouwconceptComponent,
    ShapeDialogComponent,
    ConnectionsDialogComponent,
    ViewComponent,
    BriefbuilderComponent
  ],
  imports: [
    SharedModule,
    EduSolveRoutingModule
  ]
})
export class EduSolveModule { }
