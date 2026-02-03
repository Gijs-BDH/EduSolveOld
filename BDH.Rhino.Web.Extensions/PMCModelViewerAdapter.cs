using BDH.Rhino.Web.API.Domain.Geometry;
using BDH.Rhino.Web.API.Domain.Geometry.Factories;
using BDH.Rhino.Web.API.Domain.Solvers.Tile.Models;

namespace BDH.Rhino.Web.Extensions
{
    public static class ConceptSolverExtensions
    {
        public static PMCModelViewerSolution Convert(this IEnumerable<CatalogLineOnTile> response, IPoint2d origin, IGeometry geometry)
        {
            int? levelHeight = null;

            var lines = response.Select(l =>
            {
                var blocks = l.Solution.Select(inBlock =>
                {
                    levelHeight ??= inBlock.Solution.First().Count;

                    var columns = inBlock.Solution
                        .Where(list =>
                        {
                            if (!list.Any())
                            {
                                return false;
                            }

                            return list.First().OriginFor is not null;
                        })
                        .Select(list =>
                        {
                            var columnSpan = list.First().OriginFor!.ColumnSpan;
                            var version = columnSpan switch
                            {
                                1 => PMC_Version.PMC11,
                                2 => PMC_Version.PMC12,
                                3 => PMC_Version.PMC13,
                                4 => PMC_Version.PMC14,
                                _ => throw new NotSupportedException($"An unknown number of columns ({columnSpan}) encountered, cannot determine pmc version.")
                            };

                            return new PMCModelViewerColumn(version);
                        })
                        .ToArray();

                    var block = new PMCModelViewerSolutionBlock(columns);
                    return block;
                })
                .ToArray();

                var line = new PMCModelViewerSolutionLine(blocks, geometry.Point2D(0, 0).Translate(origin.To(l.Line.Start)), l.Line.ToVector());
                return line;
            })
            .ToArray();


            if (!levelHeight.HasValue)
            {
                throw new Exception("Solver was not able to find the number of levels in this design.");
            }

            var solution = new PMCModelViewerSolution(levelHeight.Value, lines, origin);
            return solution;
        }
    }
}