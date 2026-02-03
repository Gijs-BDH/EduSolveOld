import { UrbanSolveDataService } from "../../service/urban-solve-data.service";
import { UrbanSolveViewerService } from "../../service/urban-solve-viewer.service";
import { DeletableModelProxy } from "@app/modules/project-editor/models/DeletableModelProxy";
import { SchoolDataModel } from "../SchoolDataModel";



export class SchoolModelProxy extends DeletableModelProxy {
    constructor(private school: SchoolDataModel, private viewer: UrbanSolveViewerService, private data: UrbanSolveDataService) {
        super(school);
    }

    override removeFromScene(): void {
        this.data.removeGeneric(this.school);
        this.viewer.rebuildSceneGeometries();
    }

}
