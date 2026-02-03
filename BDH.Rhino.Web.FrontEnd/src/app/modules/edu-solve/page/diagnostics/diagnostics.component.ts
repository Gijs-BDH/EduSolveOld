import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GridConfigurationService } from '../../service/grid-configuration.service';
import { EduSolveShellService } from '../../service/edu-solve-shell.service';
import { AuthService } from '@auth0/auth0-angular';
import { map } from 'rxjs';
import { ProjectVersion } from '../../models/DataTransferObjects/ProjectVersion';
import { EduSolveDataService } from '../../service/edu-solve-data.service';
import { PersistenceService } from '../../service/persistence.service';
import { BouwconceptConfigurationService } from '../../service/bouwconcept-configuration.service';
import { GridCellsProviderService } from '../../service/grid-cells-provider.service';

@Component({
  selector: 'app-diagnostics',
  templateUrl: './diagnostics.component.html',
  styleUrls: ['./diagnostics.component.scss']
})
export class DiagnosticsComponent {

    public get usedSeed() : number | null {
        if(!this.shell.generatedSchool){
            return null;
        }

        return this.shell.generatedSchool.usedSeed;
    }

    public get totalGFA(){
        if(!this.shell.generatedSchool){
            return 0;
        }

        var area = 0;
        this.shell.generatedSchool.clusters.forEach(c => {
            area += c.cells.length * (this.grid.gridSize * this.grid.gridSizeY);
        })

        return Math.round(area);
    }

    public get totalFootprint(){
        if(!this.shell.generatedSchool){
            return 0;
        }

        var area = 0;
        this.shell.generatedSchool.clusters.forEach(c => {
            c.cells.forEach(cell => {
                if(cell.point.z != 0){
                    return;
                }

                area += (this.grid.gridSize * this.grid.gridSizeY);
            })
        })

        return Math.round(area);
    }

    public get totalFacadeArea(){
        if(!this.shell.generatedSchool){
            return 0;
        }

        var area = 0;
        this.shell.generatedSchool.clusters.forEach(c => {
            c.cells.forEach(cell => {
                var nFacades = 0;
                nFacades += cell.nortFacades.filter(i => i).length;
                nFacades += cell.eastFacades.filter(i => i).length;
                nFacades += cell.southFacades.filter(i => i).length;
                nFacades += cell.westFacades.filter(i => i).length;

                area += (nFacades * this.grid.gridSize * this.grid.verdiepingshoogte)
            })
        })

        return Math.round(area);
    }

    public get projectActive(){
        if(!this.shell.generatedSchool){
            return false
        }

        if(!this.data.project){
            return false;
        }

        if(this.data.project.id === '' || this.data.project.id === '-1'){
            return false;
        }

        return true;
    }

    constructor(
        public shell : EduSolveShellService, 
        private grid : GridConfigurationService,
        private conceptService : BouwconceptConfigurationService,
        private data : EduSolveDataService,
        private snackBar : MatSnackBar, 
        public auth : AuthService,
        private persistence : PersistenceService,
        private gridCellProvider : GridCellsProviderService){

    }


    newVersion(){
        if(!this.projectActive){
            window.alert("Please set an active project first!");
            return;
        }

        var name : string | null= window.prompt('Hoe wilt u dat deze versie heet?')
        if(!name || name.length == 0){
            return;
        }

        if(!this.usedSeed){
            window.alert("Genereer eerste een geldige school configuratie.");
            return;
        }

        if(!this.conceptService.selectedProduct || !this.conceptService.selectedManufacturer){
            window.alert("Selecteer eerst een bouwconcept!");
            return;
        }

        var version : ProjectVersion = {
            name: name,
            id: "XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX",
            minimumGridSize : this.grid.smallestGridSize,
            gridRotation : this.grid.gridRotation,
            gridTranslation: this.grid.gridShift,
            levelHeight: this.grid.verdiepingshoogte,  
            obstacles : this.data.obstacles.map(o => { 
                return { 
                    x : o.location.x, 
                    y: o.location.y 
                } 
            }),
            clusters : this.data.clusters.map(c => c.mapToSchema(this.gridCellProvider)),
            constructionConceptId : this.conceptService.selectedProduct.id,
            constructionConceptProducerId : this.conceptService.selectedManufacturer.id,
            seed : this.usedSeed,
            allowDisconnected : this.data.allowDisconnected,
        }

        this.persistence
            .saveToServer(version, this.data.project!.id)
            .pipe(map(v => this.persistence.refresh()))
            .subscribe({
                next: (res) => { window.alert("Done!"); },
                error: (err) =>  { window.alert("Kon project niet opslaan. Reden: " + err.message); }
            });   
    }




    showError(){
        this.snackBar.open("Uploaden is mislukt omdat er geen geldig .glb bestand gebowd kan worden.", "OK");
    }

}
