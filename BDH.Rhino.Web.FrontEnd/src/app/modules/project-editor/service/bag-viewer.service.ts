import { Injectable } from '@angular/core';
import { ExtendedBagViewer } from '@lib/ExtendedBagViewer'
import * as THREE from 'three';
import { BoxHelper } from 'three';
import { TransformControls } from 'three/examples/jsm/controls/TransformControls';
import { DataModelProxy } from "../models/DataModelProxy";
import { BatchSelection } from '@lib/ExtendedBagViewer/BatchSelection';

//Angular service wrapper for the extended bag viewer so it can be injected as a dependency into other services
//Ideally this service would implement some interface for base functionality, so that if we ever migrate away from 3d bag, we would only have to re-implement that interface
//Adding and removing user elements (3d models that are not from the original bag 3d scene) have to be implementations of the DataModelProxy to ensure consistency across all applications that depend on this service.

@Injectable({
    providedIn: 'root'
})
export class BagViewerService {

    public bagViewer : ExtendedBagViewer
    public transformControls : TransformControls | undefined;
    public boxHelper : BoxHelper;

    public get raycaster () {
        return this.bagViewer.raycaster;
    }

    public get canvas(){
        var element = this.bagViewer.renderer.domElement
        if(!element){
            throw new Error("The 3d Bag viewer has not been initialized to a canvas yet.");
        }

        return element;
    }

    public get terrainTiles(){
        return this.bagViewer.terrainTiles;
    }

    public get camera(){
        return this.bagViewer.camera;
    }

    public get orbitControls(){
        return this.bagViewer.orbitControls;
    }

    public get renderer(){
        return this.bagViewer.renderer;
    }

    public get selectedBag() : BatchSelection{
        return this.bagViewer.batchSelection;
    };

    public get hiddenBag() : BatchSelection{
        return this.bagViewer.batchHidden;
    };

    public get renderBag() {
        return this.bagViewer.renderBag;
    }
    public set renderBag(val){
        this.bagViewer.renderBag = val;
    }

    public get isTemporaryRevealHidden() {
        return this.bagViewer.isTemporaryRevealHidden;
    }

    constructor() {
        this.bagViewer = new ExtendedBagViewer();

        this.boxHelper = new THREE.BoxHelper(undefined!);
    }


    public initEvents(){
        this.transformControls = new TransformControls(this.bagViewer.camera, this.canvas);
        this.bagViewer.scene.add(this.transformControls);
        this.bagViewer.scene.add(this.boxHelper);

        this.transformControls.addEventListener('dragging-changed', (evt: any) => {
            this.orbitControls.enabled = !evt.value;
        });

        addEventListener('keyup', (ev : KeyboardEvent) => {
            if(ev.key == 'Delete'){
                this.bagViewer.hideSelected();
            }
        })
    }

    public addUserElement(model : DataModelProxy){
        this.bagViewer.scene.add(model);
    }

    public ensureRerender(){
        this.bagViewer.needsRerender = 1;
    }

    public enumerateUserElements() : DataModelProxy[]{
        var elements : DataModelProxy[] = [];

        this.bagViewer.scene.traverse(m => {
            if(m instanceof DataModelProxy){
                elements.push(m);
            }
        })

        return elements;
    }
    
    public  removeUserElements(){
        var elements : DataModelProxy[] = [];

        this.bagViewer.scene.traverse(m => {
            if(m instanceof DataModelProxy){
                elements.push(m);
            }
        })

        for(var i = 0; i< elements.length; i++){
            this.bagViewer.scene.remove(elements[i]);
        }
    }

    public removeUserElement(model : DataModelProxy){
        this.bagViewer.scene.remove(model);
    }

    public castAllObjects(){
        return this.raycaster.intersectObject(this.bagViewer.scene, true);
    }
}
