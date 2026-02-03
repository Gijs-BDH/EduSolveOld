import { IsPoint3d } from "./IsPoint3d";

export class Point3d implements IsPoint3d{
    constructor(public x : number, public y : number, public z : number){

    }

    distanceTo(point : Point3d) : number{
        var a = point.x - this.x;
        var b = point.y - this.y;
        var c = point.z - this.z;

        var distance = Math.sqrt(a * a + b * b + c * c);

        return distance;
    }
}