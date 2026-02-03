import { BuildingConcept } from '@app/data/schema/models/BuildingConcept';



export class BouwconceptDescriptor {
    number: number = 1;

    constructor(public concept: BuildingConcept) {
    }
}
