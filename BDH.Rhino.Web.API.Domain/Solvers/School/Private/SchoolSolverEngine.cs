using BDH.Rhino.Web.API.Domain.Extensions;
using BDH.Rhino.Web.API.Domain.Geometry;
using BDH.Rhino.Web.API.Domain.Geometry.Factories;
using BDH.Rhino.Web.API.Domain.Solvers.School.Models;

namespace BDH.Rhino.Web.API.Domain.Solvers.School.Private
{
    /// <summary>
    /// The school solver engine
    /// </summary>
    internal class SchoolSolverEngine
    {
        private readonly IGeometry geometry;
        private readonly IEnumerable<GenerateSchoolClusterRequest> clusters;
        private readonly List<IPoint3d> availablePoints;
        private readonly double horizontalSearchRadius;
        private readonly double horizontalSearchRadiusY;
        private readonly Random random;
        private readonly bool allowDisconnected;
        private readonly SchoolClusterConnectionGraph graph;

        public SchoolSolverEngine(
            IGeometry geometry,
            IEnumerable<GenerateSchoolClusterRequest> clusters,
            List<IPoint3d> availablePoints,
            double horizontalSearchRadius,
            double horizontalSearchRadiusY,
            Random random,
            bool allowDisconnected,
            SchoolClusterConnectionGraph graph)
        {
            this.geometry = geometry;
            this.clusters = clusters;
            this.availablePoints = availablePoints;
            this.horizontalSearchRadius = horizontalSearchRadius;
            this.horizontalSearchRadiusY = horizontalSearchRadiusY;
            this.random = random;
            this.allowDisconnected = allowDisconnected;
            this.graph = graph;
        }

        /// <summary>
        /// Solves the provided clusters in place. Returns true if the run was succesful. 
        /// </summary>
        /// <returns></returns>
        public virtual bool Solve()
        {
            foreach (var cluster in clusters.SortDefault())
            {
                if (!availablePoints.Any())
                {
                    return false;
                }

                if (!ChooseShapeFromAvailablePoints(cluster))
                {
                    return false;
                }

                if (!ChooseRemainingPointsOneByOne(cluster))
                {
                    return false;
                }
            }

            return true;
        }

        private bool ChooseShapeFromAvailablePoints(GenerateSchoolClusterRequest cluster)
        {
            if (!cluster.Shape.EnumerateValues().Any(v => v))
            {
                return true;
            }

            //cluster has a predefined shape, so match it with the available points and pick one set that matches the shape at random.
            var grid = SchoolGrid.FromPoints(availablePoints.Where(p => p.Z.AlmostZero()).ToArray(), horizontalSearchRadius, horizontalSearchRadiusY, geometry);
            var matcher = new SchoolClusterShapeMatcher(cluster.Shape, grid);
            var matches = matcher.Match().Select(m => matcher.Match(m.X, m.Y));
            if (!allowDisconnected && clusters.Any(c => c.Points.Count > 0))
            {
                matches = matches.Where(match =>
                {
                    return match.Any(cell =>
                    {
                        return clusters.Any(otherCluster =>
                        {
                            return PointIsDirectlyAboveOrNextToCluster(cell.Point, otherCluster);
                        });
                    });
                });
            }

            //if cluster is in connection graph, the match is only valid if at least one cell of its shape connects to another cluster according to the connection graph.
            if (graph.Connections(cluster).Any(c => c.Points.Any()))
            {
                matches = matches.Where(match =>
                {
                    return match.Any(cell =>
                    {
                        return clusters.Any(otherCluster =>
                        {
                            var clusterIsOkay = ConfirmGraph(cluster, otherCluster);
                            var pointIsNextToOkayCluster = PointIsDirectlyAboveOrNextToCluster(cell.Point, otherCluster);
                            return clusterIsOkay && pointIsNextToOkayCluster;
                        });
                    });
                });
            }

            //choose one random matching shape
            var match = matches.OrderBy(c => random.Next()).FirstOrDefault();
            if (match is null)
            {
                return false;
            }

            //nasty hack, we need to pick from the available points, but the points in the shape match are not from the original collection.
            //it works though, but would be nice if fixed
            var availableSubset = availablePoints.Where(p => match.Select(c => c.Point).Any(_p => _p.DistanceTo(p) < 0.1)).ToList();
            foreach (var point in availableSubset)
            {
                if (cluster.Points.Count >= cluster.NumberOfPointsToFind)
                {
                    break;
                }
                availablePoints.Remove(point);
                cluster.Points.Add(point);

                var pointAbove = point.Translate(geometry.Vector3D(0, 0, 1 * cluster.Levels));
                availablePoints.Add(pointAbove);
            }

            return true;
        }

