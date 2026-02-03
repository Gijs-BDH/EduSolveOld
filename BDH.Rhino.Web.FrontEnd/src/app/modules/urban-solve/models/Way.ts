import { IsPoint2d } from "@app/shared/models/IsPoint2d";
import { DataModel } from "../../project-editor/models/DataModel";

export class Way extends DataModel {
    points: IsPoint2d[];
    diameter: number;

    constructor(points : IsPoint2d[], diameter : number){
        super();
        this.points = points;
        this.diameter = diameter;
    }
}

