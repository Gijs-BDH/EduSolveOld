import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env';
import { GetCompaniesResponse } from '../schema/responses/GetCompaniesResponse';
@Injectable({
    providedIn: 'root'
})
export class CompanyService {

    baseUrl: string = environment.apiUrl + "/companies";

    constructor(private http: HttpClient) { }

    //CREATE
    add(name: string) {
        var body = {
            Name: name
        };

        return this.http.post(this.baseUrl, body);
    }

    //READ
    get() {
        return this.http.get<GetCompaniesResponse>(this.baseUrl);
    }

    //DELETE
    delete(name: string) {
        var url = this.baseUrl + "?name=" + name;

        return this.http.delete(url);
    }
}


