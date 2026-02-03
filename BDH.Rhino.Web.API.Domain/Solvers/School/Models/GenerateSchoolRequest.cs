using BDH.Rhino.Web.API.Domain.Geometry;

namespace BDH.Rhino.Web.API.Domain.Solvers.School.Models
{
    public class GenerateSchoolRequest
    {
        public ICollection<IPoint2d> Raster { get; set; } = null!;
        public ICollection<GenerateSchoolClusterRequest> Clusters { get; set; } = null!;
        public int? Seed { get; set; }
        public double GridSize { get; set; }
        public double GridSizeY { get; set; }
        public bool AllowDisconnected { get; set; }

        public GenerateSchoolRequest(ICollection<IPoint2d> raster, ICollection<GenerateSchoolClusterRequest> clusters, int? seed, double gridSize, double gridSizeY, bool allowDisconnected)
        {
            Raster = raster;
            Clusters = clusters;
            Seed = seed;
            GridSize = gridSize;
            GridSizeY = gridSizeY;
            AllowDisconnected = allowDisconnected;
        }
    }
}
