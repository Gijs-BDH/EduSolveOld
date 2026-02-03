import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { BuildingConcept } from '@app/data/schema/models/BuildingConcept';
import { BuildingConceptCatalog } from '@app/data/schema/models/BuildingConceptCatalog';
import { UserService } from '@app/data/service/user.service';
import { EditUnitComponent } from '@app/modules/producten/page/edit-unit/edit-unit.component';
import { NewFormUnitComponent } from '@app/modules/producten/page/new-form-unit/new-form-unit.component';
import { ProjectInformation } from '@app/modules/urban-solve/models/ProjectInformation';
import { GeoJsonConvert } from '@app/shared/service/static/GeoJsonConvert';
import { PersistenceService } from '@app/modules/urban-solve/service/persistence.service';
import { ProjectVersion } from '@app/modules/urban-solve/models/ProjectVersion';
import { Project } from '@app/modules/urban-solve/models/Project';
import { UrbanSolveDataService } from '@app/modules/urban-solve/service/urban-solve-data.service';
import { UrbanSolveShellService } from '@app/modules/urban-solve/service/urban-solve-shell.service';
import { AuthService } from '@auth0/auth0-angular';
import { BehaviorSubject, Observable, mergeMap, map, ReplaySubject } from 'rxjs';
import * as edu from '../../edu-solve/models/Project';
import * as p from '../../edu-solve/service/persistence.service';
import { EduSolveDataService } from '@app/modules/edu-solve/service/edu-solve-data.service';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {
    refresh$ : ReplaySubject<void> = new ReplaySubject();
    projects$ : Observable<Project[]>;
    eduProjects$ : Observable<edu.Project[]>;
    activeCompany$ : Observable<string>;

    urbanSolveDataSource = new MatTableDataSource<Project>();
    eduSolveDataSource = new MatTableDataSource<edu.Project>();
    displayedColumnsUrbanSolve = ["createdBy", "name", "createdDate", "goto", "versions", "delete"];
    displayedColumnsEduSolve = ["createdBy", "name", "createdDate", "goto", "delete"];

    constructor(
        private dialog: MatDialog, 
        private projectenService : PersistenceService, 
        private router : Router, 
        private auth : AuthService,
        private urbanSolveData : UrbanSolveDataService,
        private urbanSolveShell : UrbanSolveShellService,
        private urbanSolvePersistence: PersistenceService,
        private eduProjectenService : p.PersistenceService,
        private eduSolveData : EduSolveDataService,
        users : UserService) {

        this.projects$ = this.refresh$
            .pipe(mergeMap(v => projectenService.fetchProjects()))

        this.eduProjects$ = this.refresh$
            .pipe(mergeMap(v => eduProjectenService.fetchProjects()));

        this.activeCompany$ = this.auth.user$
            .pipe(mergeMap(u => users.getByEmail(u!.email!)))
            .pipe(map(u => u.company));
    }

    ngOnInit(): void {
        this.projects$.subscribe(val => {
            this.urbanSolveDataSource.data = val
        });

        this.eduProjects$.subscribe(val => {
            this.eduSolveDataSource.data = val
        });

        this.refresh$.next();
    }

    refresh(){
        this.refresh$.next();
    }

    gotoUrbanSolveProject(project : Project){
        this.urbanSolveData.setProject(project);
        this.router.navigate(["/project-editor/urban-solve"]);
    }   

  gotoUrbanSolveProjectVersion(project: Project, projectVersion: ProjectVersion) {    
      this.urbanSolveData.setProject(project);
      this.urbanSolveData.setProjectVersion(projectVersion);
        this.urbanSolvePersistence.setToShell(project.id, projectVersion.id, this.urbanSolveData, this.urbanSolveShell).subscribe({
            next: () => this.router.navigate(["/project-editor/urban-solve"])
        })
        
    } 

    deleteUrbanSolveProject(project : Project){
        if(!this.confirm()){
            return;
        }

        this.projectenService.deleteProject(project.id).subscribe({
            next: val => {
                this.refresh();
            },
            error: err => {

            }
        })
    }

    gotoEduSolveProject(project : edu.Project){
        this.eduSolveData.setProject(project);
        this.router.navigate(["/project-editor/edu-solve"]);
    }   

    deleteEduSolveProject(project : edu.Project){
        if(!this.confirm()){
            return;
        }

        this.eduProjectenService.deleteProject(project.id).subscribe({
            next: val => {
                this.refresh();
            },
            error: err => {

            }
        })
    }
    
    confirm(){
        return window.confirm("Weet u zeker dat u dit project wilt verwijderen? Dit kan niet ongedaan gemaakt worden.");
    }
}
