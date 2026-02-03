import { IsPoint2d } from "@app/shared/models/IsPoint2d";
import { ProjectVersion } from "./DataTransferObjects/ProjectVersion";

export interface Project {
    basePolygon: IsPoint2d[];
    id : string;
    name: string
    versies : ProjectVersion[];
    owner : string;
}



