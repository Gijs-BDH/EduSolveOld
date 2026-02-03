import { TypologyOpbrensten } from './TypologyOpbrensten';

export class CalculatedTypologyOpbrengsten implements TypologyOpbrensten {
    typologyName: string;
    builtUnits: number;
    livingsPerUnit: number;
    grossIncomePerUnit: number;
    percentSocial: number;

    public get totalLivings(): number {
        return Math.ceil(this.builtUnits * this.livingsPerUnit);
    }

    public get maxRentPriceSocial(): number {
        return 673;
    }

    public get rentFactorWozSocial(): number {
        return 5.5;
    }

    public get maxGrossIncomeSocial(): number {
        return Math.ceil(((this.maxRentPriceSocial * 12) / 5.5) * 100);
    }

    public get builtSocial(): number {
        return Math.ceil(this.totalLivings * (this.percentSocial / 100));
    }

    public get profitSocial(): number {
        return Math.ceil(this.builtSocial * this.maxGrossIncomeSocial);
    }

    public get builtFreeLivings(): number {
        return Math.ceil(this.totalLivings - this.builtSocial);
    }

    public get profitFreeLivings(): number {
        return Math.ceil(this.builtFreeLivings * this.grossIncomePerUnit);
    }

    public get totalProfit(): number {
        return Math.ceil(this.profitFreeLivings + this.profitSocial);
    }

    constructor(name: string, builtUnits: number, livingsPerUnit: number) {
        this.typologyName = name;
        this.builtUnits = builtUnits;
        this.livingsPerUnit = livingsPerUnit;
        this.grossIncomePerUnit = 300000;
        this.percentSocial = 10;
    }
}
