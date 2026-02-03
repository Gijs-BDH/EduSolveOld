import { DataModel } from "@app/modules/project-editor/models/DataModel";
import { DataModelProxy } from "./DataModelProxy";

//extends the datamodelproxy for selectable user elements.

export abstract class SelectableModelProxy extends DataModelProxy {
    
    public get isSelected() {
        return this.dataModel?.isSelected ?? false;
    }

    public set isSelected(val) {
        if(val === this.isSelected){
            return;
        }
        
        this.dataModel.isSelected = val;

        this.traverse((m : any) => {
            if(m.material){
                m.material.opacity = val ? 1 : 0.5;
            }
        })
    }

    constructor(public dataModel: DataModel) {
        super();
    }
}


