import { IsPoint2d } from "@app/shared/models/IsPoint2d";
import { Way } from "./Way";

export interface PolygonClipper{
    clip(inputPolygons: IsPoint2d[][], polylines: Way[]) : void;
}


