import { Injectable } from '@angular/core';
import { DataModelPainter as DataModelPainter } from '@app/modules/project-editor/models/DataModelPainterService';
import { BagViewerService } from '@app/modules/project-editor/service/bag-viewer.service';
import * as THREE from 'three';
import { GenericMassModelFactoryService } from './generic-mass-model-factory.service';
import { DataModelProxy } from '@app/modules/project-editor/models/DataModelProxy';
import { IsPoint2d } from '@app/shared/models/IsPoint2d';

//allows to draw a generic mass from a set of points.

@Injectable({
    providedIn: 'root'
})
export class GenericMassPainterService extends DataModelPainter {

    constructor(
        viewer: BagViewerService,
        private massModelFactory: GenericMassModelFactoryService) {

        super(viewer);
    }

    protected createGhost(target: IsPoint2d[]): DataModelProxy {

        var group = new THREE.Group();

        target.forEach(p => {
            group.add(this.massModelFactory.createDefault("yellow", p, 0));
        })

        return group;
    }

}
