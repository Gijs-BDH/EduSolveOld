namespace BDH.Rhino.Web.API.Schema.Requests
{
    public class CatalogRequest
    {
        public string Name { get; set; } = null!;
        public Guid Id { get; set; }
        public IEnumerable<BuildingConceptRequest> BuildingConcepts { get; set; } = null!;

        public int? AllowedColumnsFrom { get; set; }
        public int? AllowedColumnsTo { get; set; }
        public int? AllowedRowsFrom { get; set; }
        public int? AllowedRowsTo { get; set; }

        public CatalogRequest()
        {

        }
    }
}
