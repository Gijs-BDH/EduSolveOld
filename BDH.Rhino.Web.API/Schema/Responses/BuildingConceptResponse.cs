using BDH.Rhino.Web.API.Domain.Entities;

namespace BDH.Rhino.Web.API.Schema.Responses
{
    public class BuildingConceptResponse
    {
        private readonly BuildingConcept bouwconcept;

        public string Id => bouwconcept.Id.ToString();
        public string Name => bouwconcept.Name;

        public decimal BvoPerUnit => bouwconcept.BvoPerUnit;
        public decimal M3PerUnit => bouwconcept.M3PerUnit;
        public int WoningenPerUnit => bouwconcept.WoningenPerUnit;
        public decimal ProductieKostenPerUnit => bouwconcept.ProductieKostenPerUnit;
        public decimal BouwkostenPerBvo => bouwconcept.BouwkostenPerBVO;
        public decimal MeerprijsEpc => bouwconcept.MeerprijsEPC;
        public decimal MeerprijsBeng => bouwconcept.MeerprijsBENG;
        public double Width => bouwconcept.Width;
        public double Depth => bouwconcept.Depth;
        public double Height => bouwconcept.Height;

        public bool IsPrivate => bouwconcept.IsPrivate;
        public bool Stapelbaar => bouwconcept.Stapelbaar;

        public BuildingConceptResponse(BuildingConcept bouwconcept)
        {
            this.bouwconcept = bouwconcept;
        }
    }


}
