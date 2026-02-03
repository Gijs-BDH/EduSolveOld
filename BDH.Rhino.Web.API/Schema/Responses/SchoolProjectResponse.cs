using BDH.Rhino.Web.API.Domain.Geometry;

namespace BDH.Rhino.Web.API.Schema.Responses
{
    public class SchoolProjectResponse
    {
        private readonly Domain.Entities.SchoolProject project;
        private readonly IColorRgbSerialier colorSerializer;

        public Guid Id => project.Id;
        public string Name => project.Name;
        public ICollection<SchoolProjectVersionResponse> Versies => project.Versies.Select(v => new SchoolProjectVersionResponse(v, colorSerializer)).ToArray();
        public ICollection<IXY> BasePolygon => project.BasePolygon;
        public string Owner => project.Owner.EmailAdress;


        public SchoolProjectResponse(Domain.Entities.SchoolProject project, IColorRgbSerialier colorSerializer)
        {
            this.project = project;
            this.colorSerializer = colorSerializer;
        }
    }
}
