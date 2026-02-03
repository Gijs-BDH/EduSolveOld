import { BouwconceptDescriptor } from './BouwconceptDescriptor';
import { ConceptSummary } from './ConceptSummary';

export class CalculatedConcept implements ConceptSummary {

    public get name(): string {
        return this.v.concept.name;
    };
    public get units(): number {
        return this.v.number;
    };
    public get bvoPerUnit(): number {
        return this.v.concept.bvoPerUnit;
    };
    public get bvo(): number {
        return Math.ceil(this.v.number * this.v.concept.bvoPerUnit);
    };
    public get productiekostenPerUnit(): number {
        return this.v.concept.productieKostenPerUnit;
    };
    public get productiekosten(): number {
        return Math.ceil(this.v.concept.productieKostenPerUnit * this.v.number);
    };

    constructor(private v: BouwconceptDescriptor) {
    }

}
