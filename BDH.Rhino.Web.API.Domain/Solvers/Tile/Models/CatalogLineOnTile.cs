using BDH.Rhino.Web.API.Domain.Geometry;
using BDH.Rhino.Web.API.Domain.Solvers.Concept.Models;

namespace BDH.Rhino.Web.API.Domain.Solvers.Tile.Models
{
    public class CatalogLineOnTile
    {
        public ILine2d Line { get; }
        public IList<ConceptSolverResponse> Solution { get; } = new List<ConceptSolverResponse>();
        public int? UseSeed { get; }

        public CatalogLineOnTile(ILine2d line, int? useSeed)
        {
            Line = line;
            UseSeed = useSeed;
        }
    }
}
