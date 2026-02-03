import { Injectable } from '@angular/core';
import { BuildingConceptCatalog } from '@app/data/schema/models/BuildingConceptCatalog';
import { ConceptConfiguration } from '../Model/ConceptConfiguration';
import { CatalogConfiguration } from "../Model/CatalogConfiguration";
import { BuildingConceptPropertiesDictionaryService } from '@app/shared/service/building-concept-properties-dictionary.service';

@Injectable({
    providedIn: 'root'
})
export class DataService {

    public numberOfLevelsFrom : number = 6;
    public numberOfLevelsTo : number = 8;
    public numberOfColumns : number = 10;
    public configuration : CatalogConfiguration | undefined;
    


    constructor(private concepten : BuildingConceptPropertiesDictionaryService) {

    }


    setActive(catalog: BuildingConceptCatalog) {

        this.concepten.refresh();

        var configuration = [];
        for(var i = 0; i < catalog.buildingConcepts.length; i++){
            var concept = catalog.buildingConcepts[i];
            var conceptProps = this.concepten.getByIdOrThrow(concept.id);

            var toAdd = new ConceptConfiguration(conceptProps)
            configuration.push(toAdd);
        }

        this.configuration = new CatalogConfiguration(catalog, configuration);
        this.numberOfLevelsFrom = catalog.allowedRowsFrom ?? 6;
        this.numberOfLevelsTo = catalog.allowedRowsTo ?? 8;
    }
}
