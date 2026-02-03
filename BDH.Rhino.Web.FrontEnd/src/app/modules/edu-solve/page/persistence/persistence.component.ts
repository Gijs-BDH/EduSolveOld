import { Component,  OnInit } from '@angular/core';
import { PersistenceService } from '../../service/persistence.service';
import { Project } from "../../models/Project";
import { ProjectVersion } from "../../models/DataTransferObjects/ProjectVersion";
import { AuthService } from '@auth0/auth0-angular';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EduSolveShellService } from '../../service/edu-solve-shell.service';
import { EduSolveDataService } from '../../service/edu-solve-data.service';
import { GridConfigurationService } from '../../service/grid-configuration.service';
import { PolygonToolsService } from '@app/shared/service/polygon-tools.service';
import { NewProjectPainterService } from '../../service/new-project-painter.service';
import { SolverService } from '../../service/solver.service';
import { mergeMap } from 'rxjs';
import { BouwconceptConfigurationService } from '../../service/bouwconcept-configuration.service';
import { GridCellsProviderService } from '../../service/grid-cells-provider.service';
import { IsPoint2d } from '@app/shared/models/IsPoint2d';


@Component({ 
  selector: 'app-persistence',
  templateUrl: './persistence.component.html',
  styleUrls: ['./persistence.component.scss']
})
export class PersistanceComponent implements OnInit {

    public expanded : boolean = false;

    public get activeProject() : Project | undefined {
        return this.data.project;
    }



    constructor(public persistence : PersistenceService, 
        public shell : EduSolveShellService,
        private grid : GridConfigurationService,
        public data : EduSolveDataService,
        public auth: AuthService,
        private constructionConceptService : BouwconceptConfigurationService,
        private snackbar : MatSnackBar,
        private polygonPainter : NewProjectPainterService,
        private polygonTools : PolygonToolsService,
        private solver : SolverService,
        private gridCellProvider : GridCellsProviderService){

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

        return this.activeProject.id == project.id;
    }

    activate(project : Project){
        this.data.setProject(project);
        this.shell.zoomAll();
        this.shell.drawProjectToCanvas();
    }
    

    //CREATE
    newProject(){
        this.snackbar.open("U kunt nu op de kaart een gebied tekenen waar het project zich bevindt.", "Ok");
        
        this.polygonPainter!.startDrawing().configureOnCommit(points => {
            var area = this.polygonTools.area(points) / 10000;
            if(area > 2.5){
                window.alert(`Het getekende vlak is te groot (${(area).toFixed(1)}ha). Maximale toegestane oppervlakte is 2.5ha.`)
                return;
            }

            var name = window.prompt("Hoe wilt u dat het project heet?");
            if(!name || name.length == 0){
                return;
            }

            this.persistence.createProject(name, points, this.data.clusters).subscribe({
                next : (res) => { this.rebuildList();  this.shell.setProjectData(res) },
                error : (err) => window.alert("Error")
            } )
            
        });
    }

    newSketch(){
        this.snackbar.open("U kunt nu op de kaart een gebied tekenen waar het project zich bevindt.", "Ok");
        this.shell.setSketchMode();
    }   

    saveAsProject(){
        if(!this.activeProject){
            throw new Error("Er is geen project actief.")
        }

        var name : string | null= window.prompt('Hoe wilt u dat het nieuwe project heet?')
        if(!name || name == null || name.length == 0){
            return;
        }

        this.persistence.createProject(name, this.activeProject.basePolygon, this.data.clusters).subscribe({
            next: (res) => { this.data.setProject(res); this.shell.drawProjectToCanvas(); this.shell.zoomAll(); this.rebuildList(); window.alert("All done!")  },
            error: (err) => { window.alert("Kon project niet opslaan. Reden: " + err.message); }
        })
    }

    confirmNewProject(basePolygon : IsPoint2d[]){
        var name : string | null= window.prompt('Hoe wilt u dat het nieuwe project heet?')
        if(!name || name == null || name.length == 0){
            return;
        }

        this.persistence.createProject(name, basePolygon, this.data.clusters).subscribe({
            next: (res) => { 
                this.rebuildList(); 
                this.data.setProject(res); 
                this.shell.drawProjectToCanvas();
                window.alert("Done!");  },
            error: (err) => { window.alert("Kon project niet opslaan. Reden: " + err.message); }
        })
    }

    


    //READ
    load(version : ProjectVersion){
        this.persistence.fetchVersion(version.id).pipe(
            mergeMap(response => {

                this.constructionConceptService.setManufacturer(response.constructionConceptProducerId);
                this.constructionConceptService.set(response.constructionConceptId);
                this.shell.setSchool(undefined);
                this.grid.setFromVersion(response);
                this.data.setVersion(response, this.gridCellProvider);

                return this.solver.setToShell(this.data, this.shell, this.grid.gridSize, this.grid.gridSizeY, this.gridCellProvider);
            })
        ).subscribe({
            error : (err) => window.alert(err.message)
        })
    }

    rebuildList(){
        this.persistence.refresh();
    }





    //DELETE
    deleteProject(project : Project){
        if(!window.confirm("Weet u zeker dat u dit project wilt verwijderen?")){
            return;
        };

        this.persistence.deleteProject(project.id).subscribe({
            next: (res) => { 
                this.data.setProject(undefined);
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

