import { BuildingConceptCatalog } from "@app/data/schema/models/BuildingConceptCatalog";
import { ConceptConfiguration } from "./ConceptConfiguration";



export class CatalogConfiguration {


    constructor(public catalog : BuildingConceptCatalog, public conceptConfigurations: ConceptConfiguration[]) {
    
    }


    allesMagConf(configuration: ConceptConfiguration) {
        configuration.leftIsIndifferent = true;
        configuration.rightIsIndifferent = true;
        configuration.belowIsIndifferent = true;
        configuration.aboveIsIndifferent = true;
    }

    torentje(configuration: ConceptConfiguration) {
        configuration.leftIsIndifferent = false;
        configuration.rightIsIndifferent = false;
        configuration.belowIsIndifferent = false;
        configuration.aboveIsIndifferent = false;

        configuration.allowedAbove = [configuration.bouwconcept];
        configuration.allowedBelow = [configuration.bouwconcept];

        configuration.allowedOnLowestLevel = true;
        configuration.emptySpaceAllowedAbove = true;
        configuration.emptySpaceAllowedLeft = true;
        configuration.emptySpaceAllowedRight = true;
    }

    torentjeStrickt(configuration: ConceptConfiguration) {
        var selfIndexLeft = configuration.allowedLeft.indexOf(configuration.bouwconcept);
        if (selfIndexLeft != -1) {
            configuration.allowedLeft.splice(selfIndexLeft, 1);
        }

        var selfIndexRight = configuration.allowedRight.indexOf(configuration.bouwconcept);
        if (selfIndexRight != -1) {
            configuration.allowedRight.splice(selfIndexRight, 1);
        }

        this.torentje(configuration);
    }

    plint(configuration: ConceptConfiguration) {
     
        configuration.leftIsIndifferent = false;
        configuration.rightIsIndifferent = false;
        configuration.belowIsIndifferent = false;
        configuration.aboveIsIndifferent = false;

        this.conceptConfigurations.forEach(c => c.allowedOnLowestLevel = false);
        this.conceptConfigurations.forEach(c => {

            c.belowIsIndifferent = false;

            if (!c.allowedBelow.find(f => f.id == configuration.bouwconcept.id)) {
                c.allowedBelow.push(configuration.bouwconcept);
            }
        });

        configuration.emptySpaceAllowedAbove = true;
        configuration.allowedOnLowestLevel = true;
        configuration.emptySpaceAllowedLeft = true;
        configuration.emptySpaceAllowedRight = true;

        configuration.allowedLeft = [configuration.bouwconcept];
        configuration.allowedRight = [configuration.bouwconcept];
        configuration.allowedBelow = [];
        configuration.allowedAbove = this.conceptConfigurations.map(i => i.bouwconcept);
    }

    optopper(configuration: ConceptConfiguration) {

        configuration.leftIsIndifferent = false;
        configuration.rightIsIndifferent = false;
        configuration.belowIsIndifferent = false;
        configuration.aboveIsIndifferent = false;
       
        this.conceptConfigurations.forEach(c => {
            c.emptySpaceAllowedAbove = false
            c.aboveIsIndifferent = false;

            if (!c.allowedAbove.find(f => f.id == configuration.bouwconcept.id)) {
                c.allowedAbove.push(configuration.bouwconcept);
            }
        });

        configuration.allowedOnLowestLevel = true;
        configuration.emptySpaceAllowedAbove = true;
        configuration.emptySpaceAllowedLeft = true;
        configuration.emptySpaceAllowedRight = true;

        configuration.allowedLeft = [configuration.bouwconcept];
        configuration.allowedRight = [configuration.bouwconcept];
        configuration.allowedAbove = [];
        configuration.allowedBelow = this.conceptConfigurations.map(i => i.bouwconcept);
    }

    kopLinks(configuration: ConceptConfiguration) {

        configuration.leftIsIndifferent = false;
        configuration.rightIsIndifferent = false;
        configuration.belowIsIndifferent = false;
        configuration.aboveIsIndifferent = false;
       
        this.conceptConfigurations.forEach(c => {
            c.leftIsIndifferent = false;
            c.emptySpaceAllowedLeft = false;

            if (!c.allowedLeft.find(f => f.id == configuration.bouwconcept.id)) {
                c.allowedLeft.push(configuration.bouwconcept);
            }
        });

        configuration.allowedLeft = [];
        configuration.allowedBelow = [configuration.bouwconcept];
        configuration.allowedAbove = [configuration.bouwconcept];

        configuration.allowedOnLowestLevel = true;
        configuration.emptySpaceAllowedAbove = true;
        configuration.emptySpaceAllowedLeft = true;
        configuration.emptySpaceAllowedRight = true;

        configuration.allowedRight = this.conceptConfigurations.map(i => i.bouwconcept);
    }

