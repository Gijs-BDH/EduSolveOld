import { BouwconceptDescriptor } from './BouwconceptDescriptor';
import { TypologyDescriptor } from './TypologyDescriptor';



export interface GebouwdInEenProject {
    conceptSummaries: BouwconceptDescriptor[];
    typologySummaries: TypologyDescriptor[];
}
