import { Injectable } from '@angular/core';
import * as THREE from 'three';
import { DataModelProxy } from "../models/DataModelProxy";
import { IsPoint2d } from '@app/shared/models/IsPoint2d';

//provides an injectable service that creates a threejs polygon.
//remember that a polygon is closed, a polyline is open.
//the polyline will be filled.

@Injectable({
    providedIn: 'root'
})
export class PolygonFactory {

    constructor() { }

    thickness = 0.1;

    extrudeSettings = {
        steps: 2,
        depth: this.thickness,
        bevelEnabled: false
    };

    public create(points: IsPoint2d[], color: any, stroke: any, opaque : boolean = false) {
        var group = new DataModelProxy();

        const shape = new THREE.Shape();
        shape.moveTo(points[0].x, points[0].y);
        for (var i = 1; i < points.length; i++) {
            shape.lineTo(points[i].x, points[i].y);
        }
        shape.closePath();

        const geometry = new THREE.ExtrudeGeometry(shape, this.extrudeSettings);
        const material = new THREE.MeshLambertMaterial({ color: color === "transparant" ? "white" : color });
        if(!opaque){
            material.transparent = true;
            material.opacity = 0.5;
            material.depthWrite = false;
        }
        
        const mesh: any = new THREE.Mesh(geometry, material);
        mesh.rotation.x = Math.PI / 2;

        const lineGeometry = new THREE.BufferGeometry().setFromPoints(points.map(p => new THREE.Vector3(p.x, 0.1, p.y)));
        const lineMaterial = new THREE.LineBasicMaterial({ color: stroke });
        const line = new THREE.Line(lineGeometry, lineMaterial);

        group.add(mesh);
        group.add(line);
        group.position.add(new THREE.Vector3(0, this.thickness, 0));

        group.renderOrder = 100000;
        
        return group;
    }
}
