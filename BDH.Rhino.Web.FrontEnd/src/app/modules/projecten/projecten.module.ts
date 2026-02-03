import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectenRoutingModule } from './projecten-routing.module';
import { PageComponent } from './page/page.component';
import { SharedModule } from '@app/shared/shared.module';


@NgModule({
  declarations: [
    PageComponent
  ],
  imports: [
    SharedModule,
    ProjectenRoutingModule
  ]
})
export class ProjectenModule { }
