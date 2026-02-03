import { Injectable } from '@angular/core';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';


@Injectable({
    providedIn: 'root'
})
export class ObstacleModelFactoryService {

    cached : THREE.Group | undefined;

    constructor() { }


    create(onModelCreated : (model : THREE.Group) => void) : void{
        var urlToModel = "../../../../assets/models/boompje.gltf";
        
        new GLTFLoader().load(urlToModel, (gltf) => {
            var model = gltf.scene;
            model.traverse((o : any) => {
                if(o.material){
                    o.material.metalness = 0;
                    o.material.flatShading = true;
                }
            })

            this.cached = model;
            onModelCreated(model);
        })
    }


    getCached(){
        if(!this.cached){
            throw new Error("No model cached.");
        }

        return this.cached.clone();
    }
}
