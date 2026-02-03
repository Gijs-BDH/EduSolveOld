import { IsPoint2d } from "./IsPoint2d";
import { Vector2d } from "./Vector2d";

export class Point2d implements IsPoint2d {
    constructor(public x : number, public y : number){

    }

    add(vector : Vector2d){
        return new Point2d(this.x + vector.x, this.y + vector.y);
    }

    distance(point : IsPoint2d){
        return Math.sqrt(((this.x - point.x) * (this.x - point.x)) + ((this.y - point.y) * (this.y - point.y)));
    }

    rotateAround(anchor : IsPoint2d, radians: number){
        var x1 = this.x - anchor.x;
        var y1 = this.y - anchor.y;

        var x2 = x1 * Math.cos(radians) - y1 * Math.sin(radians);
        var y2 = x1 * Math.sin(radians) + y1 * Math.cos(radians);

        var newx = x2 + anchor.x;
        var newy = y2 + anchor.y;

        var bdhPoint = new Point2d(newx, newy);
        return bdhPoint;
    }
}


