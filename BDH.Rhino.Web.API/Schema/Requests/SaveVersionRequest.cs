using BDH.Rhino.Web.API.Domain.GeoJson;
using BDH.Rhino.Web.API.Domain.GeoJson.Properties;

namespace BDH.Rhino.Web.API.Schema.Requests
{
    public class SaveVersionRequest
    {
        public string ProjectId { get; set; } = null!;
        public string Name { get; set; } = null!;
        public IEnumerable<BuildingConceptTransformRequest> BuildingConcepts { get; set; } = null!;
        public IEnumerable<GenericMassTransformRequest> GenericMasses { get; set; } = null!;
        public IEnumerable<BuildingConceptCatalogTransformationRequest> Catalogs { get; set; } = null!;
        public IEnumerable<PolylineJson<GenerativeDesignWayProperties>> Ways { get; set; } = null!;
    }
}
