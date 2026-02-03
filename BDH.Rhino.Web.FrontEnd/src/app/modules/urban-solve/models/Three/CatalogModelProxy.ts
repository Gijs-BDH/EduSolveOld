import { CatalogDataModel } from "../CatalogDataModel";
import { DeletableModelProxy } from "@app/modules/project-editor/models/DeletableModelProxy";
import { UrbanSolveDataService } from "../../service/urban-solve-data.service";
import { UrbanSolveViewerService } from "../../service/urban-solve-viewer.service";

export class CatalogModelProxy extends DeletableModelProxy{

    constructor(private catalogModel : CatalogDataModel, private viewer : UrbanSolveViewerService, private data : UrbanSolveDataService){
        super(catalogModel);
    }

    override removeFromScene(): void {
        this.data.removeGeneric(this.catalogModel);
        this.viewer.rebuildSceneGeometries();
    }
}