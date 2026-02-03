using BDH.Rhino.Web.API.Domain.GeoJson;

namespace BDH.Rhino.Web.API.Schema.Responses
{
    public class GetProjectResponse
    {
        public IEnumerable<ProjectVersionReponse> Versions { get; }
        public PolygonJson<EmptyJsonProperties> BasePolygon { get; }

        public GetProjectResponse(IEnumerable<ProjectVersionReponse> versions, PolygonJson<EmptyJsonProperties> basePolygon)
        {
            Versions = versions;
            BasePolygon = basePolygon;
        }

    }
}
