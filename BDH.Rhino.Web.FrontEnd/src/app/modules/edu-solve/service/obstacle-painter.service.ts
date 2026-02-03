import { Injectable } from '@angular/core';
import { BagViewerService } from '@app/modules/project-editor/service/bag-viewer.service';
import * as THREE from 'three';
import { ObstacleModelFactoryService } from './obstacle-model-factory.service';
import { DataModelPainter } from '@app/modules/project-editor/models/DataModelPainterService';
import { DataModelProxy } from '@app/modules/project-editor/models/DataModelProxy';
import { IsPoint2d } from '@app/shared/models/IsPoint2d';

@Injectable({
    providedIn: 'root'
})
export class ObstaclePainterService extends DataModelPainter {

    private cachedGhost : THREE.Group | undefined;

    constructor(bagViewer : BagViewerService, modelFactory : ObstacleModelFactoryService) { 
        super(bagViewer);

        modelFactory.create(model => {
            this.cachedGhost = model
        });
    }
    
    protected override createGhost(points : IsPoint2d[]) : DataModelProxy {
        var group = new THREE.Group();
        
        if(!this.cachedGhost){
            return group;
        }

        if(!points.length){
            return group;
        }

        points.forEach(p => {
            var clone = this.cachedGhost!.clone(true);
            clone.position.set(p.x, 0, p.y);

            group.add(clone)
        });

        return group;
    }
}
