import { Feature, LineString, Properties } from '@turf/turf';
import { SaveVersionBuildingConceptCatalog } from './SaveVersionBuildingConceptCatalog';
import { SaveVersionGenericMass } from './SaveVersionGenericMass';
import { SaveVersionConcept } from './SaveVersionConcept';


export interface SaveVersionBody {
    ProjectId: string;
    Name: string;
    BuildingConcepts: SaveVersionConcept[];
    GenericMasses: SaveVersionGenericMass[];
    Catalogs: SaveVersionBuildingConceptCatalog[];
    Ways: Feature<LineString, Properties>[];
}
