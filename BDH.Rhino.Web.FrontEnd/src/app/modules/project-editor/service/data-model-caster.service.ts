import { Injectable } from '@angular/core';
import { Object3D } from 'three';
import { TransformableModelProxy } from '../models/TransformableModelProxy';
import { SelectableModelProxy } from "../models/SelectableModelProxy";
import { BagViewerService } from './bag-viewer.service';
import { TransformControlsService } from './transform-controls.service';
import { BoxHelperService } from './box-helper.service';

//Casts selectable user models beneath the mouse
//Remember that the tryselect method expects x and y coordinates in screen space, normalized from -1 to 1.

@Injectable({
    providedIn: 'root'
})
export class DataModelCasterService {

    constructor(private transformControls : TransformControlsService, private viewer : BagViewerService, private boxHelper : BoxHelperService) {

    }

    public trySelect(x : number, y : number) : boolean {

        this.viewer.raycaster.setFromCamera({x: x, y: y}, this.viewer.camera);

        var results = this.viewer.castAllObjects();

        if (results.length) {

            for(var i = 0; i<results.length; i++){

                var proxy = this.findProxyFromObject(results[i].object);

                if(proxy){

                    proxy.isSelected = true;

                    if(proxy instanceof TransformableModelProxy){

                        this.transformControls.attach(proxy);

                    } else {

                        this.boxHelper.attach(proxy);

                    }

                    return true;
                }
            }
        }

        this.boxHelper.detach();

        return false;
    }

    private findProxyFromObject(object : Object3D | null) : SelectableModelProxy | null{

        while(object){
            
            if(object instanceof SelectableModelProxy){
                
                return object;

            }

            object = object.parent;
        }

        return null;
    }
}
