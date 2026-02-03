import { Injectable } from '@angular/core';
import { BuildingConcept } from '@app/data/schema/models/BuildingConcept';
import { BouwconceptService } from '@app/data/service/bouwconcept.service';
import { map } from 'rxjs';

//downloads and caches building building concept properties
//this service is completely useless, it was originally created because there were a lot of calls to the api requesting the building concept geometries, potentially resulting in constantly downloading serveral mb's of meshes constantly.
//this has been fixed with the 

@Injectable({
    providedIn: 'root'
})
export class BuildingConceptPropertiesDictionaryService {
    private _items : BuildingConcept[] = [];

    public get items() : BuildingConcept[]{
        return this.filterFavorite? this.filterByFavorite() : this._items;
    };

    filterFavorite: boolean = false;

    constructor(private concepten : BouwconceptService) { }

    refresh(){
        return this.concepten.get().pipe(
            map(v => {
                this._items.length = 0;
                v.buildingConcepts.forEach(c => {
                    this.add(c);
                })
                return v;
            }));
    }

    getByIdOrThrow(id: string): BuildingConcept {
        for (var i = 0; i < this._items.length; i++) {
            if (this._items[i].id == id) {
                return this._items[i];
            }
        }

        throw new Error("Data model concept properties not found in dictionary.");
    }

    getByNameOrThrow(name: string): BuildingConcept {
        for (var i = 0; i < this._items.length; i++) {
            if (this._items[i].name == name) {
                return this._items[i];
            }
        }

        throw new Error("Data model concept properties not found in dictionary.");
    }

    private add(properties: BuildingConcept) {
        for (var i = 0; i < this._items.length; i++) {
            if (this._items[i].id == properties.id) {
                this._items[i] = properties;
                return;
            }
        }

        this._items.push(properties);
        this._items.sort((a: BuildingConcept, b: BuildingConcept) => {
            if (a.name < b.name) {
                return -1
            }

            if (a.name > b.name) {
                return 1;
            }

            return 0;
        });
    }

    filterByFavorite(){
        return this._items.filter(c => c.isFavorited);
    }
}
