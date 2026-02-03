import { Injectable } from '@angular/core';
import * as THREE from 'three';
import { GenericMass } from '../models/GenericMass';
import { GenericMassModelProxy } from '../models/Three/GenericMassModelProxy';
import { UrbanSolveDataService } from './urban-solve-data.service';
import { UrbanSolveViewerService } from './urban-solve-viewer.service';
import { IsPoint2d } from '@app/shared/models/IsPoint2d';

//factory for a generic mass model
@Injectable({
    providedIn: 'root'
})
export class GenericMassModelFactoryService {

    constructor() { }

    create(color: any, mass: GenericMass, viewer: UrbanSolveViewerService, data: UrbanSolveDataService): GenericMassModelProxy {
        var proxy = new GenericMassModelProxy(mass, viewer, data);

        var geometry = new THREE.BoxGeometry(mass.width, mass.height, mass.depth, 3, 3, 3);
        var material = new THREE.MeshLambertMaterial({ color: color });
        var mesh = new THREE.Mesh(geometry, material);
        var rotation = mass.rotation;
        while (rotation < 0) {
            rotation += (Math.PI * 2)
        }
        rotation = rotation % (Math.PI * 2);

        proxy.rotation.reorder("XZY");
        proxy.rotation.x = 0;
        proxy.rotation.z = 0;
        proxy.rotation.y = rotation;

        var position = new THREE.Vector3(mass.position.x, mass.height / 2, mass.position.y);
        proxy.position.copy(position);
        proxy.updateMatrix();
        proxy.add(mesh);

        return proxy;
    }
    
    createDefault(color: any, position: IsPoint2d, rotation: number) {
        var geometry = new THREE.BoxGeometry(GenericMass.defaultWidth, GenericMass.defaultHeight, GenericMass.defaultDepth, 3, 3, 3);
        var material = new THREE.MeshLambertMaterial({ color: color });
        var mesh = new THREE.Mesh(geometry, material);
        while (rotation < 0) {
            rotation += (Math.PI * 2);
        }
        mesh.rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), rotation);

        var _position = new THREE.Vector3(position.x, GenericMass.defaultHeight / 2, position.y);
        mesh.position.copy(_position);
        mesh.updateMatrix();


        return mesh;
    }
    createUnique(color: any, position: IsPoint2d, rotation: number, width: number, depth: number, height: number) {
        var geometry = new THREE.BoxGeometry(width, height, depth, 3, 3, 3);
        var material = new THREE.MeshLambertMaterial({ color: color });
        var mesh = new THREE.Mesh(geometry, material);
        while (rotation < 0) {
            rotation += (Math.PI * 2);
        }
        mesh.rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), rotation);

        var _position = new THREE.Vector3(position.x, height / 2, position.y);
        mesh.position.copy(_position);
        mesh.updateMatrix();


        return mesh;
    }
}
