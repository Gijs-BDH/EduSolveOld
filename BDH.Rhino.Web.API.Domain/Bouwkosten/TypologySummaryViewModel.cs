namespace BDH.Rhino.Web.API.Domain.Bouwkosten
{
    public class TypologySummaryViewModel
    {
        public string Name { get; set; } = null!;


        public decimal BasisKostenPerM2BVO { get; set; }
        public decimal MeerprijsEpcPerM2BVO { get; set; }
        public decimal MeerprijsBengPerM2BVO { get; set; }


        public int Units { get; set; }
        public decimal BvoPerUnit { get; set; }
        public decimal BVO =>
            Units * BvoPerUnit;



        public decimal KostenBouw { get; set; }
        public decimal KostenBeng { get; set; }
        public decimal KostenEpc { get; set; }
        public decimal KostenTotaal { get; set; }



        public TypologySummaryViewModel()
        {

        }
        public TypologySummaryViewModel(BouwkostenForTypologySummary summary) : this()
        {
            Name = summary.Name;
            BasisKostenPerM2BVO = summary.BasisKostenPerM2BVO;
            MeerprijsBengPerM2BVO = summary.MeerprijsBengPerM2BVO;
            MeerprijsEpcPerM2BVO = summary.MeerprijsEpcPerM2BVO;
            Units = summary.Units;
            BvoPerUnit = summary.BvoPerUnit;
            KostenBouw = summary.KostenBouw;
            KostenBeng = summary.KostenBeng;
            KostenEpc = summary.KostenEpc;
            KostenTotaal = summary.KostenTotaal;
        }
    }
}
