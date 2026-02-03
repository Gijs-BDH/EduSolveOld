using BDH.Rhino.Web.API.Domain.Extensions;
using BDH.Rhino.Web.API.Domain.Geometry;
using BDH.Rhino.Web.API.Domain.Geometry.Factories;
using BDH.Rhino.Web.API.Domain.Solvers.Tile.Models;
using BDH.Rhino.Web.API.Schema.Requests;
using BDH.Rhino.Web.API.Solver;

namespace BDH.Rhino.Web.API.Solvers.TilePopulator
{
    internal class TileCatalogPopulatorSolver : ITileCatalogPopulatorSolver
    {
        private readonly IGeometry geometry;

        public TileCatalogPopulatorSolver(IGeometry geometry)
        {
            this.geometry = geometry;
        }

        public TileDesign DrawLinesForCatalogs(TileDesignRequest request, int seed)
        {
            var random = new Random(seed);
            var polygon = request.Tile.EnsureClosed();
            var contourDistance = 5;
            var minLength = request.MinimumLineLength;
            var safeMargin = request.LineMargin;

            var innerRing = request.Deflation.AlmostZero() ? polygon : polygon.Deflate(request.Deflation).First();
            var edges = innerRing.EnsureClosed().EnumerateSegments();
            var orderedRandom = request.Lines.Any() ? request.Lines :
                edges
                .OrderByDescending(l => l.Length)
                .Take((edges.Count() + request.Lines.Count()) / 2)
                .OrderBy(e => random.Next())
                .ToList();
            var selectedDirection = orderedRandom.First();
            var rotation = random.NextDouble().Map(0, 1, Math.PI / 2 - 0.1, Math.PI / 2 + 0.1);
            var secondDirection = request.Lines.Count() >= 2 ? request.Lines.ElementAt(1) : selectedDirection.RotateAround(geometry.Point2D(0, 0), rotation);

            var selectedDirections = new[] { selectedDirection, secondDirection };
            var catalogLines = new List<ILine2d>();
            var contours = selectedDirections
                .SelectMany(d => innerRing
                    .Contour(contourDistance, d.AngleOnConventionalXyPlane())
                    .SelectMany(c => c));
            var availableContours = contours.OrderBy(c => random.Next()).ToList();
            foreach (var existingLine in request.Lines)
            {
                var safeZone = existingLine.Inflate(safeMargin, true);
                availableContours = availableContours.SelectMany(c =>
                {
                    var safe = safeZone.Trim(c);
                    return safe;
                }).ToList();
            }
            while (true)
            {
                availableContours = availableContours.Where(c => c.Length > minLength).ToList();
                if (!availableContours.Any())
                {
                    break;
                }

                var catalogLine = availableContours[0];
                catalogLines.Add(catalogLine);
                availableContours = availableContours.Skip(1).ToList();
                if (!availableContours.Any())
                {
                    break;
                }

                var safeZone = catalogLine.Inflate(safeMargin, true);
                availableContours = availableContours.SelectMany(c =>
                {
                    var safe = safeZone.Trim(c);
                    return safe;
                }).ToList();
            }

            var lines = catalogLines.Select(l => new CatalogLineOnTile(l, null)).ToList();
            var response = new TileDesign(lines, seed);
            return response;
        }
    }
}
