using BDH.Rhino.Web.API.Domain.Entities;

namespace BDH.Rhino.Web.API.Schema.Responses
{
    public class BuildingConceptCatalogTransformationResponse
    {
        private readonly BuildingConceptCatalogTransformation transformation;

        public Guid BuildingConceptCatalogId => transformation.BuildingConceptCatalogId;
        public double StartPointX => transformation.StartPointX;
        public double StartPointY => transformation.StartPointY;
        public double EndPointX => transformation.EndPointX;
        public double EndPointY => transformation.EndPointY;
        public int? UsedSeed => transformation.UsedSeed;
        public bool Pinned => transformation.Pinned;
        public int LevelsFrom => transformation.LevelsFrom;
        public int LevelsTo => transformation.LevelsTo;

        public BuildingConceptCatalogTransformationResponse(BuildingConceptCatalogTransformation transformation)
        {
            this.transformation = transformation;
        }
    }
}
