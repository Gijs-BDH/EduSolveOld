import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '@env';
import { GebouwdInEenProject } from '../models/Bouwkosten/GebouwdInEenProject';
import { from } from 'rxjs';
import { ProfitRapport } from '../models/DataTransferObjects/ProfitRapport';
import { CalculatedTypologyOpbrengsten } from '../models/DataTransferObjects/CalculatedTypologyOpbrengsten';
import { CalculatedProfitRapport } from '../models/DataTransferObjects/CalculatedProfitRapport';

@Injectable({
    providedIn: 'root'
})
export class ProfitCalculatorService {

    baseUrl = environment.apiUrl + "/projectprofit";

    constructor() { }


    fetch(typologies: GebouwdInEenProject, totalExpenses : number, projectArea : number): Observable<ProfitRapport> {

        var rapport = new CalculatedProfitRapport(totalExpenses, projectArea);

        typologies.conceptSummaries.forEach(c => {
            var opbrengsten = new CalculatedTypologyOpbrengsten(c.concept.name, c.number, c.concept.woningenPerUnit);
            rapport.builtTypes.push(opbrengsten);
        })

        typologies.typologySummaries.forEach(t => {
            var bvo = t.volume / t.typology.brutoInhoudPerBvoBasis;
            var units = bvo / (t.typology.gemiddeldBvoPerWoning ?? 100);
            var opbrengsten = new CalculatedTypologyOpbrengsten(t.typology.name, units, 1)
            rapport.builtTypes.push(opbrengsten);
        })

        return from([rapport]);
    }




}


