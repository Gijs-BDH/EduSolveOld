using BDH.Rhino.Web.API.Domain.Solvers.Tile_Obsolete;

namespace BDH.Rhino.Web.API.Domain.Models
{
    public class GeneratedTileContentResponse
    {
        public string Id { get; set; }
        public BuildingConceptTransformResponse[] Transformations { get; set; } = null!;
    }
}
