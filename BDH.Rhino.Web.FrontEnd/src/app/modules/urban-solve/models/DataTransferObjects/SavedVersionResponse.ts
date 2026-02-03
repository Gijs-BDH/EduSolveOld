import { Feature, LineString } from '@turf/turf';
import { SaveVersionBuildingConceptCatalog } from './SaveVersionBuildingConceptCatalog';
import { SavedWayProperties } from './SavedWayProperties';
import { SavedVersionGenericMassTransform } from './SavedVersionGenericMassTransform';
import { SavedVersionBuildingConceptTransform } from './SavedVersionBuildingConceptTransform';


export interface SavedVersionResponse {
    name: string;
    buildingConcepts: SavedVersionBuildingConceptTransform[];
    genericMasses: SavedVersionGenericMassTransform[];
    catalogs: SaveVersionBuildingConceptCatalog[];
    ways: Feature<LineString, SavedWayProperties>[];
    profitReport: string;
}
