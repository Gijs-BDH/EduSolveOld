import { DataModel } from "@app/modules/project-editor/models/DataModel";
import { IsPoint2d } from "@app/modules/urban-solve/models/Interfaces/IsPoint2d";

export class BaseLine extends DataModel{
    constructor(public startPoint : IsPoint2d, public endPoint : IsPoint2d){
        super();
    }
}