using BDH.Rhino.Web.API.Domain.Entities;
using BDH.Rhino.Web.API.Domain.Extensions;
using BDH.Rhino.Web.API.Domain.Geometry;

namespace BDH.Rhino.Web.API.Schema.Responses
{
    public class SchoolProjectVersionResponse
    {
        private readonly SchoolProjectVersion version;
        private readonly IColorRgbSerialier colorRgbSerialier;

        public Guid Id => version.Id;
        public string Name => version.Name;
        public double GridRotation => version.GridRotation;
        public double GridTranslation => version.GridTranslation;
        public double LevelHeight => version.GridHeight;
        public double MinimumGridSize => version.MinimumGridSize;
        public ICollection<IXY> Obstacles => version.Obstacles;
        public ICollection<SchoolProjectVersionClusterResponse> Clusters => version.Clusters.SortDefault().Select(c => new SchoolProjectVersionClusterResponse(c, colorRgbSerialier)).ToArray();
        public Guid ConstructionConceptId => version.ConstructionConcept.Id;
        public Guid ConstructionConceptProducerId => version.ConstructionConcept.Producer.Id;
        public int? Seed => version.Seed;


        public SchoolProjectVersionResponse(SchoolProjectVersion version, IColorRgbSerialier colorRgbSerialier)
        {
            this.version = version;
            this.colorRgbSerialier = colorRgbSerialier;
        }
    }
}
