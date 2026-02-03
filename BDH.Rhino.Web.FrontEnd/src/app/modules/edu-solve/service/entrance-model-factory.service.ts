import { Injectable } from '@angular/core';
import * as THREE from 'three';

@Injectable({
    providedIn: 'root'
})
export class EntranceModelFactoryService {

    constructor() {

    }

    create(color : any) {
        var height = 10;
        const geometry = new THREE.ConeGeometry( 2, height, 6 );
        const material = new THREE.MeshLambertMaterial( {color: color} );
        material.flatShading = true;

        const cone = new THREE.Mesh( geometry, material );
        cone.rotation.x = Math.PI
        cone.position.set(0, height / 2, 0);
        
        return cone;
    }   
}
