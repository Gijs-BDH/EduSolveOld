import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompaniesRoutingModule } from './companies-routing.module';
import { CompaniesComponent } from './page/companies.component';
import { SharedModule } from '@app/shared/shared.module';


@NgModule({
    declarations: [
        CompaniesComponent
    ],
    imports: [
        SharedModule,
        CompaniesRoutingModule
    ]
})
export class CompaniesModule { }
