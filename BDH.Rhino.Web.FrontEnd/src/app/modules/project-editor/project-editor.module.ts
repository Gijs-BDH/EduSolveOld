import { NgModule } from '@angular/core';

import { ProjectEditorRoutingModule } from './project-editor-routing.module';
import { ProjectEditorComponent } from './page/project-editor.component';
import { SharedModule } from '@shared/shared.module';
import { MaplayersComponent } from './page/maplayers/maplayers.component';
import { AuthorizationComponent } from './page/authorization/authorization.component';


@NgModule({
  declarations: [
    ProjectEditorComponent,
    MaplayersComponent,
    AuthorizationComponent,
  ],
  imports: [
    SharedModule,
    ProjectEditorRoutingModule
  ]
})
export class ProjectEditorModule { }
