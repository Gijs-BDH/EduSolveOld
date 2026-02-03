import { BuildingConcept } from "@app/data/schema/models/BuildingConcept";
import { ConceptSchema } from "./ConceptSchema";


export class ConceptConfiguration {
    public get name(): string{
        return this.bouwconcept.name;
    };

    public get id () : string{
        return this.bouwconcept.id;
    }

    leftIsIndifferent : boolean = true;
    emptySpaceAllowedLeft: boolean = true;
    allowedLeft: BuildingConcept[] = [this.bouwconcept];

    rightIsIndifferent : boolean = true;
    emptySpaceAllowedRight: boolean = true;
    allowedRight: BuildingConcept[] = [this.bouwconcept];

    aboveIsIndifferent : boolean = true;
    emptySpaceAllowedAbove: boolean = true;
    allowedAbove: BuildingConcept[] = [this.bouwconcept];

    belowIsIndifferent : boolean = true;
    allowedOnLowestLevel: boolean = true;
    allowedBelow: BuildingConcept[] = [this.bouwconcept];

    columnSpan: number = 1;
    rowSpan : number = 1;
    
    constructor(
        public bouwconcept : BuildingConcept
    ){

    }


    public applySchema(schema : ConceptSchema, otherConcepts : BuildingConcept[]){
        this.leftIsIndifferent = schema.leftIsIndifferent;
        this.rightIsIndifferent = schema.rightIsIndifferent;
        this.aboveIsIndifferent = schema.aboveIsIndifferent;
        this.belowIsIndifferent = schema.belowIsIndifferent;
        
        this.emptySpaceAllowedLeft = schema.emptySpaceAllowedLeft;
        this.emptySpaceAllowedRight = schema.emptySpaceAllowedRight;
        this.emptySpaceAllowedAbove = schema.emptySpaceAllowedAbove;
        this.allowedOnLowestLevel = schema.allowedOnLowestLevel;

        this.allowedLeft = schema.allowedLeft.map(i => {
            var other = otherConcepts.find(c => c.id == i);
            if(!other){
                throw new Error("Onbekend bouwconcept tegen gekomen in configuratie. Handeling afgebroken.");
            }

            return other;
        });

        this.allowedRight = schema.allowedRight.map(i => {
            var other = otherConcepts.find(c => c.id == i);
            if(!other){
                throw new Error("Onbekend bouwconcept tegen gekomen in configuratie. Handeling afgebroken.");
            }

            return other;
        })

        this.allowedBelow = schema.allowedBelow.map(i => {
            var other = otherConcepts.find(c => c.id == i);
            if(!other){
                throw new Error("Onbekend bouwconcept tegen gekomen in configuratie. Handeling afgebroken.");
            }

            return other;
        })

        this.allowedAbove = schema.allowedAbove.map(i => {
            var other = otherConcepts.find(c => c.id == i);
            if(!other){
                throw new Error("Onbekend bouwconcept tegen gekomen in configuratie. Handeling afgebroken.");
            }

            return other;
        })

        this.columnSpan = schema.columnSpan;
        this.rowSpan = schema.rowSpan;
    }

    public mapToSchema() : ConceptSchema { 
        return {
            "bouwconceptId": this.id,
    
            "leftIsIndifferent" : this.leftIsIndifferent,
            "emptySpaceAllowedLeft": this.emptySpaceAllowedLeft,
            "allowedLeft": this.allowedLeft.map(i => i.id),
    
            "rightIsIndifferent" : this.rightIsIndifferent,
            "emptySpaceAllowedRight": this.emptySpaceAllowedRight,
            "allowedRight": this.allowedRight.map(i => i.id),
    
            "aboveIsIndifferent" : this.aboveIsIndifferent,
            "emptySpaceAllowedAbove": this.emptySpaceAllowedAbove,
            "allowedAbove": this.allowedAbove.map(i => i.id),
    
            "belowIsIndifferent" : this.belowIsIndifferent,
            "allowedOnLowestLevel": this.allowedOnLowestLevel,
            "allowedBelow": this.allowedBelow.map(i => i.id),
    
            "columnSpan" : this.columnSpan,
            "rowSpan" : this.rowSpan
        }
    }
    
    
}



