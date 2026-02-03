import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { environment } from '@env';
import { BuildingConceptsResponse } from "@app/data/schema/responses/BuildingConceptsResponse";
import { NewBouwconceptRequest, UpdateBouwconceptRequest } from "../schema/requests/NewBouwconceptRequest";
import { BuildingConcept } from '../schema/models/BuildingConcept';




@Injectable({
    providedIn: 'root'
})
export class BouwconceptService {
    baseUrl : string = environment.apiUrl + "/bouwconcepten/";

    constructor(private http: HttpClient) {                        

    }


    //===== CREATE
    new(properties : NewBouwconceptRequest, file : File){
        const formData = new FormData();
        formData.append('file', file, file.name);
        for ( var key in properties ) {
            formData.append(key, properties[key]);
        }
        return this.http.post(this.baseUrl, formData);
    }


    //===== READ
    get(){
        return this.http.get<BuildingConceptsResponse>(this.baseUrl);
    }

    getFromParentCompany(){
        return this.http.get<BuildingConceptsResponse>(this.baseUrl + "company");
    }

    getById(id : string){
        return this.http.get<BuildingConcept>(this.baseUrl + id);
    }
    
    getGeometry(id : string){
        return this.http.get<ArrayBuffer>(this.baseUrl + "geometry?id=" + id);
    }

    //===== UPDATE
    update(properties : UpdateBouwconceptRequest){
        var url = this.baseUrl + "update"

        return this.http.post(url, properties)
    }

    assignGeometry(file : File, id : string, modelWidth: number, modelDepth: number, modelHeight: number){
        var url = this.baseUrl + "upload";

        const formData = new FormData();
        formData.append('file', file, file.name);
        formData.append('id', id);
        formData.append('modelWidth', modelWidth.toString());
        formData.append('modelDepth', modelDepth.toString());
        formData.append('modelHeight', modelHeight.toString());
        
        return this.http.post(url, formData, {reportProgress: true, observe: 'events'});
    }

    setPublic(id : string){
        return this.http.put<BuildingConcept>(this.baseUrl + "setPublic?id=" + id, {});
    }

    setPrivate(id : string){
        return this.http.put<BuildingConcept>(this.baseUrl + "setPrivate?id=" + id, {});
    }

    //===== DELETE
    delete(id : string){
        var body = {
            id: id
        }
        return this.http.post(this.baseUrl + "delete", body)
    }
}