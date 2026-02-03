import { Component } from '@angular/core';
import { ShellService } from '../../service/shell.service';
import { BuildingConceptPropertiesDictionaryService } from '@app/shared/service/building-concept-properties-dictionary.service';
import { ConceptConfiguration } from '../../Model/ConceptConfiguration';
import { DataService } from '../../service/data.service';
import { ConceptConfigurationService } from '../../../../data/service/concept-configuration.service';

@Component({
  selector: 'app-concepten',
  templateUrl: './concepten.component.html',
  styleUrls: ['./concepten.component.scss']
})
export class ConceptenComponent {


    constructor(
        public shell : ShellService, 
        public data : DataService,
        public bouwconceptDictionary : BuildingConceptPropertiesDictionaryService,
        private persistence : ConceptConfigurationService){

           
    }



    async allesMagConf(configuration : ConceptConfiguration){
        this.data.configuration?.allesMagConf(configuration);
  
        await this.solve();
    }

    async torentje(configuration : ConceptConfiguration){
        this.data.configuration?.torentje(configuration);

        await this.solve();
    }
    async torentjeStrick(configuration : ConceptConfiguration){
        this.data.configuration?.torentjeStrickt(configuration);
        
        return this.torentje(configuration);
    }

    async plint(configuration : ConceptConfiguration){
        this.data.configuration?.plint(configuration);

        await this.solve();
    }

    async optopper(configuration : ConceptConfiguration){
        this.data.configuration?.optopper(configuration);

        await this.solve();
    }

    async kopLinks(configuration : ConceptConfiguration){
        this.data.configuration?.kopLinks(configuration);

        await this.solve();
    }

    async kopRechts(configuration : ConceptConfiguration){
        this.data.configuration?.kopRechts(configuration);
     
        await this.solve();
    }

    async pixel(configuration : ConceptConfiguration){
        this.data.configuration?.pixel(configuration);

        await this.solve();
    }

    async allesMag(){
        this.data.configuration?.allesMag();

        await this.solve();
    }

    alles(concept : ConceptConfiguration, waar : 'boven' | 'onder' | 'links' | 'rechts'){
        this.data.configuration?.alles(concept, waar);
    }


    alleenZelf(concept : ConceptConfiguration, waar : 'boven' | 'onder' | 'links' | 'rechts'){
        this.data.configuration?.alleenZelf(concept, waar);
    }

    async solve(){
        await this.shell.solve();
    }


    apply(){
        if(!this.data.configuration){
            return;
        }

        var catalog = this.data.configuration.catalog;
        if(!catalog){
            return;
        }

        var data = this.data.configuration.conceptConfigurations.map(i => i.mapToSchema());

        this.persistence.apply(catalog, data).subscribe({
            next: () => window.alert("Alles lijkt goed gegaan."),
            error: (err) => window.alert("Er is iets mis gegaan. Probeer het later nog eens. Bericht: " + err.message)
        });
    }
}
