
//base class for all data models.
//IS SELECTED SHOULD NOT BE HERE

export class DataModel {
    private _isSelected = false;

    public get isSelected() {
        return this._isSelected;
    }

    public set isSelected(val) {
        if(val === this._isSelected){
            return;
        }
        
        this._isSelected = val;
    }
}


