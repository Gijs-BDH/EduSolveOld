using BDH.Rhino.Web.API.Domain.Entities;

namespace BDH.Rhino.Web.API.Schema.Responses
{
    public class BuildingConceptInformationResponse
    {
        private readonly BuildingConcept bouwconceptInfo;
        private readonly string createdBy;
        private readonly string company;


        public string CreatedBy => createdBy;
        public string Company => company;

        public string Id => bouwconceptInfo.Id.ToString();
        public string Name => bouwconceptInfo.Name;

        public decimal BvoPerUnit => bouwconceptInfo.BvoPerUnit;
        public decimal M3PerUnit => bouwconceptInfo.M3PerUnit;
        public double Width => bouwconceptInfo.Width;
        public double Depth => bouwconceptInfo.Depth;
        public double Height => bouwconceptInfo.Height;
        public double GlazingFactor => bouwconceptInfo.GlazingFactor;
        public int WoningenPerUnit => bouwconceptInfo.WoningenPerUnit;
        public decimal ProductieKostenPerUnit => bouwconceptInfo.ProductieKostenPerUnit;
        public decimal BouwkostenPerBvo => bouwconceptInfo.BouwkostenPerBVO;
        public decimal MeerprijsEpc => bouwconceptInfo.MeerprijsEPC;
        public decimal MeerprijsBeng => bouwconceptInfo.MeerprijsBENG;


        public bool IsPrivate => bouwconceptInfo.IsPrivate;
        public bool Stapelbaar => bouwconceptInfo.Stapelbaar;
        public bool IsFavorited { get; }


        public BuildingConceptInformationResponse(BuildingConcept bouwconceptInfo, string createdBy, string company, bool isFavorited)
        {
            this.bouwconceptInfo = bouwconceptInfo;
            this.bouwconceptInfo = bouwconceptInfo;
            this.createdBy = createdBy;
            this.company = company;

            IsFavorited = isFavorited;
        }
    }
}
