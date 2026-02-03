import { Injectable } from '@angular/core';
import { ColladaExporter } from 'three/examples/jsm/exporters/ColladaExporter';

@Injectable({
  providedIn: 'root'
})
export class ColladaModelExporterService {

  constructor() { }

  export(object: THREE.Object3D) : any {
    var exporter = new ColladaExporter ()
    var data = exporter.parse(object, 
        null!, 
        {});
    return data;
}
}
