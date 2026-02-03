import { ConceptConfigurationConceptResponse } from "./ConceptConfigurationConceptResponse";



export interface ConceptConfigurationGridCellResponse {
    occupiedBy: ConceptConfigurationConceptResponse;
    originFor: ConceptConfigurationConceptResponse | null;
}
