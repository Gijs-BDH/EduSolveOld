import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ConstructionConceptProducer } from '@data/schema/models/ConstructConceptProducer';
import { ConstructionConcept } from '@data/schema/models/ConstructionConcept';
import { environment } from '@env';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ConstructionConceptService {

    baseurl = environment.apiUrl + "/constructionconcept";

    constructor(private httpClient: HttpClient) {

    }

    //CREATE
    addManufacturer(name : string){
        var body = {
            name: name
        };
        var url = this.baseurl + "/new-manufacturer";
        return this.httpClient.post<ConstructionConceptProducer>(url, body);
    }

    addConcept(name : string, spanWidth : number, spanLength : number, manufacturerId : string){
        var body = {
            name: name,
            spanLength: spanLength,
            spanWidth: spanWidth,
            manufacturerId: manufacturerId
        }
        var url = this.baseurl + "/new-construction-concept";
        return this.httpClient.post<ConstructionConcept>(url, body);
    }


    //READ
    getManufacturers(): Observable<ConstructionConceptProducer[]> {
        var url = this.baseurl + "/manufacturers"
        return this.httpClient.get<ConstructionConceptProducer[]>(url);
    }

    getByManufacturer(manufacturerid : string): Observable<ConstructionConcept[]> {
        var url = this.baseurl + "?manufacturerId=" + manufacturerid;
        return this.httpClient.get<ConstructionConcept[]>(url);
    }

    getComponent(id : string){
        var url = this.baseurl + "/component?conceptId=" + id;
        return this.httpClient.get<ConstructionConcept>(url);
    }


    //UPDATE
    updateConcept(conceptId : string, name : string, spanWidth : number, spanLength : number){
        var body = {
            conceptId : conceptId,
            name : name,
            spanLength : spanLength,
            spanWidth : spanWidth
        }
        var url = this.baseurl + "/update-concept";
        return this.httpClient.post<ConstructionConcept>(url, body);
    }


    //DELETE
    deleteComponent(id : string){
        var url = this.baseurl + "/component?id=" + id;
        return this.httpClient.delete(url);
    }

    deleteManufacturer(id : string){
        var url = this.baseurl + "/manufacturer?id=" + id;
        return this.httpClient.delete(url);
    }
}