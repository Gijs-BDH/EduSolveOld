import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { environment } from '@env';
import { GebouwdInEenProject } from '../models/Bouwkosten/GebouwdInEenProject';
import { BouwkostenRapport } from '../models/Bouwkosten/BouwkostenRapport';
import { ConceptSummary } from '../models/Bouwkosten/ConceptSummary';
import { CalculatedConcept } from '../models/Bouwkosten/CalculatedConcept';
import { CalculatedRapport } from '../models/Bouwkosten/CalculatedRapport';
import { CalculatedTypology } from '../models/Bouwkosten/CalculatedTypology';
import { TypologySummary } from '../models/Bouwkosten/TypologySummary';

//this service is a mess.

@Injectable({
    providedIn: 'root'
})
export class BouwkostenRapportService {
    baseUrl = environment.apiUrl + "/bouwkosten"

    constructor() { 

    }


    fetch(typologies: GebouwdInEenProject): Observable<BouwkostenRapport> {
        var typologieen: TypologySummary[] = typologies.typologySummaries.map(v => {
            return new CalculatedTypology(v);
        });

        var concepten: ConceptSummary[] = typologies.conceptSummaries.map(v => {
            return new CalculatedConcept(v);
        });

        var rapport: BouwkostenRapport = new CalculatedRapport(typologieen, concepten)

        return from([rapport]);
    }
}


