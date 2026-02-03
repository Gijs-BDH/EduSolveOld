using BDH.Rhino.Web.API.Domain.Interfaces;

namespace BDH.Rhino.Web.API.Domain.Bouwkosten
{

    public class TypologieKostenModel : ITypologieKostenModel
    {
        public string ID { get; }
        public string Name { get; }
        public decimal BvoPerUnit { get; }
        public int WoningenPerUnit { get; }
        public decimal BasisKostenPerM2BVO { get; }
        public decimal MeerprijsBengPerM2BVO { get; }
        public decimal MeerprijsEpcPerM2BVO { get; }
        public bool IsUserProvided { get; }

        internal TypologieKostenModel(string name, string id, decimal kostenPerM2Bvo, decimal bvoPerUnit, bool isUserProvided, int woningenPerUnit = 1, decimal meerprijsBengPerM2BVO = 0, decimal meerprijsEpcPerM2BVO = 0)
        {
            BasisKostenPerM2BVO = kostenPerM2Bvo;
            Name = name;
            ID = id;
            MeerprijsBengPerM2BVO = meerprijsBengPerM2BVO;
            MeerprijsEpcPerM2BVO = meerprijsEpcPerM2BVO;
            BvoPerUnit = bvoPerUnit;
            WoningenPerUnit = woningenPerUnit;
            IsUserProvided = isUserProvided;
        }


        public bool MatchName(string other)
        {
            if (other is null)
            {
                return false;
            }

            return Name.ToLower().Replace(" ", "") == other.ToLower().Replace(" ", "");
        }
    }
}
