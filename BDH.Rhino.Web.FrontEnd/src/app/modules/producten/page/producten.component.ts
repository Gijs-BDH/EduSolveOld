import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BouwconceptService } from '@app/data/service/bouwconcept.service';
import { BehaviorSubject, map, mergeMap, Observable } from 'rxjs';
import { NewFormUnitComponent } from './new-form-unit/new-form-unit.component';
import { EditUnitComponent } from './edit-unit/edit-unit.component';
import { BuildingConceptCatalog } from '@app/data/schema/models/BuildingConceptCatalog';
import { CatalogService } from '@app/data/service/catalog.service';
import { BuildingConcept } from '@app/data/schema/models/BuildingConcept';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { UserService } from '@app/data/service/user.service';

@Component({
    selector: 'app-bouwconcepten',
    templateUrl: './producten.component.html',
    styleUrls: ['./producten.component.scss']
})
export class ProductenComponent  {

    refresh$ : BehaviorSubject<boolean> = new BehaviorSubject(true);
    catalogs$ : Observable<BuildingConceptCatalog[]>;
    activeCompany$ : Observable<string>;
    constructor(
        public _bouwconcepten: BouwconceptService, 
        private dialog: MatDialog, 
        private catalogService : CatalogService, 
        private router : Router, 
        private auth : AuthService,
        users : UserService) {

        this.catalogs$ = this.refresh$
            .pipe(mergeMap(v => catalogService.getForClientCompany()))

        this.activeCompany$ = this.auth.user$
            .pipe(mergeMap(u => users.getByEmail(u!.email!)))
            .pipe(map(u => u.company));
    }

    editUnit(user: BuildingConcept, catalog : BuildingConceptCatalog, event : Event) {
        event.stopPropagation();
        this._bouwconcepten.getById(user.id).subscribe({
            next: (c) => this.dialog
                .open(EditUnitComponent, { data: { properties : c, catalog : catalog }, width: '80vw' })
                .afterClosed()
                .pipe(map(v => this.refresh$.next(true)))
                .subscribe()
        })
    }

    async configure(catalog : BuildingConceptCatalog, event : Event){
        event.stopPropagation();

        this.router.navigate(['/concept-solve'], { queryParams : { catalog : catalog.id }});
    }

    removeCatalog(catalog : BuildingConceptCatalog, event : Event){
        event.stopPropagation();
        if(!window.confirm(`Weet u zeker dat u catalogus ${catalog.name} wilt verwijderen? De bouwconcepten in de catalogus worden ook verwijderd. Let op: dit kan niet ongedaan gemaakt worden!`)){
            return;
        }

        this.catalogService
            .delete(catalog.id)
            .pipe(map(v => this.refresh$.next(true)))
            .subscribe();
    }

    remove(concept: BuildingConcept, event : Event) {
        event.stopPropagation();
        if (!window.confirm(`Weet u zeker dat u ${concept.name} wilt verwijderen?`)) {
            return;
        }

        this._bouwconcepten
            .delete(concept.id)
            .pipe(map(v => this.refresh$.next(true)))
            .subscribe();
    }

    newConceptUnit(catalogId : string) {
        var options = {
            width: '40vw',
            data :  {
                catalog : catalogId
            }
        }
        this.dialog
            .open(NewFormUnitComponent, options)
            .afterClosed()
            .pipe(map(v => this.refresh$.next(true)))
            .subscribe();
    }

    newCatalog(){
        var name = window.prompt("Hoe wilt u dat de nieuwe catalogus heet?");
        if(!name){
            return;
        }

        this.catalogService.add(name).pipe(map(v => this.refresh$.next(true))).subscribe();
    }

    togglePublic(product : BuildingConcept, event : Event){
        event.stopPropagation();

        if(product.isPrivate){
            this._bouwconcepten.setPublic(product.id).subscribe({
                next: (v) => product.isPrivate = v.isPrivate
            });
        }
        else {
            this._bouwconcepten.setPrivate(product.id).subscribe({
                next:(v) => product.isPrivate = v.isPrivate
            });
        }
    }

}
