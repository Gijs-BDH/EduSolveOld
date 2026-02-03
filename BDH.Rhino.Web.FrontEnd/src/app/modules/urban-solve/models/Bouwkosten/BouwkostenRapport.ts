import { ConceptSummary } from './ConceptSummary';
import { TypologySummary } from './TypologySummary';



export interface BouwkostenRapport {
    conceptSummaries: ConceptSummary[];
    somConceptBvo: number;
    somConceptProductieKosten: number;

    typologySummaries: TypologySummary[];
    somTypologyBvo: number;
    somTypologyBouwkosten: number;
    somTypologyTotaal: number;

    totaalBvo: number;
    totaalUitgaven: number;
}
