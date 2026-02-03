import { Component,  OnInit } from '@angular/core';
import { PersistenceService } from '../../service/persistence.service';
import { ProjectVersion } from '../../models/ProjectVersion';
import { Project } from '../../models/Project';
import { AuthService } from '@auth0/auth0-angular';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GeoJsonConvert } from '../../../../shared/service/static/GeoJsonConvert';
import { UrbanSolveShellService } from '../../service/urban-solve-shell.service';
import { UrbanSolveDataService } from '../../service/urban-solve-data.service';
import { IsPoint2d } from '@app/shared/models/IsPoint2d';


@Component({ 
  selector: 'app-persistance',
  templateUrl: './persistance.component.html',
  styleUrls: ['./persistance.component.scss']
})
export class PersistanceComponent implements OnInit {

    projects : Project[] = [];

    public expanded : boolean = false;

    public get activeProject() : Project | null {
        return this.data.projectInformation;
    }



    constructor(private persistence : PersistenceService, 
        public shell : UrbanSolveShellService,
        public data : UrbanSolveDataService,
        public auth: AuthService,
        private snackbar : MatSnackBar){

    }

    ngOnInit(): void {
        this.auth.isAuthenticated$.subscribe(isAuthenticated => {
            if (!isAuthenticated) {
                return;
            }

            this.rebuildList();
        });      
    }

    projectIsActive(project : Project) : boolean{
        if(this.activeProject == null){
            return false;
        }

        return this.activeProject.name == project.name;
    }

    activate(project : Project){
        this.data.setProject(project);
        this.shell.drawProjectToCanvas();
        this.shell.zoomAll();
    }
    

    //CREATE
    newProject(){
        this.snackbar.open("U kunt nu op de kaart een gebied tekenen waar het project zich bevindt.", "Ok");
        this.shell.startDrawingPolygon().configureOnCommit(polygon => {
            if(polygon.length > 2){
                this.confirmNewProject(polygon);
            }
        });
    }

    newSketch(){
        this.snackbar.open("U kunt nu op de kaart een gebied tekenen waar het project zich bevindt.", "Ok");
        this.shell.startDrawingPolygon().configureOnCommit(polygon => {
            if(polygon.length > 2){
                this.data.setProject({
                    id : "",
                    name : "sketch",
                    versions : [],
                    basePolygon : GeoJsonConvert.toGeoJson(polygon)
                }); 
                this.shell.drawProjectToCanvas();
            }
        });
    }

    saveAsProject(){
        if(!this.shell.projectIsActive){
            throw new Error("Er is geen project actief.")
        }

        var name : string | null= window.prompt('Hoe wilt u dat het nieuwe project heet?')
        if(!name || name == null || name.length == 0){
            return;
        }

        this.persistence.createProject(name, GeoJsonConvert.fromGeoJson(this.data.projectInformation!.basePolygon)).subscribe({
            next: (res) => { 
                this.newVersion(res)  },
            error: (err) => { window.alert("Kon project niet opslaan. Reden: " + err.message); }
        })
    }

    confirmNewProject(basePolygon : IsPoint2d[]){
        var name : string | null= window.prompt('Hoe wilt u dat het nieuwe project heet?')
        if(!name || name == null || name.length == 0){
            return;
        }

        this.persistence.createProject(name, basePolygon).subscribe({
            next: (res) => { 
                this.rebuildList(); 
                this.data.setProject(res); 
                this.shell.drawProjectToCanvas();
                window.alert("Done!");  },
            error: (err) => { window.alert("Kon project niet opslaan. Reden: " + err.message); }
        })
    }

    newVersion(project : Project){
        var name : string | null= window.prompt('Hoe wilt u dat deze versie heet?')
        if(!name || name.length == 0){
            return;
        }

        this.persistence.saveToServer(this.data, project.id, name).subscribe({
            next: (res) => { 
                this.rebuildList(); 
                window.alert("Done!"); },
            error: (err) =>  { window.alert("Kon project niet opslaan. Reden: " + err.message); }
        });
    }



    //READ
  load(project: Project, version: ProjectVersion) {
    this.data.setProjectVersion(version);
        this.persistence.setToShell(project.id, version.id, this.data, this.shell)
            .subscribe({
                error: (err) => { window.alert("Kon de opgegeven versie niet laden. Reden: " + err.message); }
            })
    }



    rebuildList(){
        this.projects = [];

        this.persistence.fetchProjects().subscribe({
            next: (res) => {
                res.forEach((v : any) => {
                    this.projects.push(v);
                })
            },
            error: (err) => window.alert("Kon geen project laden. Reden: " + err.message)
        });
    }

    //UPDATE
    save(project : Project, version : ProjectVersion) {
        if(!window.confirm("Wilt u de data van deze versie overschrijven?")){
            return;
        }
        this.persistence.saveToServer(this.data, project.id, version.name).subscribe({
            next: (res) => { window.alert("All done!"); },
            error: (err) => { window.alert(err.message); },
        })
    }




    //DELETE
    deleteProject(project : Project){
        if(!window.confirm("Weet u zeker dat u dit project wilt verwijderen?")){
            return;
        };

        this.persistence.deleteProject(project.id).subscribe({
            next: (res) => { 
                this.data.setProject(null);
                this.shell.drawProjectToCanvas();
                this.rebuildList(); 
                window.alert("All done."); },
            error: (err) => window.alert(err.message) 
        })
    }

    deleteVersion(project : Project, version : ProjectVersion){
        if(!window.confirm("Weet u zeker dat u deze versie wilt verwijderen?")){
            return;
        };

        this.persistence.deleteVersion(project, version).subscribe({
            next: (res) => { this.rebuildList(); window.alert("All done."); },
            error: (err) => window.alert(err.message) 
        })
    }    
}

