import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from '@env';
import { Project } from '../models/Project';
import { ProjectVersion } from "../models/DataTransferObjects/ProjectVersion";
import { Observable, ReplaySubject, switchMap } from 'rxjs';
import { Cluster } from '../models/Cluster';
import { IsPoint2d } from '@app/shared/models/IsPoint2d';

@Injectable({
    providedIn: 'root'
})
export class PersistenceService {

    baseUrl : string = environment.apiUrl + "/schoolProject";

    private refresh$ = new ReplaySubject<number>(1);
    public projects$ : Observable<Project[]>;

    constructor(private httpClient: HttpClient) { 

        this.projects$ = this.refresh$.pipe(
            switchMap((v) => { return this.fetchProjects(); })
        );

    }


    //CREATE
    createProject(name : string, basePolygon : IsPoint2d[], clusters : Cluster[]){
        var url = this.baseUrl;

        var body = {
            Name : name,
            BasePolygon : basePolygon,
            clusters : clusters.map(c => {
                return {
                    name : c.name,
                    bvo : c.bvo,
                    lowestLevel : c.lowestLevel,
                    highestLevel : c.highestLevel,
                    levels: c.levels,
                    fixedPoints : c.fixedPoints.map(p => {
                        return {
                            x : p.location.x,
                            y : p.location.y
                        }
                    }),
                    id: c.id,
                    color : c.color
                }
            })
        };

        return this.httpClient.post<Project>(url, body);
    }




    //READ
    fetchProjects(){
        return this.httpClient.get<Project[]>(this.baseUrl);
    }

    fetchProject(id : string){
        var url = this.baseUrl + "/" + id;
        return this.httpClient.get<Project>(url);
    }

    fetchVersion(versionId : string){
        var url = this.baseUrl + "/version?id=" + versionId;

        return this.httpClient.get<ProjectVersion>(url);
    }

    refresh(){
        return this.refresh$.next(1);
    }


    //UPDATE
    saveToServer(projectData: ProjectVersion, projectId : string) {
        var url = this.baseUrl + "/save";

        var body = {
            ProjectId : projectId,
            ProjectVersion : projectData
        } 
   
        return this.httpClient.post(url, body);
    }



    //DELETE
    deleteProject(id : string){
        var url = this.baseUrl + "/delete";

        var body = {
            Id : id
        };

        var options = {
            body: body
        }

        return this.httpClient.delete(url, options);
    }

    deleteVersion(project : Project, version : ProjectVersion) {
        var url = this.baseUrl + "/version"

        var body = {
            ProjectId: project.id,
            VersionId: version.id
        };

        var options = {
            body: body
        }

        return this.httpClient.delete(url, options);
    }
}

