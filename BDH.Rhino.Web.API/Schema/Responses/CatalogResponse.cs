using BDH.Rhino.Web.API.Domain.Entities;

namespace BDH.Rhino.Web.API.Schema.Responses
{
    public class CatalogResponse
    {
        private readonly BuildingConceptCatalog catalog;

        public string Name =>
            catalog.Name;
        public Guid Id =>
            catalog.Id;
        public IEnumerable<BuildingConceptResponse> BuildingConcepts =>
            catalog.BuildingConcepts.Select(c => new BuildingConceptResponse(c));

        public int? AllowedColumnsFrom =>
            catalog.AllowedColumnsFrom;
        public int? AllowedColumnsTo =>
            catalog.AllowedColumnsTo;
        public int? AllowedRowsFrom =>
            catalog.AllowedRowsFrom;
        public int? AllowedRowsTo =>
            catalog.AllowedRowsTo;

        public CatalogResponse(BuildingConceptCatalog catalog)
        {
            this.catalog = catalog;
        }
    }
}
