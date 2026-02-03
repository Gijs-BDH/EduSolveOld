using BDH.Rhino.Web.API.Domain.GeoJson;

namespace BDH.Rhino.Web.API.Schema.Responses
{
    public class ProjectResponse
    {
        public string Name { get; set; } = null!;
        public string Id { get; set; } = null!;
        public string CreatedBy { get; set; } = null!;
        public string CreatedDate { get; set; } = null!;
        public IEnumerable<ProjectVersionReponse> Versions { get; set; } = null!;
        public PolygonJson<EmptyJsonProperties> BasePolygon { get; set; } = null!;
    }
}
