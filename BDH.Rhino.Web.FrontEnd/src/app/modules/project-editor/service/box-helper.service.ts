import { Injectable } from '@angular/core';
import { SelectableModelProxy } from '../models/SelectableModelProxy';
import { BagViewerService } from './bag-viewer.service';
import { DeletableModelProxy } from '../models/DeletableModelProxy';

//Attaches a box model around some selectable user element
//subscribes to escape and delete keys so that when that key is pressed, the selected model is either deleted or unselected.

@Injectable({
    providedIn: 'root'
})
export class BoxHelperService {

    private attachedTo : SelectableModelProxy | undefined;

    constructor(private readonly bagViewer : BagViewerService) { 
        
    }

    public init(){

        window.addEventListener('keyup', (evt : KeyboardEvent) => {
            switch(evt.key){
                case "esc":
                    case "Esc":
                        case "escape":
                            case "Escape":
                                this.detach();
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
    }


    public attach(model : SelectableModelProxy){
        this.attachedTo = model;
        this.bagViewer.boxHelper.visible = true;
        this.bagViewer.boxHelper.setFromObject(model);
        this.update();
    }

    public detach(){
        this.attachedTo = undefined;
        this.bagViewer.boxHelper.visible = false;
        this.bagViewer.boxHelper.setFromObject(undefined!);
        this.update();
    }

    public update(){
        this.bagViewer.boxHelper.update();
    }

    public delete(){
        if(this.attachedTo instanceof DeletableModelProxy){
            this.attachedTo.removeFromScene();
            this.detach();
        }
    }
}
