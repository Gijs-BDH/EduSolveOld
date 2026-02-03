using BDH.Rhino.Web.API.Domain.Geometry.Factories;
using BDH.Rhino.Web.API.Domain.Models;
using BDH.Rhino.Web.API.Domain.Solvers.School.Models;

namespace BDH.Rhino.Web.API.Domain.Solvers.School.Private
{
    internal class SchoolSolver : ISchoolSolver
    {
        private readonly IGeometry geometry;
        private readonly int numberOfAttempts;

        public SchoolSolver(IGeometry geometry, int numberOfAttempts = 10)
        {
            this.geometry = geometry;
            this.numberOfAttempts = numberOfAttempts;
        }

        public GeneratedSchoolResponse Solve(GenerateSchoolRequest request)
        {
            var seed = request.Seed ?? new Random().Next();
            var random = new Random(seed);

            var graph = request.Clusters.Create();

            for (int i = 0; i < numberOfAttempts; i++)
            {
                var variant = request.Clusters.Select(c => c.Clean()).ToList();
                var pointCollection = request.Raster.Select(p => geometry.Point3D(p.X, p.Y, 0)).ToList();

                var engine = new SchoolSolverEngine(geometry, variant, pointCollection, request.GridSize, request.GridSizeY, random, request.AllowDisconnected, graph);
                var success = engine.Solve();

                //if success, return the answer, otherwise keep trying.
                if (success)
                {
                    return new GeneratedSchoolResponse()
                    {
                        Clusters = request.Clusters
                        .Select(originalCluster =>
                        {
                            return variant.Single(c => c.Name == originalCluster.Name);
                        })
                        .Select(c => new GeneratedClusterResponse()
                        {
                            Cells = c.Points.Select(p => new GeneratedClusterCellResponse()
                            {
                                Point = new GeneratedPointResponse()
                                {
                                    X = p.X,
                                    Y = p.Y,
                                    Z = p.Z
                                },
                                Hoogte = c.Levels
                            }).ToArray(),
                            Name = c.Name
                        })
                        .ToArray(),
                        GridSize = request.GridSize,
                        GridSizeY = request.GridSizeY,
                        UsedSeed = seed
                    };
                }
            }

            //no success after n attempts. That's too bad.
            throw new Exception("Solver was not able to generate a fitting school for this set of clusters on this grid.");
        }
    }
}
