import { BuildingConceptCatalog } from "@app/data/schema/models/BuildingConceptCatalog";

export class TilePoperties {

    bestemming : string = "Wonen";
    autoGenerate : boolean = true;
    bouwStrategie : string = "Strokenbouw";
    tuinDiepte : number = 6;
    stoepBreedte : number = 6;
    woningen : number = 6;
    catalog : BuildingConceptCatalog | undefined;
    seed : number | undefined;
    minimumLineLength : number = 30;
    safeMargin : number = 60;
    deflation : number = 10;

    constructor(public bouwConcept : string){

    }

    static createDefault(bestemming : string): TilePoperties {
        return new TilePoperties(bestemming);
    }

    copy() : TilePoperties{
        var copy = new TilePoperties(this.bestemming);
        copy.autoGenerate = this.autoGenerate;
        copy.bouwStrategie = this.bouwStrategie;
        copy.tuinDiepte = this.tuinDiepte;
        copy.stoepBreedte = this.stoepBreedte;
        copy.woningen = this.woningen;
        copy.bouwConcept = this.bouwConcept;
        
        return copy;
    }
}
