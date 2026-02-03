import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { environment } from '@env';
import { BriefBuilderProject } from "@app/data/schema/responses/BriefBuilderProject";

@Injectable({
  providedIn: 'root'
})
export class BriefBuilderService {
  baseUrl: string = environment.apiUrl + "/briefbuilder/";

  constructor(private http: HttpClient) {

  }



  //===== READ
  getList() {
    return this.http.get<BriefBuilderProject[]>(this.baseUrl + "getlist");
  };

  get(id: string) {
    return this.http.get<BriefBuilderProject>(this.baseUrl + "getbyid/" + id);
  };
}
