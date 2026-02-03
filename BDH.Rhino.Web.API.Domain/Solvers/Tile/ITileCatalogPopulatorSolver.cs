using BDH.Rhino.Web.API.Domain.Solvers.Tile.Models;
using BDH.Rhino.Web.API.Schema.Requests;

namespace BDH.Rhino.Web.API.Solver
{
    public interface ITileCatalogPopulatorSolver
    {
        TileDesign DrawLinesForCatalogs(TileDesignRequest request, int seed);
    }
}
