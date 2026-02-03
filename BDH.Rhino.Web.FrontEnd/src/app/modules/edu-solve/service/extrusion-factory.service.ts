import { Injectable } from '@angular/core';
import { IsPoint2d } from '@app/shared/models/IsPoint2d';
import * as THREE from 'three';

@Injectable({
    providedIn: 'root'
})
export class ExtrusionFactoryService {

    constructor() {

    }

    create(points: IsPoint2d[], elevation: number, height: number,  color: string, opaque : boolean = false): THREE.Group {
        var group = new THREE.Group();

        var extrudeSettings = {
            steps: 2,
            depth: -height,
            bevelEnabled: false
        };

        const shape = new THREE.Shape();
        shape.moveTo(points[0].x, points[0].y);

        for (var i = 1; i < points.length; i++) {
            shape.lineTo(points[i].x, points[i].y);
        }

        shape.closePath();

        const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
        const material = new THREE.MeshLambertMaterial({ color:  color === "transparant" ? "white" : color, side: THREE.DoubleSide });
        if(!opaque){
            material.transparent = true;
            material.opacity = color === "transparant" ? 0 : 0.5;
            material.depthWrite = false;
        }
       
        
        const mesh: any = new THREE.Mesh(geometry, material);
        mesh.rotation.x = Math.PI / 2;

        const lineGeometry = new THREE.BufferGeometry().setFromPoints(points.map(p => new THREE.Vector3(p.x, 0, p.y)));
        const lineMaterial = new THREE.LineBasicMaterial({color : color === "transparant" ? "white" : color});
        const line = new THREE.Line(lineGeometry, lineMaterial);

        group.add(mesh);
        group.add(line);
        group.position.add(new THREE.Vector3(0, elevation, 0));

        return group;
    }
}
