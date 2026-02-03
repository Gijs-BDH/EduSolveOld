import { Injectable } from '@angular/core';
import { Point2d } from '@app/shared/models/Point2d';
import { Point3d } from '@app/shared/models/Point3d';
import * as turf from '@turf/turf';
import { IsPoint2d } from '../models/IsPoint2d';
import { IsPoint3d } from '../models/IsPoint3d';
import { IsBoundingBox } from '../models/IsBoundingBox';

@Injectable({
  providedIn: 'root'
})
export class PolygonToolsService {

    centerOfGravity(polygon: IsPoint2d[]): IsPoint2d {
        var coordinates: turf.Position[] = [];
        polygon.forEach(p => {
            var position: turf.Position = [p.x, p.y];
            coordinates.push(position);
        });
        var geoPolygon: turf.Polygon = {
            "type": "Polygon",
            "coordinates": [coordinates]
        };

        var center = turf.centerOfMass(geoPolygon);

        return new Point2d(center.geometry.coordinates[0], center.geometry.coordinates[1])
    }

    area(points: IsPoint2d[]): number {
        var total = 0;
    
        for (var i = 0, l = points.length; i < l; i++) {
          var addX = points[i].x;
          var addY = points[i == points.length - 1 ? 0 : i + 1].y;
          var subX = points[i == points.length - 1 ? 0 : i + 1].x;
          var subY = points[i].y;
    
          total += (addX * addY * 0.5);
          total -= (subX * subY * 0.5);
        }
    
        return Math.abs(total);
    }

    pointInPolygon(point: IsPoint2d, polygon: IsPoint2d[]): boolean {
        var position: turf.Position = [point.x, point.y];
        var geoPoint = turf.point(position);

        var coordinates: turf.Position[] = [];
        polygon.forEach(p => {
            var position: turf.Position = [p.x, p.y];
            coordinates.push(position);
        });
        var geoPolygon: turf.Polygon = {
            "type": "Polygon",
            "coordinates": [coordinates]
        };

        var within = turf.booleanWithin(geoPoint, geoPolygon);
        return within;
    }


    boundingBox(points : IsPoint2d[]) : IsBoundingBox{
        if(!points.length){
            throw new Error("Cannot get bounding box for empty point set.")
        }

        var minx = points[0].x;
        var miny = points[0].y;
        var maxx = points[0].x;
        var maxy = points[0].y;

        for(var i = 1; i<points.length; i++){
            var minx = Math.min(minx, points[i].x);
            var miny = Math.min(miny, points[i].y);
            var maxx = Math.max(maxx, points[i].x);
            var maxy = Math.max(maxy, points[i].y);
        }

        var min = new Point2d(minx, miny);
        var max = new Point2d(maxx, maxy);

        return {
            min : min, 
            max : max
        };
    }

    pointRaster(points : IsPoint2d[], distanceX : number, distanceY : number) : IsPoint2d[]{
        if(!points.length){
            return [];
        }

        if(distanceX <= 0){
            throw new Error("Cannot slice a polygon with a distance 0");
        }
        if(distanceY <= 0){
            throw new Error("Cannot slice a polygon with a distance 0");
        }

        var boundingBox = this.boundingBox(points);

        var distx = boundingBox.max.x - boundingBox.min.x;
        var disty = boundingBox.max.y - boundingBox.min.y;

        var numberx = Math.ceil(distx / distanceX);
        var numbery = Math.ceil(disty / distanceY);

        var returnPoints : Point2d[] = [];

        var ypos = boundingBox.min.y;
        for(var y = 0; y<numbery; y++){
            var xpos = boundingBox.min.x;

            for(var x = 0; x< numberx; x++){
                var point = new Point2d(xpos, ypos);
                if(this.pointInPolygon(point, points)){
                    returnPoints.push(point);
                }

                xpos += distanceX;
            }

            ypos += distanceY;
        }

        return returnPoints;
    }

    tileRaster(shape : IsPoint2d[], distanceX : number, distanceY : number, offset : number) : IsPoint2d[][]{
        if(!shape.length){
            return [];
        }

        if(distanceX <= 0){
            throw new Error("Cannot slice a polygon with a distance 0");
        }
        if(distanceY <= 0){
            throw new Error("Cannot slice a polygon with a distance 0");
        }
        
        var boundingBox = this.boundingBox(shape);

        var distx = boundingBox.max.x - boundingBox.min.x;
        var disty = boundingBox.max.y - boundingBox.min.y;

        var numberx = Math.ceil(distx / distanceX);
        var numbery = Math.ceil(disty / distanceY);

        var tileRaster : Point2d[][] = [];

        var ypos = boundingBox.min.y;
        if(offset){
            ypos -= offset;
        }
        for(var y = 0; y<numbery; y++){
            var xpos = boundingBox.min.x;
            if(offset){
                xpos -= offset;
            }
            for(var x = 0; x< numberx; x++){
                var tile : Point2d[] = [
                    new Point2d(xpos, ypos),
                    new Point2d(xpos + distanceX, ypos),
                    new Point2d(xpos + distanceX, ypos + distanceY),
                    new Point2d(xpos, ypos + distanceY),
                    new Point2d(xpos, ypos)
                ]

                var anyOutsideShape = tile.some(point => !this.pointInPolygon(point, shape));
                if(!anyOutsideShape){
                    tileRaster.push(tile);
                }

                xpos += distanceX;
            }

            ypos += distanceY;
        }

        return tileRaster;
    }

    
    rotatePoint(point : IsPoint2d, anchor : IsPoint2d, rotationRadians : number){
        var x1 = point.x - anchor.x;
        var y1 = point.y - anchor.y;

        var x2 = x1 * Math.cos(rotationRadians) - y1 * Math.sin(rotationRadians);
        var y2 = x1 * Math.sin(rotationRadians) + y1 * Math.cos(rotationRadians);

        var newx = x2 + anchor.x;
        var newy = y2 + anchor.y;

        return new Point2d(newx, newy);
    }

    rotatePointInPlace(point : IsPoint2d, anchor : IsPoint2d, rotationRadians : number) : void{
        var x1 = point.x - anchor.x;
        var y1 = point.y - anchor.y;

        var x2 = x1 * Math.cos(rotationRadians) - y1 * Math.sin(rotationRadians);
        var y2 = x1 * Math.sin(rotationRadians) + y1 * Math.cos(rotationRadians);

        point.x = x2 + anchor.x;
        point.y = y2 + anchor.y;
    }

    average(shape : IsPoint2d[]){
        if(!shape.length){
            throw new Error("Cannot average a shape that has no points.")
        }
        var avgx = 0;
        var avgy = 0;
        
        shape.forEach(p => {
            avgx += p.x;
            avgy += p.y;
        })

        avgx /= shape.length;
        avgy /= shape.length;

        return {
            x: avgx,
            y: avgy
        }
    }

    average3d(shape : IsPoint3d[]) : Point3d{
        if(!shape.length){
            throw new Error("Cannot average a shape that has no points.")
        }
        var avgx = 0;
        var avgy = 0;
        var avgz = 0;
        
        shape.forEach(p => {
            avgx += p.x;
            avgy += p.y;
            avgz += p.z;
        })

        avgx /= shape.length;
        avgy /= shape.length;
        avgz /= shape.length;

        return new Point3d(avgx, avgy, avgz);
    }

}
