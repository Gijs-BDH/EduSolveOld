import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env';

@Injectable({
  providedIn: 'root'
})
export class PmcUnrealService {

    baseUrl : string = environment.apiUrl + "/infrastructure";

    constructor(private client : HttpClient) { }

    json(projectid : string, versionId : string){
        var url = this.createUrl(projectid, versionId);
        return this.client.get<string>(url);
    }


    createUrl(projectid : string, versionId : string){
        return this.baseUrl + "/pmc-json?projectId=" + projectid + "&versionId=" + versionId;
    }
}
