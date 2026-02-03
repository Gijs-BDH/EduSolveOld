using BDH.Rhino.Web.API.Domain.Geometry.Factories;
using BDH.Rhino.Web.API.Domain.Solvers.Concept;
using BDH.Rhino.Web.API.Domain.Solvers.Tile.Private;
using BDH.Rhino.Web.API.Solver;
using BDH.Rhino.Web.API.Solvers.TilePopulator;

namespace BDH.Rhino.Web.API.Domain.Solvers.Tile.Models
{
    public class TilePopulatorSolverFactory
    {
        private readonly IConceptConfiguratieSolver configuratieSolver;
        private readonly IGeometry geometry;

        public TilePopulatorSolverFactory(IConceptConfiguratieSolver configuratieSolver, IGeometry geometry)
        {
            this.configuratieSolver = configuratieSolver;
            this.geometry = geometry;
        }
        public ITileCatalogPopulatorSolver CreateSolver()
        {
            return new TileCatalogPopulatorSolver(geometry);
        }
        public ITileCatalogPopulatorBulkSolver CreateBulkSolver()
        {
            var solver = CreateSolver();
            return new TileCatalogPopulatorBulkSolver(solver);
        }
        public ICatalogToLineSolver CreateLineSolver()
        {
            return new LineCatalogSolver(configuratieSolver, geometry);
        }
    }
}
