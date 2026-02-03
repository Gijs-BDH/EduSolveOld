import { TransformableModelProxy } from "@app/modules/project-editor/models/TransformableModelProxy";
import { EduSolveDataService } from "../service/edu-solve-data.service";
import { FixedPointDataModel } from "./FixedPointDataModel";
import { EduSolveViewerService } from "../service/edu-solve-viewer.service";
import { IsPoint2d } from "@app/shared/models/IsPoint2d";


export class FixedPointProxy extends TransformableModelProxy {


    constructor(private fixedPoint: FixedPointDataModel, private viewer : EduSolveViewerService, private data : EduSolveDataService) {
        super(fixedPoint);
    }

    applyTransformation(point: IsPoint2d, rotation: number): void {
        this.fixedPoint.location = point;
        this.viewer.drawProjectToCanvas();
    }
    setPosition(point: IsPoint2d): void {
        this.fixedPoint.location = point;
        this.viewer.drawProjectToCanvas();
    }
    setRotation(rotation: number): void {
         
    }
    removeFromScene(): void {
        this.data.clusters.forEach(c => {
            var index = c.fixedPoints.indexOf(this.fixedPoint);
            if(index != -1){
                c.fixedPoints.splice(index, 1);
            }
        })
        this.viewer.drawProjectToCanvas();
    }
}
