import { Injectable } from '@angular/core';
import { OBJExporter } from 'three/examples/jsm/exporters/OBJExporter';

@Injectable({
    providedIn: 'root'
})
export class ObjModelExporterService {

    constructor() { }

    export(object: THREE.Object3D) {
        var exporter = new OBJExporter()
        var data = exporter.parse(object);
        return data;
    }

}
