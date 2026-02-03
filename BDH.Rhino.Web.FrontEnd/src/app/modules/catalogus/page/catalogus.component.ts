import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BouwconceptService } from '@app/data/service/bouwconcept.service';
import { Observable, map } from 'rxjs';
import { InfoComponent } from './info/info.component';
import { CompanyService } from '@app/data/service/company.service';
import { UserFavoritesService } from '@app/data/service/user-favorites.service';
import { BuildingConcept } from '@app/data/schema/models/BuildingConcept';

interface ValueFilter{
    name : string;
    enabled : boolean;
    value : number;
    minVal : number;
    maxVal : number;
    allow(item : BuildingConcept, number : number) : boolean;
}

interface BooleanFilter{
    name : string;
    enabled : boolean;
    allow(item : BuildingConcept, value : boolean) : boolean;
}



@Component({
  selector: 'app-catalogus',
  templateUrl: './catalogus.component.html',
  styleUrls: ['./catalogus.component.scss']
})
export class CatalogusComponent implements OnInit {
    public concepten : BuildingConcept[] = [];

    valueFilters : ValueFilter[];
    boolFilters : BooleanFilter[];

    public get filteredConcepten(){
        var list = this.concepten;

        this.boolFilters.forEach(f => {
            list = list.filter(val => f.allow(val, f.enabled))
        })

        this.valueFilters.forEach(filter => {
            if(!filter.enabled){
                return;
            }

            list = list.filter(val => filter.allow(val, filter.value))
        })

        return list;

    }

    sortOptions = ['name', 'bvo', 'price'];
    selectedSort : string | undefined;

    public get sortedConcepten(){
        if(!this.selectedSort){
            return this.filteredConcepten;
        }

        var sortedArray = [...this.filteredConcepten];
        switch(this.selectedSort[0]){
            case 'name':
                sortedArray.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
                break;

            case 'bvo':
                sortedArray.sort((a, b) => a.bvoPerUnit = b.bvoPerUnit);
                break;

            case 'price':
                sortedArray.sort((a, b) => a.productieKostenPerUnit - b.productieKostenPerUnit);
                break;
        }

        return sortedArray;
    }
    
    constructor(private bouwconcepten : BouwconceptService, private _companies : CompanyService, public favorites : UserFavoritesService, private dialog : MatDialog){
        this.valueFilters = 
        [
            {
                name : "Min BVO: ",
                enabled : false,
                value : 100,
                minVal : 0,
                maxVal : 500,
                allow : (item, val) => item.bvoPerUnit >= val
            },
            {
                name : "Max BVO: ",
                enabled : false,
                value : 400,
                minVal : 0,
                maxVal : 500,
                allow : (item, val) => item.bvoPerUnit <= val
            },
            {
                name : "Max prijs: ",
                enabled : false,
                value : 250000,
                minVal : 0,
                maxVal : 5000000,
                allow : (item, val) => item.productieKostenPerUnit <= val
            }
        ]

        this.boolFilters = [];
    }

    ngOnInit(): void {
       this.refresh();
       this.refreshCompanies();
    }

    refresh(){
        this.bouwconcepten
            .get()
            .pipe(map(v => v.buildingConcepts.filter(c => !c.isPrivate)))
            .subscribe({
                next: (res) => {
                    this.concepten = res
                },
                error : (err) => window.alert(err.message)
            })
    }

    refreshCompanies(){
        this._companies.get().subscribe({
            next : (val) => {
                this.boolFilters.length = 0;
                val.companies.forEach(c => {
                    this.boolFilters.push({
                        name : c,
                        enabled : true,
                        allow : (i, val) => i.company == c ? val : true
                    })
                })
            },
            error : (err) => {
                window.alert(err.message);
            }
        })
    }

    show(properties : BuildingConcept){
        var config = {
            data : properties,
            width: '50vw'
        }

        this.dialog.open(InfoComponent, config);
    }

    toggleIsFavorite(tile : BuildingConcept){
        var obs : Observable<boolean>;
        if(tile.isFavorited){
            obs =  this.favorites.unfavorite(tile.id)
        }
        else{
            obs = this.favorites.favorite(tile.id)
        }

        obs
            .pipe(map(v => tile.isFavorited = v))
            .subscribe({
                error: (err) => alert(err.message)
            })
    }
}