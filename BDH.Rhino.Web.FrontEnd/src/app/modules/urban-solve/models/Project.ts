import { Feature, Polygon, Properties } from '@turf/turf';
import { ProjectVersion } from './ProjectVersion';


export interface Project {
    id: string;
    name: string;
    versions: ProjectVersion[];
    basePolygon: Feature<Polygon, Properties>;
}
