import { Injectable } from '@angular/core';
import { PolylineFactoryService } from '@app/modules/project-editor/service/polyline-factory.service';
import { BaseLine } from '../Model/BaseLine';
import { DataModelProxy } from "@app/modules/project-editor/models/DataModelProxy";

@Injectable({
    providedIn: 'root'
})
export class BaseLineFactoryService {

    constructor(private polylineService : PolylineFactoryService){

    }
    
    public create(baseLIne : BaseLine) : DataModelProxy{
        var polyline = this.polylineService.create([baseLIne.startPoint, baseLIne.endPoint], 'blue', 1);
        var proxy = new DataModelProxy();
        proxy.add(polyline);
        return proxy;
    }
}
