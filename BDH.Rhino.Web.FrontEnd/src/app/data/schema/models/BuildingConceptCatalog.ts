import { BuildingConcept } from "./BuildingConcept";

//stores information about a building concept catalog.

export interface BuildingConceptCatalog {
    id : string;
    name : string;
    buildingConcepts: BuildingConcept[];
    allowedColumnsFrom : number | undefined;
    allowedColumnsTo : number | undefined;
    allowedRowsFrom : number | undefined;
    allowedRowsTo : number | undefined;
}
