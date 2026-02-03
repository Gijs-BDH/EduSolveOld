import { BouwkostenRapport } from './BouwkostenRapport';
import { TypologySummary } from './TypologySummary';
import { ConceptSummary } from './ConceptSummary';

export class CalculatedRapport implements BouwkostenRapport {

    public get somConceptBvo(): number {
        return Math.ceil(this.conceptSummaries.reduce((sum, v) => sum += v.bvo, 0));
    };
    public get somConceptProductieKosten(): number {
        return Math.ceil(this.conceptSummaries.reduce((sum, v) => sum += v.productiekosten, 0));
    };



    public get somTypologyBvo(): number {
        return Math.ceil(this.typologySummaries.reduce((sum, v) => sum += v.bvo, 0));
    };
    public get somTypologyBouwkosten(): number {
        return Math.ceil(this.typologySummaries.reduce((sum, v) => sum += v.bouwkosten, 0));
    };
    public get somTypologyTotaal(): number {
        return Math.ceil(this.typologySummaries.reduce((sum, v) => sum += v.totaal, 0));
    };



    public get totaalBvo(): number {
        return Math.ceil(this.somConceptBvo + this.somTypologyBvo);
    };
    public get totaalUitgaven(): number {
        return Math.ceil(this.somConceptProductieKosten + this.somTypologyTotaal);
    };



    constructor(public typologySummaries: TypologySummary[], public conceptSummaries: ConceptSummary[]) {
    }
}
