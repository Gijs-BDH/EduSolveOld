import { IsPoint2d } from "@app/shared/models/IsPoint2d";

export interface ProjectVersionCluster {
    bvo: number;
    name: string;
    lowestLevel: number;
    highestLevel: number;
    levels: number;
    fixedPoints: IsPoint2d[];
    color : string,
    id : string;
    shape : boolean[];
    shapeWidth : number;
    connections : string[];
}


