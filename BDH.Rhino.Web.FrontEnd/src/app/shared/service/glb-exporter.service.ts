import { Injectable } from '@angular/core';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter';

@Injectable({
  providedIn: 'root'
})
export class GlbExporterService {

  constructor() { 


  }


  export(object : THREE.Object3D, onResult : (res: ArrayBuffer) => void, onError : (mess: string) => void){
    var options  ={
        binary: true
    };
    var exporter = new GLTFExporter()
    exporter.parse(object, 
        (result) => {
            if(result instanceof ArrayBuffer){
                onResult(result);
            }
            else {
                onError("Geselecteerde objecten geen instancie van een geldige glb array buffer.");
            }
        },
        (error) => {
            onError(error.message);
        }, 
        options);
  }
}

