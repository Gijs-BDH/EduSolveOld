import { Injectable } from '@angular/core';
import { ConceptSchema } from '../../modules/concept-solve/Model/ConceptSchema';
import { environment } from '@env';
import { HttpClient } from '@angular/common/http';
import { BuildingConceptCatalog } from '../schema/models/BuildingConceptCatalog';

@Injectable({
    providedIn: 'root'
})
export class ConceptConfigurationService {

    baseurl = environment.apiUrl + "/BuildingConceptConfigurations";

    constructor(private http: HttpClient) { }


    getConfiguration(catalogId: string) {
        return this.http.get<ConceptSchema[]>(this.baseurl + "/catalog?id=" + catalogId);
    }


    createDefault(catalogId: string) {
        return this.http.post<ConceptSchema[]>(this.baseurl + "/createDefault?catalogId=" + catalogId, {});
    }


    apply(catalog : BuildingConceptCatalog, data : ConceptSchema[]){

        var body : SovleConceptRequestBody= {
            data : data,
            catalog : catalog
        }

        return this.http.post<ConceptSchema[]>(this.baseurl + "/apply", body);
    }
}

interface SovleConceptRequestBody{
    data : ConceptSchema[],
    catalog : BuildingConceptCatalog
}
