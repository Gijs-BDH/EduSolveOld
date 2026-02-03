import { ProfitRapport } from './ProfitRapport';
import { TypologyOpbrensten } from './TypologyOpbrensten';

export class CalculatedProfitRapport implements ProfitRapport {

    winstmarge: number = 10;
    builtTypes: TypologyOpbrensten[] = [];

    constructor(public totalExpenses: number, public area: number) {
    }


    get calculateTotalNumberOfLivings() {
        var livings = 0;
        this.builtTypes.forEach(i => {
            livings += i.totalLivings;
        });

        return Math.ceil(livings);
    }

    get calculateTotalNumberOfSocialLivings() {
        var livings = 0;
        this.builtTypes.forEach(i => {
            livings += i.builtSocial;
        });

        return Math.ceil(livings);
    }

    get calculateTotalNumberOfPublicLivings() {
        var livings = 0;
        this.builtTypes.forEach(i => {
            livings += i.builtFreeLivings;
        });

        return Math.ceil(livings);
    }

    //----
    calculateGrossIncomeForTypology(typology: TypologyOpbrensten) {
        return typology.grossIncomePerUnit * typology.builtFreeLivings;
    }

    get calculateTotalSoldFreeUnits() {
        var sold = 0;
        this.builtTypes.forEach(t => {
            sold += t.builtFreeLivings;
        });

        return Math.ceil(sold);
    }

    get calculateTotalGrossIncomeFreeUnits() {
        var income = 0;
        this.builtTypes.forEach(t => {
            var incomeTypology = this.calculateGrossIncomeForTypology(t);
            income += incomeTypology;
        });

        return Math.ceil(income);
    }

    //---
    calculateGrossIncomeForTypologySocial(typology: TypologyOpbrensten) {
        return Math.ceil(typology.maxGrossIncomeSocial * typology.builtSocial);
    }

    get calculateTotalSoldSocialUnits() {
        var sold = 0;
        this.builtTypes.forEach(t => {
            sold += t.builtSocial;
        });

        return Math.ceil(sold);
    }

    get calculateTotalGrossIncomeSocialUnits() {
        var income = 0;
        this.builtTypes.forEach(t => {
            var incomeTypology = t.maxGrossIncomeSocial * t.builtSocial;
            income += incomeTypology;
        });

        return Math.ceil(income);
    }

    //---
    get calculateResidueleGrondwaarde() {
        var grossIncome = this.calculateTotalGrossIncomeFreeUnits + this.calculateTotalGrossIncomeSocialUnits;
        return Math.ceil((grossIncome - this.totalExpenses) * (1 - (this.winstmarge / 100)));
    }

    get calculateGrondwaardePerM() {
        return Math.ceil(this.calculateResidueleGrondwaarde / this.area);
    }

}
