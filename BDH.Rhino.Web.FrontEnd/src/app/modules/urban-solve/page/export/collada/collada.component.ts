import { Component } from '@angular/core';
import { ProjectGeometryExporterService } from '@app/modules/urban-solve/service/project-geometry-exporter.service';

@Component({
  selector: 'app-collada',
  templateUrl: './collada.component.html',
  styleUrls: ['./collada.component.scss']
})
export class ColladaComponent {

    constructor(private exporter : ProjectGeometryExporterService){

    }
    

    do(){
        var bytes = this.exporter.expotCollada();
        var blob = new Blob([bytes.data], {type:'geometry/dae'})
        
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "file.dae";
        link.click();
        URL.revokeObjectURL(link.href);
    }

}
