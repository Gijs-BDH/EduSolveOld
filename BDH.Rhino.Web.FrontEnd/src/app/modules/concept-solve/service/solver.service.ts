import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env';
import { ConceptConfigurationResponse } from '../Model/ConceptConfigurationResponse';
import { ConceptSchema } from '../Model/ConceptSchema';
import { BuildingConceptCatalog } from '@app/data/schema/models/BuildingConceptCatalog';
import { CatalogDataModel } from '@app/modules/urban-solve/models/CatalogDataModel';
import { Point2d } from '@app/shared/models/Point2d';
import { Box3 } from 'three';
import { ConceptConfigurationService } from '@app/data/service/concept-configuration.service';
import { BuildingConceptGeometryLoaderService } from '@app/modules/urban-solve/service/building-concept-geometry-loader.service';
import { UrbanSolveShellService } from '@app/modules/urban-solve/service/urban-solve-shell.service';

@Injectable({
    providedIn: 'root'
})
export class SolverService {

    baseUrl: string = environment.apiUrl + '/generativeDesign'

    constructor(private http: HttpClient,
        private shell : UrbanSolveShellService, 
        private configurationService : ConceptConfigurationService,
        private geometryLoader : BuildingConceptGeometryLoaderService,) {

    }


    solve(configuration: ConceptSchema[], width: number, heightFrom: number, heightTo : number, catalog : BuildingConceptCatalog, seed : number | null) {

        var body = 
        {
            "concepts": configuration,
            "width": width,
            "heightFrom": heightFrom,
            "heightTo": heightTo,
            "allowedColumnsFrom" : catalog.allowedColumnsFrom,
            "allowedColumnsTo" : catalog.allowedColumnsTo,
            "allowedRowsFrom" : catalog.allowedRowsFrom,
            "allowedRowsTo" : catalog.allowedRowsTo,
            "seed" : seed
        }

        var url = this.baseUrl + "/concepten"
        return this.http.post<ConceptConfigurationResponse[]>(url, body);
    }

    async solveAgain(model : CatalogDataModel)
    {
        var seed = model.useSeed ? model.usedSeed : null;
        this.configurationService
            .getConfiguration(model.catalog.id)
            .subscribe(async configuration => 
            {
                await this.applyConfiguration(model, configuration, seed)
            })       
    }

    async applyConfiguration(model : CatalogDataModel, configuration : ConceptSchema[], seed : number | null)
    {
        var span = 0;
        for(var i = 0; i < configuration.length; i++)
        {
            var c = configuration[i];
            var geom = await this.geometryLoader.getOrDownload(c.bouwconceptId);
            var box = new Box3().setFromObject(geom)
            var width = (box.max.x - box.min.x) / c.columnSpan;
            span += width;
        }

        var lineLength = new Point2d(model.startPoint.x, model.startPoint.y).distance(new Point2d(model.endPoint.x, model.endPoint.y));
        var averageColumnSize = span / configuration.length;
        var columsn = Math.floor(lineLength / averageColumnSize);
        if(model.catalog.allowedColumnsFrom && columsn < model.catalog.allowedColumnsFrom)
        {
            window.alert("Ongedlige configuratie: Het minimaal aantal vereiste kolommen past niet op deze lijn.");
            return;
        }

        this.solve(configuration, columsn, model.levelsFrom, model.levelsTo, model.catalog, seed)
            .subscribe(res => 
            {         
                model.configuration = res;
                this.shell.drawProjectToCanvas(true);
            });
    }

}
