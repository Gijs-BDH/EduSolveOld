import { Point2d } from "../../../shared/models/Point2d";
import { TilePoperties } from "./TileProperties";
import { DataModel } from "../../project-editor/models/DataModel";
import { PolygonToolsService } from "@app/shared/service/polygon-tools.service";
import { IsPoint2d } from "@app/shared/models/IsPoint2d";

export class Tile extends DataModel {
    properties: TilePoperties;
    points: IsPoint2d[];
    
    constructor(props: TilePoperties, points: IsPoint2d[], private polygonTools : PolygonToolsService){
        super();

        if(!points.length){
            throw new Error("Cannot construct empty tile.")
        }

        this.properties = props;
        this.points = points;
    }

    pointIsInTile(point : IsPoint2d) : boolean{
        return this.polygonTools.pointInPolygon(point, this.points);
    }

    getCenter() : Point2d{
        var avgx = this.points[0].x;
        var avgy = this.points[0].y;

        for(var i = 1; i < this.points.length; i++){
            var p = this.points[i];
            avgx += p.x;
            avgy += p.y;
        }

        avgx /= this.points.length;
        avgy /= this.points.length;

        return new Point2d(avgx, avgy);
    }

    getLongestSide(): IsPoint2d[] {
        var longestSide : IsPoint2d[] = [this.points[0], this.points[1]];

        for(var i = 1; i < this.points.length - 1; i++){
            var side = [this.points[i], this.points[i-1]];

            if(this.getLength(side) > this.getLength(longestSide)){
                longestSide = side;
            }
        }

        return longestSide;
    }

    getLength(line : IsPoint2d[]){
        var length = 0;

        for (var i = 1; i < line.length; i++){
            var firstPoints = line[i-1];
            var secondPoint = line[i];

            var a = secondPoint.x - firstPoints.x;
            var b = secondPoint.y - firstPoints.y;
            var cSquared = (a * a) + (b * b);

            var distanceToPrevious = Math.sqrt(cSquared);
            length += distanceToPrevious;
        }

        return length;
    }

}
