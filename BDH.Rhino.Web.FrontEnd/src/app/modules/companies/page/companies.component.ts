import { Component } from '@angular/core';
import { CompanyService } from '@app/data/service/company.service';
import { GetCompaniesResponse } from "@app/data/schema/responses/GetCompaniesResponse";
import { Observable, ReplaySubject, share, switchMap } from 'rxjs';


@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss']
})
export class CompaniesComponent {
    companies$ : Observable<GetCompaniesResponse>;
    private refresh$ = new ReplaySubject(1);

    public displayedColumns: string[] = ['name', 'delete'];


    constructor(private _companies : CompanyService){
        this.companies$ = this.refresh$
            .pipe(
                switchMap(() => _companies.get()),
                share()
            )

        this.refresh$.next({});
    }

    add(){
        var newName = window.prompt("Wat zal de nieuwe naam worden?");
        if(!newName){
            return;
        }

        this._companies.add(newName).subscribe({
            next: (res) => {
                this.refresh$.next({});
                window.alert("Alles okay!");
            },
            error: (err) => {
                this.refresh$.next({});
                window.alert("Niet gelukt...");
            }
        })
    }

    remove(company : string){
        this._companies.delete(company).subscribe({
            next: (ans) => this.refresh$.next({}),
            error: (err) => window.alert("Niet gelukt...")
        })
    }
}
