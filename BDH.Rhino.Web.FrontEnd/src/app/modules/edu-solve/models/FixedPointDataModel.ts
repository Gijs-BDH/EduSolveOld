import { DataModel } from "@app/modules/project-editor/models/DataModel";
import { IsPoint2d } from "@app/shared/models/IsPoint2d";

//the location is world aligned. make sure to transform to xy when sending to api to perform generative design algorithms.

export class FixedPointDataModel extends DataModel {

    constructor(public location: IsPoint2d) {
        super();
    }

}
