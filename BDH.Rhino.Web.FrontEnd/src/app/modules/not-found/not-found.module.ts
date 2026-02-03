import { NgModule } from '@angular/core';
import { NotFoundComponent } from './page/not-found.component';
import { NotFoundRoutingModule } from './not-found.routing';
import { SharedModule } from '@shared/shared.module';



@NgModule({
  declarations: [
    NotFoundComponent
  ],
  imports: [
    NotFoundRoutingModule, SharedModule
  ]
})
export class NotFoundModule { }
