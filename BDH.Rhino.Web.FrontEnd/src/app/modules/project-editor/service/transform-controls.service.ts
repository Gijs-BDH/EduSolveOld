import { Injectable } from '@angular/core';
import { TransformableModelProxy } from "@app/modules/project-editor/models/TransformableModelProxy"
import { BagViewerService } from '@app/modules/project-editor/service/bag-viewer.service';
import { Point2d } from '@app/shared/models/Point2d';
import * as THREE from 'three';
import { DataModelProxy } from '../models/DataModelProxy';

//provides an injectable service that can attach transformcontrols to a transformable user model proxy.
//initializes key- and mouse events to the bag viewer canvas.

@Injectable({
    providedIn: 'root'
})
export class TransformControlsService {
    lastMouseDown : Point2d = new Point2d(0, 0);
    lastMouseUp : Point2d = new Point2d(0, 0);
    attachedTo?: TransformableModelProxy;
    ghost?: DataModelProxy | undefined;
    copy : boolean = false;
    hasInitialized : boolean = false;

    public get transformControls() {
        var controls = this.viewer.transformControls;
        if(!controls){
            throw new Error("Please register the viewer transform controls to a HTML canvas first.")
        }
        return controls;
    }

    constructor(private viewer : BagViewerService) {

        
    }

    public init(){
        if(!this.viewer.canvas){
            throw new Error("Please initialize the bag viewer to a HTML canvas first.");
        }

        this.viewer.canvas.addEventListener("mousedown", ev => {
            this.lastMouseDown.x = ev.clientX;
            this.lastMouseDown.y = ev.clientY;
        })

        this.viewer.canvas.addEventListener("mouseup", ev => {
            this.lastMouseUp.x = ev.clientX;
            this.lastMouseUp.y = ev.clientY;

            if(this.lastMouseDown.distance(this.lastMouseUp) < 0.02){
                this.detach(true);
            }
        })

        window.addEventListener('keyup', (evt : KeyboardEvent) => {
            switch(evt.key){
                case "W":
                    case "w":
                        this.transformControls.setMode('translate');
                        break;
        
                    case "e":
                    case "E":
                        this.transformControls.setMode('rotate')
                        break;

                case "enter":
                    case "Enter":
                        this.detach(true);
                        break;

                case "esc":
                    case "Esc":
                        case "escape":
                            case "Escape":
                                this.detach(false);
                                break;
                            
                case "del":
                    case "delete":
                        case "Delete":
                            case "Del":
                                this.delete();
                                break;
            }

            evt.preventDefault();
        });


        this.transformControls.addEventListener('change', (evt: any) => {
            this.viewer.ensureRerender();
        });
    }

    public attach(model: TransformableModelProxy) : TransformControlsService {
        this.detach(false);

        this.transformControls.enabled = true;
        this.transformControls.setSpace("local");

        var clone = model.clone(true);
        var newMaterial = new THREE.MeshLambertMaterial({color : 'yellow'});
        newMaterial.flatShading = true;
        clone.traverse((e : any) => {
            e.material = newMaterial;
        }) 

        this.ghost = clone;
        
        this.viewer.addUserElement(this.ghost);
        this.transformControls.attach(this.ghost);

        this.attachedTo = model;
        this.attachedTo.visible = false;
        this.attachedTo.isSelected = true;

        return this;
    }
      
    public detach(confirm: boolean) {
        if (confirm) {
            if(this.attachedTo && this.ghost){
                this.attachedTo.applyTransformation({x : this.ghost.position.x, y : this.ghost.position.z}, this.ghost.rotation.y)
            }
        }
        
        if(this.ghost){
            this.viewer.removeUserElement(this.ghost);
            this.ghost = undefined;
        }

        if(this.attachedTo){
            this.attachedTo.isSelected = false;
            this.attachedTo.visible = true;
            this.attachedTo = undefined;
        }

        this.transformControls.detach();

        this.viewer.ensureRerender();
    }

    public delete(){
        if(this.attachedTo){
            this.attachedTo.removeFromScene();
            this.detach(false);
        }
    }
}
