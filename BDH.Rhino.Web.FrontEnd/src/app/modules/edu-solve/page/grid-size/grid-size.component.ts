import { Component } from '@angular/core';
import { GridConfigurationService } from '../../service/grid-configuration.service';
import { EduSolveShellService } from '../../service/edu-solve-shell.service';
import { BouwconceptConfigurationService } from '../../service/bouwconcept-configuration.service';
import { EduSolveViewerService } from '../../service/edu-solve-viewer.service';

@Component({
    selector: 'app-grid-size',
    templateUrl: './grid-size.component.html',
    styleUrls: ['./grid-size.component.scss']
})
export class GridSizeComponent {

    public get smallestGridSize(){
        return this.grid.smallestGridSize;
    }

    public get necessaryTileSpanX() : number {
        return this.grid.necessaryTileSpanX;
    }
    public get necessaryTileSpanY() : number {
        return this.grid.necessaryTileSpanY;
    }

    public get gridSize () : number{
        return this.grid.gridSize;
    } 

    public get gridSizeY() : number{
        return this.grid.gridSizeY;
    }

    public get verdiepingsHoogte() {
        return this.grid.verdiepingshoogte;
    }

    public get gridRotatie() {
        return this.grid.gridRotation;
    }
    
    public get gridShift() {
        return this.grid.gridShift;
    }


    public set smallestGridSize(value : number){
        this.grid.smallestGridSize = value;
        this.removeGeneratedSchool();
        this.shell.drawProjectToCanvas();
    }

    public set verdiepingsHoogte(value) {
        this.grid.verdiepingshoogte = value;
        this.shell.drawProjectToCanvas();
    }

    public set gridRotatie(value) {
        this.grid.gridRotation = value;
        this.removeGeneratedSchool();
        this.shell.drawProjectToCanvas();
    }

    public set gridShift(value) {
        this.grid.gridShift = value;
        this.removeGeneratedSchool();
        this.shell.drawProjectToCanvas();
    }

    
    constructor(private shell: EduSolveShellService, public grid : GridConfigurationService, public bouwconcept : BouwconceptConfigurationService, public viewer : EduSolveViewerService) {


    }   


 
    removeGeneratedSchool(){
        this.shell.setSchool(undefined);
    }


    toggleGridConcept(){
        this.viewer.gridConcept = !this.viewer.gridConcept;

        this.shell.drawProjectToCanvas();
    }

    toggleGridMain(){
        this.viewer.gridProgramma = !this.viewer.gridProgramma;

        this.shell.drawProjectToCanvas();
    }

    addObstacle(){
        this.shell.addObstacle();
    }


}
