import { Injectable } from '@angular/core';
import { SchoolDataModel } from '../models/SchoolDataModel';
import { SelectableModelProxy } from '@app/modules/project-editor/models/SelectableModelProxy';
import { SchoolBuildingGeometryFactoryService } from '@app/modules/edu-solve/service/school-building-geometry-factory.service';
import { SchoolModelProxy } from "../models/Three/SchoolModelProxy";
import { UrbanSolveViewerService } from './urban-solve-viewer.service';
import { UrbanSolveDataService } from './urban-solve-data.service';
import { SchoolConstructionGeometryFactoryService } from '@app/modules/edu-solve/service/school-construction-geometry-factory.service';

@Injectable({
    providedIn: 'root'
})
export class SchoolModelFactoryService {

    constructor(private modelFactory: SchoolBuildingGeometryFactoryService, private constructionFactory : SchoolConstructionGeometryFactoryService) { }


    create(school: SchoolDataModel, data: UrbanSolveDataService, viewer: UrbanSolveViewerService): SelectableModelProxy {
        var simpleProxy = new SchoolModelProxy(school, viewer, data);
        if (school.response) {
            var geometry = this.modelFactory.create(school.response, false)
            simpleProxy.add(geometry);

            var construction = this.constructionFactory.create(school.response, false);
            simpleProxy.add(construction);
        }

        return simpleProxy;
    }
}
