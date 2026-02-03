import { Injectable } from '@angular/core';
import { PolylinePainterService } from '../models/PolylinePainterService';
import { Point2d } from '@app/shared/models/Point2d';
import { Group } from 'three';
import { PolylineFactoryService } from './polyline-factory.service';
import { BagViewerService } from './bag-viewer.service';
import { IsPoint2d } from '@app/shared/models/IsPoint2d';

//provides an injectable implementation of the polyline painter
//measures lengths of polyline segments.

@Injectable({
    providedIn: 'root'
})
export class RulerService extends PolylinePainterService {

    constructor(polylineFactory : PolylineFactoryService, bagViewer : BagViewerService) {
        super(polylineFactory, bagViewer);
    }

    public distances : number[] = [];

    protected override createGhost(points: IsPoint2d[]): Group {
        var group = super.createGhost(points);

        this.distances.length = 0;

        if(points.length >= 2){
            var point = points[0];
            for(var i = 1; i < points.length; i++){
                var point = points[i-1];
                var secondpoint = points[i];

                var distance = new Point2d(point.x, point.y).distance(new Point2d(secondpoint.x, secondpoint.y));
                this.distances.push(parseFloat(distance.toFixed(2)));
            }
        }

        return group;
    }
}
