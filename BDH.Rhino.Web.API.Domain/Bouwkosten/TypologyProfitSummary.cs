namespace BDH.Rhino.Web.API.Domain.Bouwkosten
{
    public class TypologyProfitSummary
    {
        public string TypologyName { get; }
        public int BuiltUnits { get; set; }
        public int WoningenPerUnit { get; }
        public int WoningenTotaal => BuiltUnits * WoningenPerUnit;
        public decimal PercentSociaal { get; set; }


        public decimal BasePricePerUnit { get; } = 351000;
        public decimal MaxRentForSociaal { get; } = 673M;
        public decimal RentFactorWozSociaal { get; } = 5.5M;
        public decimal MaxPricePerUnitForSociaal => MaxRentForSociaal * 12M / 5.5M * 100;



        public int SocialeWoningen => (int)Math.Ceiling(WoningenTotaal * (PercentSociaal / 100));
        public decimal OpbrengstenSociaal => SocialeWoningen * MaxPricePerUnitForSociaal;

        public int VrijeWoningen => WoningenTotaal - SocialeWoningen;
        public decimal OpbrengstenSoldUnits => VrijeWoningen * BasePricePerUnit;

        public decimal TotaleOpbrengsten => OpbrengstenSociaal + OpbrengstenSoldUnits;


        public TypologyProfitSummary(string name, int builtUnits, int woningenPerUnit)
        {
            TypologyName = name;
            BuiltUnits = builtUnits;
            WoningenPerUnit = woningenPerUnit;
        }
    }


}
