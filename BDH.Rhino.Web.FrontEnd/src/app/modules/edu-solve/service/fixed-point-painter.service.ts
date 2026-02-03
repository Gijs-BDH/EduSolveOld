import { Injectable } from '@angular/core';
import * as THREE from 'three';
import { EntranceModelFactoryService } from './entrance-model-factory.service';
import { BagViewerService } from '@app/modules/project-editor/service/bag-viewer.service';
import { DataModelPainter } from '@app/modules/project-editor/models/DataModelPainterService';
import { DataModelProxy } from '@app/modules/project-editor/models/DataModelProxy';
import { IsPoint2d } from '@app/shared/models/IsPoint2d';

@Injectable({
    providedIn: 'root'
})
export class FixedPointPainterService extends DataModelPainter {

    constructor(bagviewer : BagViewerService, private entranceFactory : EntranceModelFactoryService) { 
        super(bagviewer)
    }

    protected createGhost(points: IsPoint2d[]): DataModelProxy {
        var group = new THREE.Group();

        points.forEach(p => {
            var mesh = this.entranceFactory.create('yellow');
            mesh.position.set(p.x, mesh.position.y, p.y);
            group.add(mesh);
        });

        return group;
    }
}
