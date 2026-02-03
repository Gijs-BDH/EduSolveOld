import { Injectable } from '@angular/core';
import { DataModelPainter } from '../models/DataModelPainterService';

//Used to register user data model painters. 
//Reason for this service is that it would be nice to deactivate all painters before activating one, so that you cannot draw two things at once if the services are not handled correctly.
//Currently, only one instance of a painter can be registered.

@Injectable({
    providedIn: 'root'
})
export class DataModelPainterCollectionService {
    private _painters : DataModelPainter[] = [];
 
    public get painters() {
        return this._painters;
    }

    constructor() {

    }

    public register(painter : DataModelPainter){
        var index = this.painters.indexOf(painter);
        if(index != -1){
            return;
        }

        this._painters.push(painter);
    }

    public setActive(painter : DataModelPainter) : DataModelPainter{
        var index = this.painters.indexOf(painter);
        if(index == -1){
            throw new Error("No such data model painter was found.");
        }

        this.painters.forEach(p => p.confirm(false));
        painter.startDrawing();

        return painter;
    }
}
