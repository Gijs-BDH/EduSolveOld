import { Injectable } from '@angular/core';
import { BagViewerService } from './bag-viewer.service';
import { IsHitBuilding } from '../models/IsHitBuilding';

//The responsibility of this service is to detect which 3dbag building is beneath the mouse. 
//X and Y to public methods are in screen space, normalized from -1 to 1.

@Injectable({
    providedIn: 'root'
})
export class BagCasterService {

    private shiftDown: boolean = false;

    constructor(private readonly viewer: BagViewerService) {
        addEventListener('keydown', this.keyDown.bind(this));
        addEventListener('keyup', this.keyUp.bind(this));
    }


    public tryHitBuilding(x: number, y: number): IsHitBuilding | undefined {
        this.viewer.raycaster.setFromCamera({ x: x, y: y }, this.viewer.camera);

        let results: THREE.Intersection<any>[] = [];
        let hitbuilding;

        results = this.viewer.raycaster.intersectObject(this.viewer.bagViewer.tiles.group, true);
        if (results.length && results[0].face) {
            const batch_id_table = results[0].object.geometry.getAttribute('_batchid');
            const batch_id = batch_id_table.getX(results[0].face.a);

            var buildingIsHidden = this.viewer.hiddenBag.selectedIds.find(e => e.ids.find(t => t == batch_id));
            var temporaryReveal = this.viewer.isTemporaryRevealHidden;
            if(buildingIsHidden && !temporaryReveal){
                 
            }
            else{
                hitbuilding = { object: results[0].object, id: batch_id };
            }
            
        }

        return hitbuilding;
    }

    public cast(x: number, y: number): boolean {
        var hitbuilding = this.tryHitBuilding(x, y);

        if (!hitbuilding) {
            this.viewer.bagViewer.clearSelection();
            return false;
        }

        if (this.shiftDown) {
            this.viewer.bagViewer.addToSelection(hitbuilding.object, hitbuilding.id);
        } else {
            this.viewer.bagViewer.setSingleSelected(hitbuilding.object, hitbuilding.id)
        }

        return true;
    }

    private keyDown(ev: KeyboardEvent) {
        if (ev.key == 'Shift') {
            this.shiftDown = true;
        }
    }

    private keyUp(ev: KeyboardEvent) {
        if (ev.key == 'Shift') {
            this.shiftDown = false;
        }
    }

}


