using BDH.Rhino.Web.API.Schema.GenerativeDesign;

namespace BDH.Rhino.Web.API.Schema.Requests
{
    public class ApplyBuildingConceptConfigurationRequest
    {
        public ICollection<ConceptSolverConceptData> Data { get; set; } = null!;
        public CatalogRequest Catalog { get; set; } = null!;
    }

}
