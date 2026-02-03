import * as THREE from 'three';
import { BagViewerService } from '../service/bag-viewer.service';
import { Point3d } from '@app/shared/models/Point3d';
import { DataModelPainter } from './DataModelPainterService';
import { IsPoint2d } from '@app/shared/models/IsPoint2d';

//extends the datamodelpainter class for drawing a default polygon.

export abstract class PolygonPainterService extends DataModelPainter {

    thickness = 0.1;

    extrudeSettings = {
        steps: 2,
        depth: this.thickness,
        bevelEnabled: false
    };

    constructor(bagViewer: BagViewerService) {
        super(bagViewer);

    }

    protected override createGhost(points : IsPoint2d[]){
        if(!points.length){
            throw new Error("cannot draw without points.");
        }
        
        var ghost = new THREE.Group();
        var sphereRadius = new Point3d(this.bagViewer.camera.position.x, this.bagViewer.camera.position.y, this.bagViewer.camera.position.z)
            .distanceTo(new Point3d(points[points.length - 1].x, 0, points[points.length - 1].y)) / 200;

        var sphereGeom = new THREE.SphereGeometry(sphereRadius, 10, 10);
        var sphereMat = new THREE.MeshBasicMaterial({color : 'red'});
        var sphereMesh = new THREE.Mesh(sphereGeom, sphereMat);
        sphereMesh.position.set(points[points.length - 1].x, 0, points[points.length - 1].y);

        ghost.add(sphereMesh);

        if(points.length > 1){
            var polygonMesh = this.create(points, 'yellow', 'yellow');
            ghost.add(polygonMesh);
        }
        
        
        return ghost;
    }

    protected create(points: IsPoint2d[], color: any, stroke : any) {
        var group = new THREE.Group();

        const shape = new THREE.Shape();
        shape.moveTo(points[0].x, points[0].y);

        for (var i = 1; i < points.length; i++) {
            shape.lineTo(points[i].x, points[i].y);
        }

        shape.closePath();

        const geometry = new THREE.ExtrudeGeometry(shape, this.extrudeSettings);
        const material = new THREE.MeshLambertMaterial({ color:  color === "transparant" ? "white" : color });
        material.transparent = true;
        material.opacity = color === "transparant" ? 0 : 0.5;
        material.depthWrite = false;
        
        const mesh: any = new THREE.Mesh(geometry, material);
        mesh.rotation.x = Math.PI / 2;

        const lineGeometry = new THREE.BufferGeometry().setFromPoints(points.map(p => new THREE.Vector3(p.x, 0.1, p.y)));
        const lineMaterial = new THREE.LineBasicMaterial({color : stroke});
        const line = new THREE.Line(lineGeometry, lineMaterial);

        group.add(mesh);
        group.add(line);
        group.position.add(new THREE.Vector3(0, this.thickness, 0));

        return group;
    }
}
