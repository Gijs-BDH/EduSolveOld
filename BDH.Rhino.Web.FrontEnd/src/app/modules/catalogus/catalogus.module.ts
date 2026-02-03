import { NgModule } from '@angular/core';

import { CatalogusRoutingModule } from './catalogus-routing.module';
import { CatalogusComponent } from './page/catalogus.component';
import { SharedModule } from '@app/shared/shared.module';
import { InfoComponent } from './page/info/info.component';


@NgModule({
  declarations: [
    CatalogusComponent,
    InfoComponent
  ],
  imports: [
    SharedModule,
    CatalogusRoutingModule
  ]
})
export class CatalogusModule { }
