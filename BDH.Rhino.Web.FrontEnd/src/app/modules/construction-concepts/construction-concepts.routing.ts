import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConstructionConceptsComponent } from './page/construction-concepts.component';
import { EditManufacturerComponent } from './page/edit-manufacturer/edit-manufacturer.component';
import { EditConceptComponent } from './page/edit-concept/edit-concept.component';

const routes: Routes = [
    { path: '', pathMatch: 'full', component: ConstructionConceptsComponent },
    { path: 'edit-manufacturer', pathMatch: 'full', component: EditManufacturerComponent },
    { path: 'edit-component', pathMatch: 'full', component: EditConceptComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConstructionConceptRoutingModule { 

}
