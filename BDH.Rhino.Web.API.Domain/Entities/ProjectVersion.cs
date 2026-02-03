namespace BDH.Rhino.Web.API.Domain.Entities
{
    public class ProjectVersion
    {
        public string Id { get; set; } = null!;

        public string Name { get; set; } = null!;

        public bool IsVersion2Compatible { get; set; } = false;

        public ICollection<BuildingConceptTransformationEntity> BouwconceptTransformations { get; set; } = null!;

        public ICollection<GenericMassTransformationEntity> GenericMassTransformations { get; set; } = null!;

        public ICollection<BuildingConceptCatalogTransformation> BuildingConceptCatalogTransformations { get; set; } = null!;

        public string? Ways { get; set; } = null!;

        public string? ProfitReport { get; set; }
    }
}