    kopRechts(configuration: ConceptConfiguration) {
        configuration.leftIsIndifferent = false;
        configuration.rightIsIndifferent = false;
        configuration.belowIsIndifferent = false;
        configuration.aboveIsIndifferent = false;
       
        configuration.allowedRight = [];
        configuration.emptySpaceAllowedRight = true;

        this.conceptConfigurations.forEach(c => {
            if (c.id == configuration.bouwconcept.id) {
                return;
            }

            c.rightIsIndifferent = false;
            c.emptySpaceAllowedRight = false;
            if (!c.allowedRight.find(f => f.id == configuration.bouwconcept.id)) {
                c.allowedRight.push(configuration.bouwconcept);
            }
        });

        configuration.allowedOnLowestLevel = true;
        configuration.emptySpaceAllowedAbove = true;
        configuration.allowedLeft = this.conceptConfigurations.map(i => i.bouwconcept);
        configuration.allowedBelow = [configuration.bouwconcept];
        configuration.allowedAbove = [configuration.bouwconcept];
    }

    pixel(configuration: ConceptConfiguration) {
        configuration.leftIsIndifferent = false;
        configuration.rightIsIndifferent = false;
        configuration.belowIsIndifferent = false;
        configuration.aboveIsIndifferent = false;
       
        var selfIndexLeft = configuration.allowedLeft.indexOf(configuration.bouwconcept);
        if (selfIndexLeft != -1) {
            configuration.allowedLeft.splice(selfIndexLeft, 1);
        }

        var selfIndexRight = configuration.allowedRight.indexOf(configuration.bouwconcept);
        if (selfIndexRight != -1) {
            configuration.allowedRight.splice(selfIndexRight, 1);
        }

        var selfIndexTop = configuration.allowedAbove.indexOf(configuration.bouwconcept);
        if (selfIndexTop != -1) {
            configuration.allowedAbove.splice(selfIndexTop, 1);
        }

        var selfIndexBelow = configuration.allowedBelow.indexOf(configuration.bouwconcept);
        if (selfIndexBelow != -1) {
            configuration.allowedBelow.splice(selfIndexRight, 1);
        }
    }

    allesMag() {
        this.conceptConfigurations.forEach(c => {
            this.alles(c, 'boven');
            this.alles(c, 'onder');
            this.alles(c, 'links');
            this.alles(c, 'rechts');
        });
    }

    alles(concept: ConceptConfiguration, waar: 'boven' | 'onder' | 'links' | 'rechts') {
        switch (waar) {
            case 'boven':
                concept.aboveIsIndifferent = false;
                concept.allowedAbove = this.conceptConfigurations.map(i => i.bouwconcept);
                concept.emptySpaceAllowedAbove = true;
                break;
            case 'onder':
                concept.belowIsIndifferent = false;
                concept.allowedBelow = this.conceptConfigurations.map(i => i.bouwconcept);
                concept.allowedOnLowestLevel = true;
                break;
            case 'links':
                concept.leftIsIndifferent = false;
                concept.allowedLeft = this.conceptConfigurations.map(i => i.bouwconcept);
                concept.emptySpaceAllowedLeft = true;
                break;
            case 'rechts':
                concept.rightIsIndifferent = false;
                concept.allowedRight = this.conceptConfigurations.map(i => i.bouwconcept);
                concept.emptySpaceAllowedRight = true;
                break;

        }
    }


    alleenZelf(concept: ConceptConfiguration, waar: 'boven' | 'onder' | 'links' | 'rechts') {
        switch (waar) {
            case 'boven':
                concept.aboveIsIndifferent = false;
                concept.allowedAbove = [concept.bouwconcept];
                break;
            case 'onder':
                concept.belowIsIndifferent = false;
                concept.allowedBelow = [concept.bouwconcept];
                break;
            case 'links':
                concept.leftIsIndifferent = false;
                concept.allowedLeft = [concept.bouwconcept];
                break;
            case 'rechts':
                concept.rightIsIndifferent = false;
                concept.allowedRight = [concept.bouwconcept];
                break;
        }
    }
}
