import { Component } from '@angular/core';
import { UrbanSolveDataService } from '../../../service/urban-solve-data.service';
import { PersistenceService } from '../../../service/persistence.service';
import { ProjectVersion } from '@app/modules/urban-solve/models/ProjectVersion';
import { Project } from '@app/modules/urban-solve/models/Project';
import { PmcUnrealService } from '../../../service/pmc-unreal.service';
import { Buffer } from "buffer";
import { Observable, ReplaySubject, map, mergeMap } from 'rxjs';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-pmc-unreal',
  templateUrl: './pmc-unreal.component.html',
  styleUrls: ['./pmc-unreal.component.scss']
})
export class PmcUnrealComponent {

    public versions$ : Observable<ProjectVersion[]>;
    private refresh$ = new ReplaySubject<boolean>();
    
    constructor(public data : UrbanSolveDataService, private pmcService : PmcUnrealService, public persistence : PersistenceService, private auth: AuthService){
        this.versions$ =
            this.refresh$
            .pipe(mergeMap(v => this.persistence
                .fetchProject(this.data.projectInformation!.id)
                .pipe(map(v => v.versions)))
            )
        
    }

    public toUnreal(project : Project, version : ProjectVersion){
        this.auth.getAccessTokenSilently().subscribe({
            next: (token) => {
                var url = this.pmcService.createUrl(project.id, version.id);
                var content = {
                    link: url,
                    authenticationToken : token
                }
                var base64 = Buffer.from(JSON.stringify(content), 'binary').toString('base64');
                var target = "flexlivings-configurator://" + base64;
                if(target.length > 2048){
                    window.alert("Maximale json lengte overschreden. Lengte : " + target.length + " van 2048");
                    return;
                }
                window.open(target, "_blank", 'noreferrer');
            }
        })


    }

    public refresh() {
        this.refresh$.next(true);
    }
}
 