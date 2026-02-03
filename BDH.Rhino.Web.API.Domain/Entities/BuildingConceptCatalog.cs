namespace BDH.Rhino.Web.API.Domain.Entities
{
    public class BuildingConceptCatalog
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = null!;
        public Company Owner { get; set; } = null!;
        public bool IsPrivate { get; set; }
        public ICollection<BuildingConcept> BuildingConcepts { get; set; } = null!;

        public int? AllowedColumnsFrom { get; set; }
        public int? AllowedColumnsTo { get; set; }
        public int? AllowedRowsFrom { get; set; }
        public int? AllowedRowsTo { get; set; }
    }

}
