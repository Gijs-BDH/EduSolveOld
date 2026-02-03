import { Component } from '@angular/core';
import { ProjectGeometryExporterService } from '@app/modules/urban-solve/service/project-geometry-exporter.service';

@Component({
  selector: 'app-glb',
  templateUrl: './glb.component.html',
  styleUrls: ['./glb.component.scss']
})
export class GlbComponent {

    constructor(private exporter : ProjectGeometryExporterService){

    }
    
    do(){
        this.exporter.exportGlb((buffer) => {
            var blob = new Blob([buffer], {type:'geometry/glb'})
            
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = "file.glb";
            link.click();
            URL.revokeObjectURL(link.href);
        });
    }
}
