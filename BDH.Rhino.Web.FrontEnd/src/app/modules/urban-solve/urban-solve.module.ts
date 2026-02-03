import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { BouwkostenModalContentComponent } from './page/bouwkosten-modal-content/bouwkosten-modal-content.component';
import { BouwkostenComponent } from './page/bouwkosten/bouwkosten.component';
import { CreditsComponent } from './page/credits/credits.component';
import { GenericMassComponentComponent } from './page/generic-mass-component/generic-mass-component.component';
import { PersistanceComponent } from './page/persistance/persistance.component';
import { ProfitModalContentComponent } from './page/profit-modal-content/profit-modal-content.component';
import { TileSplitterComponent } from './page/tile-splitter/tile-splitter.component';
import { TilepropertiesComponent } from './page/tileproperties/tileproperties.component';
import { UrbanSolveComponent } from './page/urban-solve.component'
import { UrbanSovleRoutingModule } from './urban-solve-routing.module';
import { BouwconceptInfoComponent } from './page/bouwconcept-info/bouwconcept-info.component';
import { CatalogPainterComponent } from './page/catalog-painter/catalog-painter.component';
import { CatalogSolverComponent } from './page/tileproperties/catalog-solver/catalog-solver.component';
import { BulkSolutionComponent } from './page/tileproperties/catalog-solver/bulk-solution/bulk-solution.component';
import { PmcUnrealComponent } from './page/export/pmc-unreal/pmc-unreal.component';
import { ExportComponent } from './page/export/export.component';
import { ObjComponent } from './page/export/obj-file/obj.component';
import { GlbComponent } from './page/export/glb/glb.component';
import { ColladaComponent } from './page/export/collada/collada.component';



@NgModule({
  declarations: [
    UrbanSolveComponent, 

    TilepropertiesComponent,
    GenericMassComponentComponent,
    BouwkostenComponent,
    PersistanceComponent,
    BouwkostenModalContentComponent,
    BouwconceptInfoComponent,
    CreditsComponent,
    TileSplitterComponent,
    ProfitModalContentComponent,
    BouwconceptInfoComponent,
    CatalogPainterComponent,
    CatalogSolverComponent,
    BulkSolutionComponent,
    PmcUnrealComponent,
    ExportComponent,
    ObjComponent,
    GlbComponent,
    ColladaComponent],
  imports: [UrbanSovleRoutingModule, SharedModule]
})
export class UrbanSolveModule { }
