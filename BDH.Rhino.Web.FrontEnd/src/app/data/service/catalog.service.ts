import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env';
import { Observable } from 'rxjs';
import { BuildingConceptCatalog } from "../schema/models/BuildingConceptCatalog";

@Injectable({
    providedIn: 'root'
})
export class CatalogService {

    baseUrl : string = environment.apiUrl + "/catalog";

    constructor(private httpClient : HttpClient) { 

    }


    getForClientCompany() : Observable<BuildingConceptCatalog[]>{
        var url = this.baseUrl + "/internal";

        return this.httpClient.get<BuildingConceptCatalog[]>(url);
    }

    getPublic() : Observable<BuildingConceptCatalog[]>{
        var url = this.baseUrl + "/public";

        return this.httpClient.get<BuildingConceptCatalog[]>(url);
    }

    getById(id : string){
        var url = this.baseUrl + "?id=" + id;
        return this.httpClient.get<BuildingConceptCatalog>(url);
    }
    
    add(name : string){
        var url = this.baseUrl + "?name=" + name;

        return this.httpClient.post(url, {});
    }

    delete(id : string){
        var url = this.baseUrl + "?id=" + id;

        return this.httpClient.delete(url);
    }
}
