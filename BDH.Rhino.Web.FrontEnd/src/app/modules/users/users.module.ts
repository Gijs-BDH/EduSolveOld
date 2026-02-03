import { NgModule } from '@angular/core';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './page/users.component';
import { SharedModule } from '@app/shared/shared.module';
import { EditComponent } from './page/edit/edit.component';
import { NewComponent } from './page/new/new.component';


@NgModule({
  declarations: [
    UsersComponent,
    EditComponent,
    NewComponent
  ],
  imports: [
    SharedModule,
    UsersRoutingModule
  ]
})
export class UsersModule { }
