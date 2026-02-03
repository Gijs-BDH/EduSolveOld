import { IsPoint2d } from "@app/shared/models/IsPoint2d";
import { ProjectVersionCluster } from "./ProjectVersionCluster";

export interface ProjectVersion {
    name: string;
    id: string;
    gridRotation: number;
    gridTranslation: number;
    levelHeight: number;
    obstacles: IsPoint2d[];
    clusters: ProjectVersionCluster[];
    constructionConceptProducerId : string;
    constructionConceptId : string;
    seed : number;
    minimumGridSize : number;
    allowDisconnected : boolean;
}
