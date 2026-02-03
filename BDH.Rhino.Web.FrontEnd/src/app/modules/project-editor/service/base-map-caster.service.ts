import { Injectable } from '@angular/core';
import { BagViewerService } from '@app/modules/project-editor/service/bag-viewer.service';
import { ExtendedBagViewer } from '@lib/ExtendedBagViewer';
import { Point2d } from '@app/shared/models/Point2d';

//Casts mouse x and y coordinates in screen space (normalized from -1 to 1) to the flat map layer in the threejs bag scene
//Remember that this service only casts the map layer, not any other buildings or user elements

@Injectable({
    providedIn: 'root'
})
export class BaseMapCasterService {

    private viewer : ExtendedBagViewer;

    constructor(viewer: BagViewerService) {
        this.viewer = viewer.bagViewer;
    }

    cast(screenX: number, screenY: number) : Point2d | null {
        this.viewer.raycaster.setFromCamera({x: screenX, y: screenY}, this.viewer.camera);

        var castResult = null;
        var results = this.viewer.raycaster.intersectObject(this.viewer.terrainTiles.group, true);
        if (results.length) {
            castResult = new Point2d(results[0].point.x, results[0].point.z );
        }

        return castResult;
    }
}   
