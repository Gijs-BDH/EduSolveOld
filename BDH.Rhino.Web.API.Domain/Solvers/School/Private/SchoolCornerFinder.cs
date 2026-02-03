using BDH.Rhino.Web.API.Domain.Geometry;
using BDH.Rhino.Web.API.Domain.Geometry.Factories;
using BDH.Rhino.Web.API.Domain.Solvers.School.Models;

namespace BDH.Rhino.Web.API.Domain.Solvers.School.Private
{
    public class SchoolCornerFinder : ISchoolCornerFinder
    {
        private readonly IGeometry geometry;

        public SchoolCornerFinder(IGeometry geometry)
        {
            this.geometry = geometry;
        }

        public void Solve(ref GeneratedSchoolResponse school)
        {
            var bucketCollection = new CornerBucketList();
            var pointcloud = new List<IPoint3d>();

            foreach (var cluster in school.Clusters)
            {
                foreach (var cell in cluster.Cells)
                {
                    for (int i = 0; i < cell.Hoogte; i++)
                    {
                        var z = cell.Point.Z + i;
                        var point = geometry.Point3D(cell.Point.X, cell.Point.Y, z);
                        pointcloud.Add(point);
                    }
                }
            }

            var ordered = pointcloud.OrderBy(c => c.Z);
            foreach (var point in ordered)
            {
                var toNorthEast = geometry.Vector3D(school.GridSize / 2, school.GridSizeY / 2, 0);
                var northEast = point.Translate(toNorthEast);
                bucketCollection.FindOrIncrement(northEast, SearchDirection.NorthEast);

                var toSouthEast = geometry.Vector3D(school.GridSize / 2, -school.GridSizeY / 2, 0);
                var southEast = point.Translate(toSouthEast);
                bucketCollection.FindOrIncrement(southEast, SearchDirection.SouthEast);

                var toSouthWest = geometry.Vector3D(-school.GridSize / 2, -school.GridSizeY / 2, 0);
                var southWest = point.Translate(toSouthWest);
                bucketCollection.FindOrIncrement(southWest, SearchDirection.SouthWest);

                var toNorthWest = geometry.Vector3D(-school.GridSize / 2, school.GridSizeY / 2, 0);
                var northWest = point.Translate(toNorthWest);
                bucketCollection.FindOrIncrement(northWest, SearchDirection.NorthWest);
            }

            school.NumberOfCorners += bucketCollection.CalculateCurrentValence();
        }
    }
}
