import { GeneratedPointResponse } from './GeneratedPointResponse';


export interface GeneratedClusterCellResponse {
    point: GeneratedPointResponse;
    hoogte: number;
    northFacades: boolean[];
    eastFacades: boolean[];
    southFacades: boolean[];
    westFacades: boolean[];
}
