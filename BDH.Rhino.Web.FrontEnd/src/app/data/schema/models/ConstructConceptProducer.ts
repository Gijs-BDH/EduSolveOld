import { ConstructionConcept } from "./ConstructionConcept";


export interface ConstructionConceptProducer {
    id: string;
    name: string;
    products: ConstructionConcept[];
}
