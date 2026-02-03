using BDH.Rhino.Web.API.Domain.GeoJson;
using BDH.Rhino.Web.API.Domain.GeoJson.Properties;

namespace BDH.Rhino.Web.API.Schema.Responses
{
    public class GetProjectVersionResponse
    {
        public string Name { get; set; } = null!;
        public IEnumerable<BuildingConceptTransformResponse> BuildingConcepts { get; set; } = null!;
        public IEnumerable<GenericMassTransformResponse> GenericMasses { get; set; } = null!;
        public IEnumerable<BuildingConceptCatalogTransformationResponse> Catalogs { get; set; } = null!;
        public IEnumerable<PolylineJson<GenerativeDesignWayProperties>> Ways { get; set; } = null!;
        public string? ProfitReport { get; set; }
    }
}
