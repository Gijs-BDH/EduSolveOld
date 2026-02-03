using BDH.Rhino.Web.API.Domain.Solvers.Tile.Models;
using BDH.Rhino.Web.API.Schema.Requests;
using BDH.Rhino.Web.API.Solver;

namespace BDH.Rhino.Web.API.Solvers.TilePopulator
{
    internal class TileCatalogPopulatorBulkSolver : ITileCatalogPopulatorBulkSolver
    {
        private readonly ITileCatalogPopulatorSolver solver;

        public TileCatalogPopulatorBulkSolver(ITileCatalogPopulatorSolver solver)
        {
            this.solver = solver;
        }


        public IEnumerable<TileDesign> DrawLinesForCatalogsBulk(TileDesignRequest bulkRequest, int solutions, Random random)
        {
            for (int i = 0; i < solutions; i++)
            {
                TileDesign? solution = null;
                var seed = random.Next();

                try
                {
                    solution = solver.DrawLinesForCatalogs(bulkRequest, seed);
                }
                catch
                {
                    //..
                }

                if (solution is not null)
                {
                    yield return solution;
                }
            }
        }
    }
}
