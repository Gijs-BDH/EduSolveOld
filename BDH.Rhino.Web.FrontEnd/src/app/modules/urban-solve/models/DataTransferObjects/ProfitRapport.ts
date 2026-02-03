import { TypologyOpbrensten } from './TypologyOpbrensten';



export interface ProfitRapport {
    builtTypes: TypologyOpbrensten[];
    winstmarge: number;
    totalExpenses: number;
    area: number;

    //----
    get calculateTotalNumberOfLivings(): number;

    get calculateTotalNumberOfSocialLivings(): number;

    get calculateTotalNumberOfPublicLivings(): number;

    //----
    calculateGrossIncomeForTypology(typology: TypologyOpbrensten): number;

    get calculateTotalSoldFreeUnits(): number;

    get calculateTotalGrossIncomeFreeUnits(): number;

    //---
    calculateGrossIncomeForTypologySocial(typology: TypologyOpbrensten): number;

    get calculateTotalSoldSocialUnits(): number;

    get calculateTotalGrossIncomeSocialUnits(): number;

    //---
    get calculateResidueleGrondwaarde(): number;

    get calculateGrondwaardePerM(): number;

}
