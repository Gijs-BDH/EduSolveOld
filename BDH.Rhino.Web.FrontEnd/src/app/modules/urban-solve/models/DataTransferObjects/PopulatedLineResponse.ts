import { IsLine2d } from "../../../../shared/models/IsLine2d";
import { ConceptConfigurationResponse } from '@app/modules/concept-solve/Model/ConceptConfigurationResponse';


export interface PopulatedLineResponse {
    line: IsLine2d;
    solution: ConceptConfigurationResponse[];
    usedSeed: number | undefined;
}
