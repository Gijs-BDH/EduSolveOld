import { IsBouwkostenBasisTypologie } from '@app/data/schema/models/bouwkosten-basis-typologie';



export class TypologyDescriptor {
    volume: number;

    constructor(public typology: IsBouwkostenBasisTypologie) {
        this.volume = 0;
    }
}
