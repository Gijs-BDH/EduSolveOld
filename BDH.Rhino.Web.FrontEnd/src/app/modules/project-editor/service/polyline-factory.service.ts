import { Injectable } from '@angular/core';
import { IsPoint2d } from '@app/shared/models/IsPoint2d';
import * as THREE from 'three';

//provides an injectable services that creates a three js polyline

@Injectable({
    providedIn: 'root'
})
export class PolylineFactoryService {

    constructor() { }

    create(points: IsPoint2d[], color: any, z: number = 0, autoclose : boolean = false): THREE.Line<THREE.BufferGeometry, THREE.Material | THREE.Material[]> {
       
        const shape = new THREE.Shape();
        shape.moveTo(points[0].x, points[0].y);

        for (var i = 1; i < points.length; i++) {
            shape.lineTo(points[i].x, points[i].y);
        }
        if(autoclose){
            shape.autoClose = true;
            shape.closePath();
        }

        const geometry = new THREE.BufferGeometry().setFromPoints(shape.getPoints());
        const material = new THREE.LineBasicMaterial({ color: color });
        const line = new THREE.Line(geometry, material);

        line.rotation.x = Math.PI / 2;
        line.position.add(new THREE.Vector3(0, z, 0));

        return line;
    }
}
