import { TypologyDescriptor } from './TypologyDescriptor';
import { TypologySummary } from './TypologySummary';

export class CalculatedTypology implements TypologySummary {

    public get name(): string {
        return this.typology.typology.name;
    }
    public get volume(): number {
        return this.typology.volume;
    }
    public get volumePerBvo(): number {
        return this.typology.typology.brutoInhoudPerBvoBasis;
    }
    public get bvo(): number {
        return Math.ceil(this.typology.volume / this.typology.typology.brutoInhoudPerBvoBasis);
    }
    public get bouwkostenPerBvo(): number {
        return this.typology.typology.bouwkostenPerBvoBasis;
    }
    public get bouwkosten(): number {
        return this.typology.typology.bouwkostenPerBvoBasis * Math.ceil(this.typology.volume / this.typology.typology.brutoInhoudPerBvoBasis);
    }
    public get invloedBeng(): number {
        return this.typology.typology.prijsinvloedBeng;
    }
    public get invloedEpc(): number {
        return this.typology.typology.prijsInvloedEpc;
    }
    public get totaal(): number {
        return Math.ceil(
            this.bouwkosten +
            this.invloedEpc * this.bvo +
            this.invloedBeng * this.bvo);
    }

    constructor(private typology: TypologyDescriptor) {
    }
}
