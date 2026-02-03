import { Injectable } from '@angular/core';
import { BoxHelperService } from '@app/modules/project-editor/service/box-helper.service';
import { Box3, BoxHelper, Group } from 'three';
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

@Injectable({
    providedIn: 'root'
})
export class GlbValidatorService {

    constructor() { }

    validate(file: File, callbackOnValid: (model : Group) => void, onError: (message: string) => void): void {
        var fileReader = new FileReader();

        fileReader.onloadend = (e) => {
            var arrayBuffer = fileReader.result;
            if(!arrayBuffer){
                onError("Het bestand is leeg.");
                return;
            }

            try{
                new GLTFLoader().parse(arrayBuffer, '',
                (gltf : GLTF) => {
                    var model = gltf.scene;
                    
                    callbackOnValid(model);
                },
                (m) => {
                    onError(m.message);
                });
            }
            catch(ex : any){
                onError(ex.message);
            }
        }

        fileReader.readAsArrayBuffer(file);
    }
}
