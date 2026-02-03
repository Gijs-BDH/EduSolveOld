import { NgModule } from '@angular/core';
import { ProfileComponent } from './page/profile.component';
import { SharedModule } from '@app/shared/shared.module';



@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [
    SharedModule
  ]
})
export class ProfileModule { }
