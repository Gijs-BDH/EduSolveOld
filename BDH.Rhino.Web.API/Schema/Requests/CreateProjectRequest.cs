using BDH.Rhino.Web.API.Domain.GeoJson;

namespace BDH.Rhino.Web.API.Schema.Requests
{
    public class CreateProjectRequest
    {
        public string Name { get; set; } = null!;
        public PolygonJson<EmptyJsonProperties> BasePolygon { get; set; } = null!;
    }
}
