import { Component } from '@angular/core';
import { EduSolveShellService } from '../../service/edu-solve-shell.service';
import { EduSolveViewerService } from '../../service/edu-solve-viewer.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent {

    public get polygon(){
        return this.viewer.polygon;
    }   
    
    public set polygon(value : boolean){
        this.viewer.polygon = value;
        this.viewer.drawProjectToCanvas();
    }

    public get gridProgramma(){
        return this.viewer.gridProgramma;
    }   
    
    public set gridProgramma(value : boolean){
        this.viewer.gridProgramma = value;
        this.viewer.drawProjectToCanvas();
    }

    public get gridConcept(){
        return this.viewer.gridConcept;
    }   
    
    public set gridConcept(value : boolean){
        this.viewer.gridConcept = value;
        this.viewer.drawProjectToCanvas();
    }

    public get transparant(){
        return this.viewer.transparant;
    }   
    
    public set transparant(value : boolean){
        this.viewer.transparant = value;
        this.viewer.drawProjectToCanvas();
    }

    public get clusters(){
        return this.viewer.drawClusters;
    }   
    
    public set clusters(value : boolean){
        this.viewer.drawClusters = value;
        this.viewer.drawProjectToCanvas();
    }

    public get construction(){
        return this.viewer.drawConstruction;
    }   
    
    public set construction(value : boolean){
        this.viewer.drawConstruction = value;
        this.viewer.drawProjectToCanvas();
    }

    constructor(
        public viewer : EduSolveViewerService
    ){

    }

}
