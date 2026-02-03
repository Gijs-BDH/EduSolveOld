import { AfterViewInit, Component } from '@angular/core';
import { ShellService } from '../service/shell.service';
import { BuildingConceptPropertiesDictionaryService } from '@app/shared/service/building-concept-properties-dictionary.service';
import { DataService } from '../service/data.service';
import { ActivatedRoute } from '@angular/router';
import { filter, mergeMap } from 'rxjs/operators';
import { CatalogService } from '@app/data/service/catalog.service';
import { ConceptConfigurationService } from '../../../data/service/concept-configuration.service';
import { SimpleModelViewerService } from '@app/shared/service/simple-model-viewer.service';

@Component({
  selector: 'app-concept-solve',
  templateUrl: './concept-solve.component.html',
  styleUrls: ['./concept-solve.component.scss']
})
export class ConceptSolveComponent implements AfterViewInit {



    constructor(
        public shell : ShellService, 
        public data : DataService,
        private catalogService : CatalogService,
        public bouwconceptDictionary : BuildingConceptPropertiesDictionaryService, 
        private viewer : SimpleModelViewerService,
        private route : ActivatedRoute,
        private persistence : ConceptConfigurationService){

           
    }



    ngAfterViewInit(): void {
        var canvas = document.getElementById("concept-solver-canvas");
        if(!canvas){
            throw new Error("No document element with id 'canvas' found");
        }

        this.bouwconceptDictionary.refresh().subscribe({
            next : () => 
                this.route.queryParams
                    .pipe(filter(params => params['catalog']))
                    .pipe(mergeMap(params => this.catalogService.getById(params['catalog'])))
                    .subscribe(async catalog => {

                        
                        this.data.setActive(catalog)
                        this.data.configuration!.allesMag();
                        
                        this.persistence
                            .getConfiguration(catalog.id)
                            .subscribe({
                                next: async (res) => {

                                    res.forEach(c => {
                                        if(!this.data.configuration){
                                            return;
                                        }

                                        var entry = this.data.configuration.conceptConfigurations.find(_c => _c.id == c.bouwconceptId);
                                        if(!entry){
                                            return;
                                        }

                                        entry.applySchema(c, this.data.configuration.conceptConfigurations.map(i => i.bouwconcept));
                                    })

                                    await this.shell.solve();
                                }
                            })
                    })
            })

        this.viewer.initToCanvas(canvas);
    }
}
