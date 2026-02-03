import { Injectable } from '@angular/core';
import * as THREE from 'three';
import { BoundingBox3d } from '../models/boundingBox3d';

@Injectable({
    providedIn: 'root'
})
export class GlbModelDimensionsService {

    constructor() {

    }


    analyze(model: THREE.Group): BoundingBox3d {
        var bbox = new THREE.Box3().setFromObject(model);
        return new BoundingBox3d(
            bbox.min.x,
            bbox.min.y,
            bbox.min.z,
            bbox.max.x,
            bbox.max.y,
            bbox.max.z
        )
    }
}
