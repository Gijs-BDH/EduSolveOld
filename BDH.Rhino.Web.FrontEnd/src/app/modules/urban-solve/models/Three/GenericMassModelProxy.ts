import { GenericMass } from "../GenericMass";
import { TransformableModelProxy } from "@app/modules/project-editor/models/TransformableModelProxy";
import { UrbanSolveDataService } from "../../service/urban-solve-data.service";
import { UrbanSolveViewerService } from "../../service/urban-solve-viewer.service";
import { IsPoint2d } from "@app/shared/models/IsPoint2d";


export class GenericMassModelProxy extends TransformableModelProxy {



    constructor(public massModel: GenericMass, private viewer : UrbanSolveViewerService, private data : UrbanSolveDataService) {
        super(massModel);

    }

    applyTransformation(point: IsPoint2d, rotation: number): void {
        this.massModel.position = point;
        this.massModel.rotation = rotation;
        this.viewer.rebuildSceneGeometries();
    }

    removeFromScene(): void {
        this.data.removeGeneric(this.massModel);
        this.viewer.rebuildSceneGeometries();
    }
}
 


