import { IsPoint2d } from "./IsPoint2d";
import { Point2d } from "./Point2d";


export class Vector2d implements IsPoint2d {
    constructor(public x: number, public y: number) {
    }


    static fromPoints(tip: IsPoint2d, tale: IsPoint2d) {
        return new Vector2d(tip.x - tale.x, tip.y - tale.y);
    }

    getLength() {
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
    }

    normalize() {
        var length = this.getLength();

        return new Vector2d(
            this.x / length,
            this.y / length
        );
    }

    setLength(length: number) {
        var normalized = this.normalize();

        return new Vector2d(
            normalized.x * length,
            normalized.y * length
        );
    }

    rotate(radians: number) {
        var point = new Point2d(this.x, this.y);
        var anchor = new Point2d(0, 0);
        var rotated = point.rotateAround(anchor, radians);
        return new Vector2d(rotated.x, rotated.y);
    }
}
