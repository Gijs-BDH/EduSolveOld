using BDH.Rhino.Web.API.Domain.Entities;
using BDH.Rhino.Web.API.Domain.Extensions;
using BDH.Rhino.Web.API.Domain.Geometry.Factories;
using BDH.Rhino.Web.API.Domain.Solvers.Concept;
using BDH.Rhino.Web.API.Domain.Solvers.Concept.Models;
using BDH.Rhino.Web.API.Domain.Solvers.Tile.Models;

namespace BDH.Rhino.Web.API.Domain.Solvers.Tile.Private
{
    internal class LineCatalogSolver : ICatalogToLineSolver
    {
        private readonly IConceptConfiguratieSolver conceptSolver;
        private readonly IGeometry geometry;

        public LineCatalogSolver(IConceptConfiguratieSolver conceptSolver, IGeometry geometry)
        {
            this.conceptSolver = conceptSolver;
            this.geometry = geometry;
        }
        public void SolveForConceptConfigurations(ref TileDesign response, IEnumerable<BuildingConceptConfiguration> configurations, BuildingConceptCatalog catalog, double catalogWidth)
        {
            var random = new Random(response.UsedSeed);
            var conceptRequest = new ConceptSolverRequest(
                configurations.ToList(),
                0,
                catalog.AllowedRowsFrom ?? 3,
                catalog.AllowedRowsTo ?? 8,
                catalog.AllowedColumnsFrom,
                catalog.AllowedColumnsTo,
                catalog.AllowedRowsFrom,
                catalog.AllowedRowsTo
            );

            for (int i = 0; i < response.Lines.Count; i++)
            {
                var line = response.Lines[i];
                if (line.UseSeed.HasValue)
                {
                    random = new Random(line.UseSeed.Value);
                }

                var startPoint = geometry.Point2D(line.Line.Start.X, line.Line.Start.Y);
                var endPoint = geometry.Point2D(line.Line.End.X, line.Line.End.Y);
                var lineGeometry = geometry.Line(startPoint, endPoint);
                var segments = lineGeometry.Length / catalogWidth;
                conceptRequest.Width = (int)segments;

                line.Solution.Clear();
                foreach (var solution in conceptRequest.Split(random).Select(i => conceptSolver.Solve(i, 10, random)))
                {
                    line.Solution.Add(solution);
                }
            }
        }
    }
}
