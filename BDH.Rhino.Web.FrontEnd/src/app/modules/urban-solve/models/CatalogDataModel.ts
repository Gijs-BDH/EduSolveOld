import { ConceptConfigurationResponse } from "@app/modules/concept-solve/Model/ConceptConfigurationResponse";
import { DataModel } from "../../project-editor/models/DataModel";
import { BuildingConceptCatalog } from "@app/data/schema/models/BuildingConceptCatalog";
import { IsPoint2d } from "@app/shared/models/IsPoint2d";

//the data model for a building concept catalog line in the project.
//the configuration property 

export class CatalogDataModel extends DataModel {

    configuration : ConceptConfigurationResponse[] | undefined;
    public levelsFrom : number
    public levelsTo : number
    public pinned : boolean = false;
    public usedSeed : number | null = null;
    public useSeed : boolean = false;
    
    constructor(public startPoint: IsPoint2d, public endPoint: IsPoint2d, public catalog : BuildingConceptCatalog) {
        super();

        this.levelsFrom = catalog.allowedRowsFrom ?? 3;
        this.levelsTo = catalog.allowedRowsTo ?? 8;
    }
}
