using BDH.Rhino.Web.API.Domain.Entities;
using BDH.Rhino.Web.API.Domain.Solvers.Tile.Models;

namespace BDH.Rhino.Web.API.Domain.Solvers.Tile
{
    public interface ICatalogToLineSolver
    {
        void SolveForConceptConfigurations(ref TileDesign response, IEnumerable<BuildingConceptConfiguration> configurations, BuildingConceptCatalog catalog, double catalogWidth);
    }
}