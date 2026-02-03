import * as THREE from 'three';
import { DataModelPainter } from '@app/modules/project-editor/models/DataModelPainterService';
import { Point3d } from '../../../shared/models/Point3d';
import { PolylineFactoryService } from '../service/polyline-factory.service';
import { BagViewerService } from '../service/bag-viewer.service';
import { IsPoint2d } from '@app/shared/models/IsPoint2d';

//extends the datamodelpainter class to provide a simple polyline painter.

export abstract class PolylinePainterService extends DataModelPainter {

    constructor(private polylineFactory : PolylineFactoryService, bagViewer : BagViewerService){
        super(bagViewer);
    }

    protected override createGhost(points: IsPoint2d[]) {
        if (!points.length) {
            throw new Error("cannot draw without points.");
        }

        var ghost = new THREE.Group();
        var sphereRadius = new Point3d(this.bagViewer.camera.position.x, this.bagViewer.camera.position.y, this.bagViewer.camera.position.z)
            .distanceTo(new Point3d(points[points.length - 1].x, 0, points[points.length - 1].y)) / 200;

        var sphereGeom = new THREE.SphereGeometry(sphereRadius, 10, 10);
        var sphereMat = new THREE.MeshBasicMaterial({ color: 'red' });
        var sphereMesh = new THREE.Mesh(sphereGeom, sphereMat);
        sphereMesh.position.set(points[points.length - 1].x, 0, points[points.length - 1].y);

        ghost.add(sphereMesh);

        if (points.length > 1) {
            var polygonMesh = this.polylineFactory.create(points, 'yellow', 0.5);
            ghost.add(polygonMesh);
        }


        return ghost;
    }

}


