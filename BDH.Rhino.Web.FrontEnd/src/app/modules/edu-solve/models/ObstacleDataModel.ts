import { DataModel } from "@app/modules/project-editor/models/DataModel";
import { IsPoint2d } from "@app/shared/models/IsPoint2d";

export class ObstacleDataModel extends DataModel {
    constructor(public location : IsPoint2d){
        super();
    }
}

