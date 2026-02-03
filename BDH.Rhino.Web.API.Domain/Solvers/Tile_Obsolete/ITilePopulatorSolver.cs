using BDH.Rhino.Web.API.Domain.Models;

namespace BDH.Rhino.Web.API.Domain.Solvers.Tile_Obsolete
{
    public interface ITilePopulatorSolver
    {
        GeneratedTileContentResponse Solve(PopulateTileRequest request, double modelWidth, double modelDepth);
    }
}
