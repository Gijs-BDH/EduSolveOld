import { Component } from '@angular/core';
import { ProjectGeometryExporterService } from '@app/modules/urban-solve/service/project-geometry-exporter.service';

@Component({
  selector: 'app-obj',
  templateUrl: './obj.component.html',
  styleUrls: ['./obj.component.scss']
})
export class ObjComponent {

    constructor(private exporter : ProjectGeometryExporterService){

    }

    do(){
        var bytes = this.exporter.exportObj();
        var blob = new Blob([bytes], {type:'geometry/obj'})

        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "file.obj";
        link.click();
        URL.revokeObjectURL(link.href);
    }

}
