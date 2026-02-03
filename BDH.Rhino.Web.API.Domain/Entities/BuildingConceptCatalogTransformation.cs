namespace BDH.Rhino.Web.API.Domain.Entities
{
    public class BuildingConceptCatalogTransformation
    {
        public Guid Id { get; set; }
        public Guid BuildingConceptCatalogId { get; set; }
        public double StartPointX { get; set; }
        public double StartPointY { get; set; }
        public double EndPointX { get; set; }
        public double EndPointY { get; set; }
        public int? UsedSeed { get; set; }
        public bool Pinned { get; set; }
        public int LevelsFrom { get; set; }
        public int LevelsTo { get; set; }
    }
}
