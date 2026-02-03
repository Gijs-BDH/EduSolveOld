import { Injectable } from '@angular/core';
import { Observable, filter, first, from, of } from 'rxjs';
import { IsBouwkostenBasisTypologie, bouwkostenBasisTypologieCollectie } from '../schema/models/bouwkosten-basis-typologie';

@Injectable({
    providedIn: 'root'
})
export class BouwkostenBasisTypologieService {

    constructor() {

    }

    get(): Observable<IsBouwkostenBasisTypologie[]> {
        return of(bouwkostenBasisTypologieCollectie);
    }

    getByName(name: string): Observable<IsBouwkostenBasisTypologie> {
        return from(bouwkostenBasisTypologieCollectie).pipe(first(v => v.name === name));
    }

    getByNameCached(name: string): IsBouwkostenBasisTypologie {
        var concept = bouwkostenBasisTypologieCollectie.find(v => v.name === name);
        if(!concept){
            throw new Error("Attempted to get a cached value that was not cached.");
        }

        return concept;
    }
}
