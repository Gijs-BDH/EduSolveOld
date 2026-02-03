import { Injectable } from '@angular/core';
import { BuildingConceptCatalog } from '@app/data/schema/models/BuildingConceptCatalog';
import { DataService } from './data.service';
import { SolverService } from './solver.service';
import { BuildingConceptGeometryLoaderService } from '@app/modules/urban-solve/service/building-concept-geometry-loader.service';
import { ConceptConfigurationSolutionGeometryFactoryService } from './concept-configuration-solution-geometry-factory.service';
import { SimpleModelViewerService } from '@app/shared/service/simple-model-viewer.service';

@Injectable({
    providedIn: 'root'
})
export class ShellService {

    public get conceptsInCatalog() {
        if(!this.data.configuration){
            return [];
        }

        return this.data.configuration.conceptConfigurations.map(i => i.bouwconcept)
    }


    constructor(
        private data : DataService, 
        private viewer : SimpleModelViewerService, 
        private solver : SolverService,
        private bouwconceptGeometryLoader : BuildingConceptGeometryLoaderService, 
        private conceptFactory : ConceptConfigurationSolutionGeometryFactoryService
    ) {
        

        

    }

    setActive(conceptCatalogus : BuildingConceptCatalog){

        this.data.setActive(conceptCatalogus);

    }


    async solve(){
        var configuration = this.data.configuration?.conceptConfigurations;
        if(!configuration){
            return;
        }

        for(var i = 0; i < configuration.length; i++){
            var c = configuration[i];
            var geom = await this.bouwconceptGeometryLoader.getOrDownload(c.id);
        }

        this.solver.solve(configuration.map(i => i.mapToSchema()), this.data.numberOfColumns, this.data.numberOfLevelsFrom, this.data.numberOfLevelsTo, this.data.configuration?.catalog!, null).subscribe({
            next : (res) => {
                this.viewer.removeUserElements();

                var model = this.conceptFactory.create(res);
                this.viewer.addModel(model);
                
            },
            error: (err) => {
                window.alert(err.message);
            }
        })
    }


}
