import { Injectable } from '@angular/core';
import { DataModelProxy } from "@app/modules/project-editor/models/DataModelProxy";
import { CatalogDataModel } from '../models/CatalogDataModel';
import { PolylineFactoryService } from '@app/modules/project-editor/service/polyline-factory.service';
import { CatalogModelProxy } from '../models/Three/CatalogModelProxy';
import { ConceptConfigurationSolutionGeometryFactoryService } from '@app/modules/concept-solve/service/concept-configuration-solution-geometry-factory.service';
import { UrbanSolveDataService } from './urban-solve-data.service';
import { UrbanSolveViewerService } from './urban-solve-viewer.service';

//creates geometry for a catalog data model. 

@Injectable({
  providedIn: 'root'
})
export class CatalogFactoryService {

    constructor(private polylineFactory : PolylineFactoryService, private factory : ConceptConfigurationSolutionGeometryFactoryService) {

    }

    createLine(model : CatalogDataModel, data : UrbanSolveDataService, viewer : UrbanSolveViewerService): DataModelProxy {
        var proxy = new CatalogModelProxy(model,viewer, data);
        
        var line = this.polylineFactory.create([model.startPoint, model.endPoint], 'red', 1);
        proxy.add(line);

        if(model.configuration){
            var _model = this.factory.createForLine(model.startPoint, model.endPoint, model.configuration);
            proxy.add(_model);    
        }

        return proxy;
    }
}
