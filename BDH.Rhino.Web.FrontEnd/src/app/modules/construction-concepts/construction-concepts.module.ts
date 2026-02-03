import { NgModule } from '@angular/core';
import { ConstructionConceptsComponent } from './page/construction-concepts.component';
import { SharedModule } from '@app/shared/shared.module';
import { ConstructionConceptRoutingModule } from './construction-concepts.routing';
import { EditManufacturerComponent } from './page/edit-manufacturer/edit-manufacturer.component';
import { EditConceptComponent } from './page/edit-concept/edit-concept.component';



@NgModule({
  declarations: [
    ConstructionConceptsComponent,
    EditManufacturerComponent,
    EditConceptComponent
  ],
  imports: [
    SharedModule,
    ConstructionConceptRoutingModule
  ]
})
export class ConstructionConceptsModule { }


