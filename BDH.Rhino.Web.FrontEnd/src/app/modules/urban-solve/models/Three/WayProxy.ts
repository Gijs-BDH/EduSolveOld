import { Way } from "../Way";
import { DeletableModelProxy } from "@app/modules/project-editor/models/DeletableModelProxy";
import { UrbanSolveViewerService } from "../../service/urban-solve-viewer.service";
import { UrbanSolveDataService } from "../../service/urban-solve-data.service";


export class WayProxy extends DeletableModelProxy {


    constructor(public way: Way, private viewer : UrbanSolveViewerService, private data : UrbanSolveDataService){
        super(way);
    }

    override removeFromScene(): void {
        this.data.removeGeneric(this.way);
        this.viewer.rebuildSceneGeometries();
    }
}
