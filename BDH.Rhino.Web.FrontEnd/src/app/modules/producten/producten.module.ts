import { NgModule } from '@angular/core';

import { ProductenRoutingModule } from './producten-routing.module';
import { ProductenComponent } from './page/producten.component';
import { SharedModule } from '@app/shared/shared.module';
import { NewFormUnitComponent } from './page/new-form-unit/new-form-unit.component';
import { EditUnitComponent } from './page/edit-unit/edit-unit.component';


@NgModule({
    declarations: [
        ProductenComponent,
        NewFormUnitComponent,
        EditUnitComponent
    ],
    imports: [
        SharedModule,
        ProductenRoutingModule
    ]
})
export class ProductenModule { }
