namespace BDH.Rhino.Web.API.Domain.Bouwkosten
{
    public class BouwkostenForTypologySummary
    {
        public string Name { get; }


        public decimal BasisKostenPerM2BVO { get; }
        public decimal MeerprijsEpcPerM2BVO { get; }
        public decimal MeerprijsBengPerM2BVO { get; }
        public bool IsUserProvided { get; }

        public int Units { get; set; }
        public int WoningenPerUnit { get; set; }
        public decimal BvoPerUnit { get; }


        public decimal BVO =>
            Units * BvoPerUnit;
        public int Woningen =>
            Units * WoningenPerUnit;
        public decimal KostenBouw =>
            BVO * BasisKostenPerM2BVO;
        public decimal KostenBeng =>
            BVO * MeerprijsEpcPerM2BVO;
        public decimal KostenEpc =>
            BVO * MeerprijsBengPerM2BVO;
        public decimal KostenTotaal =>
            KostenBouw + KostenBeng + KostenEpc;


        public BouwkostenForTypologySummary(string name, int woningenPerUnit, decimal bvoPerUnit, decimal basisKostenPerM2BVO, decimal meerprijsEpcPerM2BVO, decimal meerprijsBengPerM2BVO, bool isUserProvided)
        {
            Name = name;
            WoningenPerUnit = woningenPerUnit;
            BvoPerUnit = bvoPerUnit;
            BasisKostenPerM2BVO = basisKostenPerM2BVO;
            MeerprijsBengPerM2BVO = meerprijsBengPerM2BVO;
            IsUserProvided = isUserProvided;
            MeerprijsEpcPerM2BVO = meerprijsEpcPerM2BVO;
        }
    }
}
