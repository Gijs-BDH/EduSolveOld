import { IsPoint2d } from "@app/shared/models/IsPoint2d";
import { DataModel } from "../../project-editor/models/DataModel";
import { Cluster } from "@app/modules/edu-solve/models/Cluster";

export class SchoolDataModel extends DataModel{
    public response : { 
        clusters : Cluster[],
        usedSeed : number
    } | undefined;



    constructor(public tiles : IsPoint2d[][]){
        super();
    }
}
