import { Component } from '@angular/core';
import { UrbanSolveDataService } from '../../service/urban-solve-data.service';
import { UrbanSolveShellService } from '../../service/urban-solve-shell.service';

@Component({
  selector: 'app-tile-splitter',
  templateUrl: './tile-splitter.component.html',
  styleUrls: ['./tile-splitter.component.scss']
})
export class TileSplitterComponent {
    public expanded : boolean = false;


    constructor(public shell : UrbanSolveShellService, private data : UrbanSolveDataService){

    }

    public change(){
        this.shell.drawProjectToCanvas();
    }

    public remove(){
        if(!this.shell.selectedWay){
            return;
        }

        this.data.removeGeneric(this.shell.selectedWay);
        this.shell.drawProjectToCanvas();
    }
}