        private bool ChooseRemainingPointsOneByOne(GenerateSchoolClusterRequest cluster)
        {
            //keep adding points until cluster has found enough.
            while (cluster.Points.Count < cluster.NumberOfPointsToFind)
            {
                //choose initial set from the available points in the grid
                var availableSubset = allowDisconnected ?
                    CreateSubset(availablePoints, cluster) :
                    CreateConnectedSubset(availablePoints, cluster);

                //first point must always connect acoording to graph.
                if (cluster.Points.Count == 0)
                {
                    //only check if there are already placed clusters that require connection
                    var targets = graph.Connections(cluster).Where(c => c != cluster);
                    if (targets.Any(c => c.Points.Count > 0))
                    {
                        availableSubset = availableSubset
                            .Where(p =>
                            {
                                //has targets, so the point is only valid if it is next to one of the targets.
                                return targets.Any(c => PointIsDirectlyAboveOrNextToCluster(p, c));
                            })
                            .ToList();
                    }
                }

                //if there is nothing to choose from, return early.
                if (!availableSubset.Any())
                {
                    return false;
                }

                IPoint3d selectedPoint;
                if (cluster.FixedPoints.Any())
                {
                    //choose a fixedpoint from the subset.
                    var fixedPoint = ChooseFixedPoint(availableSubset, cluster);
                    if (fixedPoint is null)
                    {
                        return false;
                    }

                    //point found so remove the fixed point so it does not try to find it again next round.
                    cluster.FixedPoints.Remove(fixedPoint);
                    selectedPoint = availablePoints.OrderBy(p => p.DistanceTo(geometry.Point3D(fixedPoint.X, fixedPoint.Y, 0))).First();
                }
                else
                {
                    //no fixed points so just choose something.
                    var randomIndex = random.Next(availableSubset.Count);
                    selectedPoint = availableSubset[randomIndex];
                }

                availablePoints.Remove(selectedPoint);
                cluster.Points.Add(selectedPoint);

                var pointAbove = selectedPoint.Translate(geometry.Vector3D(0, 0, 1 * cluster.Levels));
                availablePoints.Add(pointAbove);
            }

            return true;
        }

        private IXY? ChooseFixedPoint(IEnumerable<IPoint3d> availableSubset, GenerateSchoolClusterRequest cluster)
        {
            foreach (var point in availableSubset)
            {
                foreach (var _fixedPoint in cluster.FixedPoints)
                {
                    var distance = point.DistanceTo(geometry.Point3D(_fixedPoint.X, _fixedPoint.Y, 0));
                    if (distance < Math.Max(horizontalSearchRadius, horizontalSearchRadiusY))
                    {
                        return _fixedPoint;
                    }
                }
            }

            return null;
        }

        private List<IPoint3d> CreateSubset(IEnumerable<IPoint3d> availablePoints, GenerateSchoolClusterRequest cluster)
        {
            return availablePoints
                .Where(availablePoint =>
                {
                    var initialPointPredicate = PointIsInAppropriateLevel(availablePoint, cluster);
                    var remainingPointsPredicate = PointIsDirectlyAboveOrNextToCluster(availablePoint, cluster);
                    return cluster.Points.Any() ?
                        initialPointPredicate && remainingPointsPredicate :
                        initialPointPredicate;
                })
                .ToList();
        }

        private List<IPoint3d> CreateConnectedSubset(IEnumerable<IPoint3d> availablePoints, GenerateSchoolClusterRequest cluster)
        {
            if (!clusters.Any(c => c.Points.Any()))
            {
                return CreateSubset(availablePoints, cluster);
            }

            var connectedPoints = availablePoints.Where(availablePoint =>
            {
                return clusters.Any(otherCluster =>
                {
                    return PointIsDirectlyAboveOrNextToCluster(availablePoint, otherCluster);
                });
            });

            return CreateSubset(connectedPoints, cluster);
        }

        private bool PointIsInAppropriateLevel(IPoint3d availablePoint, GenerateSchoolClusterRequest cluster)
        {
            var lowestAllowedPoint = cluster.LowestLevel * 1 - 0.1;
            var hightestAllowedPoint = cluster.HighestLevel * 1 + 0.1;

            var pointInRange =
                availablePoint.Z >= lowestAllowedPoint &&
                availablePoint.Z <= hightestAllowedPoint;

            return pointInRange;
        }

        private bool PointIsDirectlyAboveOrNextToCluster(IPoint3d availablePoint, GenerateSchoolClusterRequest cluster)
        {
            var directlyNextTo = cluster.Points.Any(clusterPoint => AxisAligns(availablePoint, clusterPoint));
            var directlyAbove = cluster.Points.Any(clusterPoint => DirectlyBelowOther(clusterPoint, availablePoint));

            return directlyNextTo || directlyAbove;
        }

        private bool AxisAligns(IPoint3d left, IPoint3d right)
        {
            var heightAlmostEqual = left.Z.AlmostEqual(right.Z);
            var alignsX = left.Y.AlmostEqual(right.Y);
            var alignsY = left.X.AlmostEqual(right.X);
            if (!alignsX && !alignsY)
            {
                return false;
            }

            var distanceInRange = alignsX ?
                left.DistanceTo(right) < horizontalSearchRadius + 0.1 :
                left.DistanceTo(right) < horizontalSearchRadiusY + 0.1;
            return heightAlmostEqual && distanceInRange;
        }

        private bool DirectlyBelowOther(IPoint3d left, IPoint3d right)
        {
            var alignsHorizontal = left.X.AlmostEqual(right.X);
            var aligntsVertical = left.Y.AlmostEqual(right.Y);
            var distanceInRange = left.Z < right.Z;

            return alignsHorizontal && aligntsVertical && distanceInRange;
        }

        private bool ConfirmGraph(GenerateSchoolClusterRequest first, GenerateSchoolClusterRequest second)
        {
            if (first == second)
            {
                return true;
            }

            var allowedConnections = graph.Connections(first);
            if (allowedConnections.Any() && !allowedConnections.Contains(second))
            {
                return false;
            }

            return true;
        }
    }
}
