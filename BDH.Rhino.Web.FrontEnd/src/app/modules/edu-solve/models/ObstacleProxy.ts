import { ObstacleDataModel } from "./ObstacleDataModel";
import { TransformableModelProxy } from "@app/modules/project-editor/models/TransformableModelProxy";
import { EduSolveDataService } from "../service/edu-solve-data.service";
import { EduSolveViewerService } from "../service/edu-solve-viewer.service";
import { IsPoint2d } from "@app/shared/models/IsPoint2d";


export class ObstacleProxy extends TransformableModelProxy {

    constructor(private obstacle : ObstacleDataModel, private viewer : EduSolveViewerService, private data : EduSolveDataService){
        super(obstacle);
    }

    applyTransformation(point: IsPoint2d, rotation: number): void {
        this.obstacle.location = point
        this.viewer.drawProjectToCanvas();
    }
    setPosition(point: IsPoint2d): void {
        this.obstacle.location = point
        this.viewer.drawProjectToCanvas();
    }
    setRotation(rotation: number): void {
         
    }
    removeFromScene(): void {
        var index = this.data.obstacles.indexOf(this.obstacle);
        if(index != -1){
            this.data.obstacles.splice(index, 1);
        }

        this.viewer.drawProjectToCanvas();
    }
}


