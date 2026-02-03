using BDH.Rhino.Web.API.Domain.Solvers.School.Models;
using BDH.Rhino.Web.API.Domain.Solvers.School.Private;
using BDH.Rhino.Web.API.Proxy.Private;
using BDH.Rhino.Web.API.Schema.Data;
using BDH.Rhino.Web.API.Schema.SchoolProject;

namespace BDH.Rhino.Web.API.Schema.GenerativeDesign
{
    public class GenerateSchoolRequestData
    {
        public ICollection<Point3dData> Raster { get; set; } = null!;
        public ICollection<GenerateSchoolClusterRequestData> Clusters { get; set; } = null!;
        public int? Seed { get; set; }
        public double GridSize { get; set; }
        public double GridSizeY { get; set; }
        public bool AllowDisconnected { get; set; }

        public GenerateSchoolRequest ToRequest()
        {
            var raster = Raster.Select(p => new BdhPoint2dProxy(p.X, p.Y)).ToArray();
            var clusters = Clusters.Select(c =>
            {
                var points = c.FixedPoints.Select(p => new BdhPoint2dProxy(p.X, p.Y)).ToArray();
                var shape = SchoolClusterShape.FromCollection(c.Shape.ToList(), c.ShapeWidth);
                var numberOfPointsToFind = (int)Math.Ceiling(c.BVO / (GridSize * GridSizeY));
                return new GenerateSchoolClusterRequest(numberOfPointsToFind, c.LowestLevel, c.HighestLevel, c.Levels, c.Name, points, shape, c.Connections);
            }).ToArray();

            return new GenerateSchoolRequest(raster, clusters, Seed, GridSize, GridSizeY, AllowDisconnected);
        }
    }
}
